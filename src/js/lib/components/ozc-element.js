/**
 * Class representing a basic element component.
 *
 * @export
 * @class Element
 * @extends BaseNode

 * @example
 *
 *     const component = new Element({
 *        tag: 'h1'
 *        content: 'This will be a Header!',
 *        cssClasses: 'my-css__header, my-css_header--big',
 *     });
 */
SDG.Component = SDG.Component || {};

import {default as BaseNode} from './ozc-base-node.js';

SDG.Component.Element = class Element extends BaseNode {
    constructor (options) {
        super(options);

        this.tag = options.tag;
        this.content = options.content || options.text || '';
        this.el = this.createEl();
    }

    createEl () {
        const el = this.createParentEl(this.tag);

        return el;
    }
};

export default SDG.Component.Element;
