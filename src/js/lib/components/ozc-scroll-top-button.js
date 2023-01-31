/**
 * Class representing a scroll-top button component.
 * Generates an element with a window.scrollTo(0,0) event listener
 *
 * @export
 * @class ScrollTop
 * @extends BaseNode
 *
 * @param {Object} options - options for creating component.
 * @param {string} options.tag - html tag element name.
 *
 * Note: As the element extends BaseNode and calls 'this.createParentEl',
 *     it allows for passing all of the BaseNode options, such as
 *     'tag', or 'text' or 'content'.
 *
 * @example
 *
 *     const myButton = new SDG.Component.ScrollTop({
 *        tag: 'span',
 *        text: 'Back to Top',
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.ScrollTop = class ScrollTop extends SDG.Component.BaseNode {
    constructor (options) {
        super(options);

        this.tag = options.tag;
        this.el = this.createEl();

        this.addListener();
    }

    createEl () {
        const el = this.createParentEl(this.tag);
        el.classList = 'ozc-srolltop-button';

        return el;
    }

    addListener () {
        this.el.addEventListener('click', this.scrollTop);
    }

    // eslint-disable-next-line class-methods-use-this
    scrollTop () {
        window.scrollTo(0, 0);
    }
};

export default SDG.Component.ScrollTop;
