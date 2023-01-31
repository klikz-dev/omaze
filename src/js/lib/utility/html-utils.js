SDG.Utility = SDG.Utility || {};
/**
 * Class containing some chainable utility function for working with html elements.
 *
 * @export
 * @class HtmlUtils

 * @example
 *
 *     const instance = new HtmlUtils({
 *        id: 'elementId',
 *        className: 'my-css__header',
 *     });
 */
SDG.Utility.HtmlUtils = class HtmlUtils {
    constructor({ element, id, className }) {
        this.element =
            element ||
            document.querySelector(`#${id}`) ||
            document.querySelector(`.${className}`);
    }

    show(value = 'block') {
        if (!this.element || !(this.element instanceof HTMLElement)) {
            /* eslint-disable-next-line  no-console */
            console.warn(
                `[SDG.Utility.HtmlUtils.show] element is not a dom element: ${this.element}`
            );

            return false;
        }

        this.element.style.display = value;

        return this;
    }
    hide() {
        if (!this.element || !(this.element instanceof HTMLElement)) {
            /* eslint-disable-next-line  no-console */
            console.warn(
                `[SDG.Utility.HtmlUtils.hide] element is not a dom element: ${this.element}`
            );

            return false;
        }

        this.element.style.display = 'none';

        return this;
    }
    text(text) {
        if (!this.element || !(this.element instanceof HTMLElement)) {
            /* eslint-disable-next-line  no-console */
            console.warn(
                `[SDG.Utility.HtmlUtils.text] element is not a dom element: ${this.element}`
            );

            return false;
        }

        this.element.innerHTML = text;

        return this;
    }

    /**
     * Not chainable
     */
    hasClass(element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(
                element.className
            );
        }
    }
    addClass(className) {
        if (!this.hasClass(this.element, className)) {
            if (this.element.classList) {
                this.element.classList.add(className);
            } else {
                this.element.className += ' ' + className;
            }
        }

        return this;
    }
    removeClass(className) {
        if (this.hasClass(this.element, className)) {
            if (this.element.classList) {
                this.element.classList.remove(className);
            } else {
                this.element.className = this.element.className.replace(
                    new RegExp(
                        '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
                        'gi'
                    ),
                    ' '
                );
            }
        }

        return this;
    }
};

export default SDG.Utility.HtmlUtils;
