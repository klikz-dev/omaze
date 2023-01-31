/**
 * Class representing a modal element.
 *
 * @export
 * @class Modal
 * @extends BaseNode
 *
 * @param {Object} options - options for creating a modal.
 * @param {HTMLElement|string} options.panelHtml - modal content.
 * @param {string} [options.cssClasses=] - CSS classes to append to outer div.
 * @param {string} [options.appendToSelector=body] - selector where to append the modal.
 * @param {string} [options.closeLinkText=] - text for close element.
 * @param {boolean} [options.fullScreen=false] - whether to display as full screen.
 * @param {boolean} [options.allowBodyOverflow=false] - whether to allow scrolling in the background while modal is visible
 * @param {string} [options.animation=] - animation name for modal transition-in
 *
 * @example
 *
 *     1. Create modal instance
 *     2. Call show() on the instance to display it
 *
 *     const myModal = new SDG.Component.Modal({
 *         panelHtml: '<div>content</div>',
 *         closeLinkText: 'close me',
 *     });
 *
 *    myModal.show();
 */

window.SDG = window.SDG || {};
SDG.Component = SDG.Component || {};

import {default as BaseNode} from './ozc-base-node.js';
import {default as Element} from './ozc-element.js';
import {default as HTMLUtils} from '../utility/html-element.js';

SDG.Component.Modal = class Modal extends BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.panelHtml = options.panelHtml;
        this.closeLinkText = options.closeLinkText;
        this.cssClasses = options.cssClasses;
        this.fullScreen = options.fullScreen || this.constructor.defaults.fullScreen;
        this.appendToSelector = options.appendToSelector || this.constructor.defaults.appendToSelector;
        this.allowBodyOverflow = options.allowBodyOverflow || this.constructor.defaults.allowBodyOverflow;
        this.animation = this.constructor.animations[options.animation];

        this.el = this.createEl();

        this.addCloseListener();
    }

    createEl () {
        if (!this.panelHtml) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.Modal] panel content missing.');

            return false;
        }

        let cssClass = `${this.constructor.cssBaseClass}__mask`;

        if (this.cssClasses) {
            cssClass = `${cssClass} ${this.cssClasses}`;
        }

        const component = new Element({
            cssClasses: cssClass,
            children: [
                this.createContent(),
            ],
        });

        return component.el;
    }

    createContent () {
        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_STYLE_GUIDE = 'ozsg';
        const CSS_CLASS_CONTENT = `${CSS_CLASS_BASE}__content`;
        const CSS_CLASS_BODY = `${CSS_CLASS_BASE}__body`;
        const CSS_CLASS_FULL_SCREEN = `${CSS_CLASS_BASE}--fullscreen`;

        let baseCssClasses = `${CSS_CLASS_BASE} ${CSS_CLASS_STYLE_GUIDE}`;

        if (this.animation) {
            const CSS_CLASS_ANIMATION = `${CSS_CLASS_BASE}--animate-${this.animation}`;

            baseCssClasses = `${baseCssClasses} ${CSS_CLASS_ANIMATION}`;
        }

        if (this.fullScreen) {
            baseCssClasses = `${baseCssClasses} ${CSS_CLASS_FULL_SCREEN}`;
        }

        const body = new Element({
            cssClasses: CSS_CLASS_BODY,
        });

        if (typeof this.panelHtml === 'string') {
            body.el.innerHTML = this.panelHtml;
        } else {
            body.appendChild(this.panelHtml);
        }

        const content = new Element({
            cssClasses: CSS_CLASS_CONTENT,
            children: [
                this.header(),
                body,
            ],
        });

        return new Element({
            cssClasses: baseCssClasses,
            children: [
                content,
            ],
        });
    }

    closeElement () {
        const CSS_CLASS_CLOSE = `${this.constructor.cssBaseClass}__close`;
        const CSS_CLASS_CLOSE_ICON = `${this.constructor.cssBaseClass}__close-icon`;
        const CSS_CLASS_CLOSE_TEXT = `${this.constructor.cssBaseClass}__close-text`;
        let closeTextEl;

        const closeIconEl = new Element({
            cssClasses: CSS_CLASS_CLOSE_ICON,
        });

        if (this.closeLinkText) {
            closeTextEl = new Element({
                cssClasses: CSS_CLASS_CLOSE_TEXT,
                content: this.closeLinkText,
            });
        }

        const closeEl = new Element({
            cssClasses: CSS_CLASS_CLOSE,
            children: [
                closeIconEl,
                closeTextEl,
            ],
        });

        this.closeEl = closeEl.el;

        return closeEl;
    }

    header () {
        const CSS_CLASS_HEADER = `${this.constructor.cssBaseClass}__header`;

        return new Element({
            cssClasses: CSS_CLASS_HEADER,
            children: [
                this.closeElement(),
            ],
        });
    }

    addCloseListener () {
        if (!this.el || !this.closeEl) {
            return false;
        }

        this.closeEl.addEventListener('click', this.destroy.bind(this));
    }

    show () {
        if (!this.el) {
            return false;
        }

        this.freezeOverflow(true);

        return HTMLUtils.appendToSelector(this.el, this.appendToSelector);
    }

    destroy (event) {
        if (event) {
            event.preventDefault();
        }

        this.freezeOverflow(false);

        if (this.el) {
            this.el.remove();
        }
    }

    freezeOverflow (hide) {
        if (this.allowBodyOverflow) {
            return false;
        }

        const CSS_CLASS_OVERFLOW_HIDDEN = 'overflow-hidden';
        const TARGET_ELEMENT_TAG = 'body';

        const targetEl = document.getElementsByTagName(TARGET_ELEMENT_TAG)[0];

        if (hide) {
            return targetEl.classList.add(CSS_CLASS_OVERFLOW_HIDDEN);
        }

        return targetEl.classList.remove(CSS_CLASS_OVERFLOW_HIDDEN);
    }

    static get cssBaseClass () {
        return 'ozc-modal';
    }

    static get animations () {
        return {
            slideUp: 'slide-up',
        };
    }

    static get defaults () {
        return {
            appendToSelector: 'body',
            fullScreen: false,
            allowBodyOverflow: false,
        };
    }
};

export default SDG.Component.Modal;
