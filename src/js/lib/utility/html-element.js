SDG.Utility = SDG.Utility || {};

SDG.Utility.HtmlElement = {
    placeElement (element, selector, placement) {
        const ALLOWED_PLACEMENT = ['top', 'bottom', 'before', 'after'];

        if (!ALLOWED_PLACEMENT.includes(placement)) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Utility.HtmlElement.insertElement] placement type not valid: ${placement}`);

            return false;
        }

        if (placement === 'top') {
            return this.insertAtTopOfSelector(element, selector);
        }

        if (placement === 'bottom') {
            return this.appendToSelector(element, selector);
        }

        if (placement === 'before') {
            return this.insertBeforeSelector(element, selector);
        }

        if (placement === 'after') {
            return this.insertAfterSelector(element, selector);
        }

        return false;
    },

    insertAtTopOfSelector (element, selector) {
        if (!(element instanceof HTMLElement)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.HtmlElement.insertAtTopOfSelector] element not instanceof HTMLElement');

            return false;
        }

        const parentEl = document.querySelectorAll(selector)[0];

        if (!parentEl) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Utility.HtmlElement.insertAtTopOfSelector] element not found by selector: ${selector}`);

            return false;
        }

        return parentEl.insertBefore(element, parentEl.firstChild);
    },

    appendToSelector (element, selector) {
        if (!(element instanceof HTMLElement)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.HtmlElement.appendToSelector] element not instanceof HTMLElement');

            return false;
        }

        const anchorEl = document.querySelectorAll(selector)[0];

        if (!anchorEl) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Utility.HtmlElement.appendToSelector] anchor element not found by selector: ${selector}`);

            return false;
        }

        return anchorEl.appendChild(element);
    },

    insertBeforeSelector (element, selector) {
        if (!(element instanceof HTMLElement)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.HtmlElement.insertBeforeSelector] element not instanceof HTMLElement');

            return false;
        }

        const referenceEl = document.querySelectorAll(selector)[0];
        const parentEl = referenceEl && referenceEl.parentNode;

        if (!parentEl) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Utility.HtmlElement.insertBeforeSelector] element not found by selector: ${selector}`);

            return false;
        }

        return parentEl.insertBefore(element, referenceEl);
    },

    insertAfterSelector (element, selector) {
        if (!(element instanceof HTMLElement)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.HtmlElement.insertAfterSelector] element not instanceof HTMLElement');

            return false;
        }

        const referenceEl = document.querySelectorAll(selector)[0];
        const parentEl = referenceEl && referenceEl.parentNode;

        if (!parentEl) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Utility.HtmlElement.insertAfterSelector] element not found by selector: ${selector}`);

            return false;
        }

        return parentEl.insertBefore(element, referenceEl.nextSibling);
    },

    createDiv (config = {}) {
        const { classStyles, dataAttributes } = config;

        const CLASS_ATTRIBUTE = 'class';
        const PARENT_EL = 'div';
        const parent = document.createElement(PARENT_EL);

        if (classStyles) {
            parent.setAttribute(CLASS_ATTRIBUTE, classStyles);
        }

        if (dataAttributes) {
            Object.keys(dataAttributes).forEach(key => {
                parent.setAttribute(key, dataAttributes[key]);
            });
        }

        return parent;
    },

    createParagraphTextNode (paragraphText) {
        const textNode = document.createTextNode(paragraphText);

        return textNode;
    },

    createLabel (config) {
        const { labelFor, classStyles, label } = config;

        const CLASS_ATTRIBUTE = 'class';
        const FOR_ATTRIBUTE = 'for';
        const LABEL_EL = 'label';

        const labelContainer = document.createElement(LABEL_EL);
        const labelTextNode = document.createTextNode(label)

        if (classStyles) {
            labelContainer.setAttribute(CLASS_ATTRIBUTE, classStyles);
        }

        if (labelFor) {
            labelContainer.setAttribute(FOR_ATTRIBUTE, labelFor);
        }

        labelContainer.appendChild(labelTextNode);

        return labelContainer;
    },

    createRadioInput (config) {
        const { id, name, value, isChecked } = config;

        const INPUT_EL = 'input';
        const RADIO_INPUT_TYPE = 'radio';
        const ID_ATTRIBUTE = 'id';
        const TYPE_ATTRIBUTE = 'type';
        const NAME_ATTRIBUTE = 'name';
        const VALUE_ATTRIBUTE = 'value';
        const RADIO_CHECKED = 'checked';

        const inputContainer = document.createElement(INPUT_EL);

        inputContainer.setAttribute(TYPE_ATTRIBUTE, RADIO_INPUT_TYPE);

        if (id) {
            inputContainer.setAttribute(ID_ATTRIBUTE, id);
        }

        if (name) {
            inputContainer.setAttribute(NAME_ATTRIBUTE, name);
        }

        if (value) {
            inputContainer.setAttribute(VALUE_ATTRIBUTE, value);
        }

        if (isChecked) {
            inputContainer.setAttribute(RADIO_CHECKED, isChecked);
        }

        return inputContainer;
    },
    show (element) {
        if (!element || !(element instanceof HTMLElement) ) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Utility.HtmlElement.show] element is not a dom element: ${element}`);
            return false;
        }
        element.style.display = 'block'
    },
    hide (element) {
        if (!element || !(element instanceof HTMLElement) ) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Utility.HtmlElement.show] element is not a dom element: ${element}`);
            return false;
        }
        element.style.display = 'none'
    },
};

export default SDG.Utility.HtmlElement;
