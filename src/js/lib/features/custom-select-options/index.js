SDG.SelectOptions = SDG.SelectOptions || {};

SDG.SelectOptions.init = function(options) {
    options = options || {};
    const {
        list: optionsList,
        parentElement,
        defaultSelection,
    } = options;
    const defaultCountry = defaultSelection || 'United States';
    const selectedOption = getSelectedOption();

    if (!optionsList) {
        /* eslint-disable-next-line  no-console */
        console.error(
            `[SDG.SelectOptions.init]: cannot run feature. Invalid list option: ${JSON.stringify(
                options.list
            )}`
        );

        return false;
    }
    if (!parentElement || !(parentElement instanceof HTMLSelectElement)) {
        /* eslint-disable-next-line  no-console */
        console.error(
            `[SDG.SelectOptions.init]: cannot run feature. Invalid parent element: ${JSON.stringify(
                parentElement
            )}`
        );

        return false;
    }

    if (!Array.isArray(optionsList) || optionsList.length < 1) {
        /* eslint-disable-next-line  no-console */
        console.error(
            `[SDG.SelectOptions.init] invalid or empty optionsList ${optionsList}`
        );

        return false;
    }

    function run() {
        parentElement.innerHTML = '';
        optionsList.forEach(option => {
            appendOption(option);
        });
    }

    function appendOption(option) {
        const node = new SDG.Component.Element({
            tag: 'option',
            text: option.name || option.title || option.text,
            attributes: {
                'data-code': `${option.code}`,
                value: `${option.value}`,
            },
        });
        const { el } = node;
        if (option.value === selectedOption) {
            el.setAttribute('selected', '');
        }
        parentElement.appendChild(node.el);
    }

    function getSelectedOption() {
        if (parentElement.selectedIndex >= 0) {
            return parentElement.options[parentElement.selectedIndex].value;
        }
        return defaultCountry;
    }
    return run();
};
