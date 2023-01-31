import styles from '../UnknownErrorMessage.styles.css';

export interface IUnknownErrorMessagePresenterClassNames {
    container: string;
    title: string;
    action: string;
    support: string;
}

export interface IUnknownErrorMessagePresenterTextContent {
    title: string;
    description: string;
    action: string;
    support: string;
}

export class UnknownErrorMessagePresenter {
    public static getAllClassNames (): IUnknownErrorMessagePresenterClassNames {
        return {
            container: styles.container,
            title: styles.title,
            action: styles.action,
            support: styles.support,
        };
    }

    public static getAllTextContent (): IUnknownErrorMessagePresenterTextContent {
        return {
            title: 'Oops!',
            description: 'Something went wrong.',
            action: 'Please try again.',
            support: 'If you continue having issues, please contact Omaze support at ' +
                '<a href=\'mailto:weloveyou@omaze.com\'>weloveyou@omaze.com</a>.',
        };
    }
}
