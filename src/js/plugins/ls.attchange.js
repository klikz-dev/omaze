/*jshint ignore: start */
/**
 * https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/attrchange
 *
 * lazysizes attribute change / re-initialization extension
 *
 * In case you are changing the data-src/data-srcset attributes of already transformed lazyload elements dynamically, you normally
 * also must re-add the lazyload class to the element. This extension automatically detects changes to your data-* attributes and
 * adds the class for you.
 */

(function(window, factory) {
    var globalInstall = function(){
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if(typeof module == 'object' && module.exports){
        factory(require('./lazysizes'));
    } else if(window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    'use strict';
    if(!window.addEventListener){return;}

    var rAF = window.requestAnimationFrame || setTimeout;

    var addObserver = function(){
        var connect, disconnect, observer, connected;
        var lsCfg = lazySizes.cfg;
        var attributes = {'data-bgset': 1, 'data-include': 1, 'data-poster': 1, 'data-bg': 1, 'data-script': 1};
        var regClassTest = '(\\s|^)(' + lsCfg.loadedClass;
        var docElem = document.documentElement;

        var setClass = function(target){
            rAF(function(){
                lazySizes.rC(target, lsCfg.loadedClass);
                if(lsCfg.unloadedClass){
                    lazySizes.rC(target, lsCfg.unloadedClass);
                }
                lazySizes.aC(target, lsCfg.lazyClass);
            });
        };

        var onMutation = function(mutations){
            var i, len, mutation, target;
            for(i = 0, len = mutations.length; i < len; i++){
                mutation = mutations[i];
                target = mutation.target;

                if(!target.getAttribute(mutation.attributeName)){continue;}

                if(target.localName == 'source' && target.parentNode){
                    target = target.parentNode.querySelector('img');
                }

                if(target && regClassTest.test(target.className)){
                    setClass(target);
                }
            }
        };

        if(lsCfg.unloadedClass){
            regClassTest += '|' + lsCfg.unloadedClass;
        }

        regClassTest += '|' + lsCfg.loadingClass + ')(\\s|$)';

        regClassTest = new RegExp(regClassTest);

        attributes[lsCfg.srcAttr] = 1;
        attributes[lsCfg.srcsetAttr] = 1;

        if(window.MutationObserver){
            observer = new MutationObserver(onMutation);

            connect = function(){
                if(!connected){
                    connected = true;
                    observer.observe( docElem, { subtree: true, attributes: true, attributeFilter: Object.keys(attributes)} );
                }
            };
            disconnect = function(){
                if(connected){
                    connected = false;
                    observer.disconnect();
                }
            };
        } else {
            docElem.addEventListener('DOMAttrModified', (function(){
                var runs;
                var modifications = [];
                var callMutations = function(){
                    onMutation(modifications);
                    modifications = [];
                    runs = false;
                };
                return function(e){
                    if(connected && attributes[e.attrName] && e.newValue){
                        modifications.push({target: e.target, attributeName: e.attrName});
                        if(!runs){
                            setTimeout(callMutations);
                            runs = true;
                        }
                    }
                };
            })(), true);

            connect = function(){
                connected = true;
            };
            disconnect = function(){
                connected = false;
            };
        }

        addEventListener('lazybeforeunveil', disconnect, true);
        addEventListener('lazybeforeunveil', connect);

        addEventListener('lazybeforesizes', disconnect, true);
        addEventListener('lazybeforesizes', connect);
        connect();

        removeEventListener('lazybeforeunveil', addObserver);
    };


    addEventListener('lazybeforeunveil', addObserver);
}));
/* jshint ignore: end */