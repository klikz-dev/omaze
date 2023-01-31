/**
 * Class representing a base HTML element component.
 * It is typically used when creating another instance which extends BaseNode.
 *
 * @export
 * @class BaseNode
 *
 * @param {string} options - options for creating an instance.
 * @param {object} [options.styles=] - key/value pairs of css styles.
 * @param {string} [options.cssClasses=] - comma or space separated list of css class names.
 * @param {object} [options.attributes=] - key/value pairs of element attributes.
 * @param {object} [options.oaAnalytics=] - key/value pairs of oaAnalytics attributes.
 *    - will append 'data-oa-' prefix to the analytics attribute name.
 * @param {string} [options.content=] - content to set as innerHTML
 * @param {string} [options.text=] - content to set as innerHTML
 * @param {array} [options.children=] - list of elements to append as node children.
 *    - each list item can be either an instance of HTMLElement or object (e.g.: BaseNode type)
 *      with 'el' property, which itself is an instance of HTMLElement
 *
 *
 * @method createParentEl
 *     Creates html element with properties (classes, attributes etc...) passed in through options.
 *
 *     @param {string} [tag=div] - tag name to apply to element.
 *
 *
 * @method appendChild
 *     Appends element to own 'el' element.
 *
 *     @param {HTMLElement|BaseNode} child - tag name to apply to element.
 *
 *
 * @method appendTo
 *     Appends element to a target element as specified by CSS selector
 *
 *     @param {string} selector - selector for finding target element in the DOM.
 *         Selector is queried in the following order
 *         - CSS Class name / getElementsByClassName
 *         - CSS ID / getElementById
 *         - other query selector / querySelectorAll
 */

window.SDG = window.SDG || {};
SDG.Component = SDG.Component || {};

SDG.Component.BaseNode = class Node {
    constructor (options) {
        options = options || {};

        this.styles = this.constructor.stringifyStyles(options.styles);
        this.cssClasses = this.constructor.stringifyCssClasses(options.cssClasses);
        this.attributes = this.constructor.validateObject(options.attributes);
        this.oaAnalytics = this.constructor.validateObject(options.oaAnalytics);
        this.content = options.content || options.text;
        this.children = options.children;

        this.setAnalyticsAttributes();
    }

    createParentEl (tag) {
        tag = tag || 'div';
        const el = document.createElement(tag);

        if (this.cssClasses) {
            el.classList = this.cssClasses;
        }

        if (this.styles) {
            el.style = this.styles;
        }

        if (this.attributes) {
            Object.keys(this.attributes).forEach((key) => {
                el.setAttribute(key, this.attributes[key] || '');
            });
        }

        if (this.content) {
            el.innerHTML = this.content;
        }

        if (this.children && Array.isArray(this.children)) {
            this.children.forEach((child) => {
                if (!child) {
                    return false;
                }

                if (child instanceof HTMLElement) {
                    return el.appendChild(child);
                }

                if (child.el && child.el instanceof HTMLElement) {
                    return el.appendChild(child.el);
                }

                if (child && child.type) {
                    const type = Node.capitalizeString(child.type);
                    const node = new SDG.Component[type](child);

                    return el.appendChild(node.el);
                }

                /* eslint-disable-next-line  no-console */
                console.error('[SDG.Component.BaseNode createParentEl()]: child must be HTMLElement type: ', child);

                return false;
            });
        }

        return el;
    }

    setAnalyticsAttributes () {
        if (!this.constructor.validateObject(this.oaAnalytics)) {
            return false;
        }

        const OA_DATA_PREFIX = 'data-oa-';
        const prefixRegex = new RegExp(`^${OA_DATA_PREFIX}`);

        this.attributes = this.attributes || {};

        Object.keys(this.oaAnalytics).forEach((key) => {
            const strippedKey = key.replace(prefixRegex,'');
            const oaKey = `${OA_DATA_PREFIX}${strippedKey}`;

            this.attributes[oaKey] = this.oaAnalytics[key];
        });
    }


    static validateObject (object) {
        if (!object || typeof object !== 'object' || Array.isArray(object)) {
            return undefined;
        }

        return object;
    }

    static capitalizeString (string) {
        if (typeof string !== 'string') {
            return '';
        }

        string = string.trim();

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static stringifyCssClasses (cssClasses) {
        if (!(typeof cssClasses === 'string') || !cssClasses.trim()) {
            return undefined;
        }

        const classes = cssClasses.split(/[ ,]+/);

        return classes
            .join(' ')
            .trim();
    }

    static stringifyStyles (styles) {
        if (!this.validateObject(styles)) {
            return undefined;
        }

        const styleArr = [];

        Object.keys(styles).forEach((key) => {
            let style = styles[key];

            styleArr.push(`${key}: ${style};`);
        });

        if (styleArr.length < 1) {
            return undefined;
        }

        return `${styleArr.join(' ')}`;
    }

    appendChild (child) {
        if (!child) {
            return false;
        }

        if (child instanceof HTMLElement) {
            return this.el.appendChild(child);
        }

        if (child.el && child.el instanceof HTMLElement) {
            return this.el.appendChild(child.el);
        }

        /* eslint-disable-next-line  no-console */
        console.error('[SDG.Component.BaseNode appendChild()]: child must be HTMLElement type: ', child);

        return false;
    }

    appendTo (selector) {
        let targetEl = document.getElementsByClassName(selector)[0];

        if (!targetEl) {
            targetEl = document.getElementById(selector);
        }

        if (!targetEl) {
            // eslint-disable-next-line  prefer-destructuring
            targetEl = document.querySelectorAll(selector)[0];
        }

        if (!targetEl) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.BaseNode appendTo()]: cannot find appendTo element by selector: ', selector);

            return;
        }

        targetEl.appendChild(this.el);
    }
};

export default SDG.Component.BaseNode;
