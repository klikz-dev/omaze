/**
 * Class representing a checkbox form element.
 *
 * @export
 * @class Checkbox
 * @extends BaseNode
 *
 * @param {Object} options - options for creating a checkbox.
 * @param {string} [options.cssClasses=] - CSS classes to append to outer div.
 * @param {boolean} [options.checked=] - checkbox checked status.
 * @param {boolean} [options.disabled=] - checkbox disabled status.
 * @param {string} [options.label=] - checkbox field label.
 * @param {string} [options.name=] - checkbox field name.
 * @param {string} [options.value=] - checkbox field value.
 *
 * @example
 *
 *     const el = new SDG.Component.Checkbox({
 *         label: 'my label',
 *         name: 'form-el-name',
 *     });
 */

window.SDG = window.SDG || {};
SDG.Component = SDG.Component || {};

import {default as BaseNode} from '../ozc-base-node.js';
import {default as Element} from '../ozc-element.js';

SDG.Component.Checkbox = class Checkbox extends BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.label = options.label;
        this.checked = !!options.checked;
        this.disabled = !!options.disabled;
        this.name = options.name;
        this.value = options.value;
        this.el = this.createEl();

        this.setCheckedStyle();
        this.addListener();
    }

    addListener () {
        if (!this.inputEl) {
            return false;
        }

        this.inputEl.addEventListener('click', this.onClick.bind(this));
    }

    setCheckedStyle () {
        const CHECKED_CSS = `${this.constructor.cssBaseClass}--checked`;

        if (this.checked) {
            return this.el.classList.add(CHECKED_CSS);
        }

        return this.el.classList.remove(CHECKED_CSS);
    }

    onClick () {
        const SET_ATTRIBUTE_NAME = 'checked';

        if (this.disabled) {
            return false;
        }

        this.checked = !this.checked;

        this.setCheckedStyle();

        if (this.checked) {
            this.inputEl.setAttribute(SET_ATTRIBUTE_NAME, true);

            return true;
        }

        return this.inputEl.removeAttribute(SET_ATTRIBUTE_NAME);
    }

    createLabelEl () {
        const ELEMENT_TAG_NAME = 'label';
        const LABEL_CSS = `${this.constructor.cssBaseClass}__label`;

        if (!this.label) {
            return false;
        }

        const labelConfig = {
            tag: ELEMENT_TAG_NAME,
            cssClasses: LABEL_CSS,
            content: this.label,
        };

        if (this.name) {
            labelConfig.attributes = {
                for: this.name,
            };
        }

        return new Element(labelConfig);
    }

    createCheckboxEl () {
        const BOX_CSS = `${this.constructor.cssBaseClass}__box`;
        const INPUT_TYPE = 'checkbox';
        const INPUT_TAG_NAME = 'input';

        const inputAttibutes = {
            type: INPUT_TYPE,
        }

        if (this.checked) {
            inputAttibutes.checked = true;
        }

        if (this.name) {
            inputAttibutes.name = this.name;
        }

        if (this.value) {
            inputAttibutes.value = this.value;
        }

        if (this.disabled) {
            inputAttibutes.disabled = this.disabled;
        }

        const input = new Element({
            tag: INPUT_TAG_NAME,
            attributes: inputAttibutes,
        })

        this.inputEl = input.el;

        return new Element({
            cssClasses: BOX_CSS,
            children: [
                input,
            ],
        });
    }

    createEl () {
        let cssClassList = this.constructor.cssBaseClass;

        if (this.cssClasses) {
            cssClassList = `${cssClassList} ${this.cssClasses}`;
        }

        const checkbox = this.createCheckboxEl();
        const label = this.createLabelEl();

        const component = new Element({
            cssClasses: cssClassList,
            children: [
                checkbox,
                label,
            ],
        })

        return component.el;
    }

    static get cssBaseClass () {
        return 'ozc-checkbox';
    }
};

export default SDG.Component.Checkbox;
