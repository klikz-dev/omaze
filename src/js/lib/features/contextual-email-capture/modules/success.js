import  {default as Element}  from '../../../components/ozc-element.js';

const success = {
    getContent(option) {
        const CSS_CLASS_SUCCESS = 'success_container';
        const CSS_CLASS_TITLE = `${CSS_CLASS_SUCCESS}__title`;
        const CSS_CLASS_MESSAGE = `${CSS_CLASS_SUCCESS}__message`;
        const title = new Element({
            cssClasses: CSS_CLASS_TITLE,
            tag: 'p',
            content: option.successTitle,
        });

        const message = new Element({
            cssClasses: CSS_CLASS_MESSAGE,
            tag: 'p',
            content: option.successMessage,
        });

        const content = new Element({
            cssClasses: CSS_CLASS_SUCCESS,
            children: [
                title,
                message,
            ],
        })

        return content;
    },
}

export default success;
