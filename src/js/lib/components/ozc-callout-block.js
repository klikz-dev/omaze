/**
 * Class representing a message callout block component.
 * Generates a block element with a pre-defined `.ozc-callout` style and passed in content as HTML.
 *
 * @export
 * @class CalloutBlock
 * @extends BaseNode

 * @example
 *
 *     const myBlock = new CalloutBlock({
 *         text: 'This text will display inside the block element',
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.CalloutBlock = class CalloutBlock extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.text = options.text;
        this.el = this.createEl();
    }

    createEl () {
        const el = this.createParentEl('div');
        el.classList.add('ozc-callout');

        el.innerHTML = `<h2>${this.text}</h2>`;

        return el;
    }
};

export default SDG.Component.CalloutBlock;
