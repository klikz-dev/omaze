import {
    IUnknownErrorMessagePresenterClassNames,
    IUnknownErrorMessagePresenterTextContent,
    UnknownErrorMessagePresenter,
} from './UnknownErrorMessagePresenter';

describe(UnknownErrorMessagePresenter, (): void => {
    it('should return the correct classNames', (): void => {
        const classNames: IUnknownErrorMessagePresenterClassNames = UnknownErrorMessagePresenter.getAllClassNames();

        expect(classNames).toEqual({
            container: 'container',
            title: 'title',
            action: 'action',
            support: 'support',
        });
    });

    it('should return the correct text content', (): void => {
        const textContent: IUnknownErrorMessagePresenterTextContent = UnknownErrorMessagePresenter.getAllTextContent();

        expect(textContent).toEqual({
            title: 'Oops!',
            description: 'Something went wrong.',
            action: 'Please try again.',
            support: 'If you continue having issues, please contact Omaze support at ' +
                '<a href=\'mailto:weloveyou@omaze.com\'>weloveyou@omaze.com</a>.',
        });
    });
});
