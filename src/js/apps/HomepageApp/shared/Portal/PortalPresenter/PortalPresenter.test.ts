import '@testing-library/jest-dom/extend-expect';

import { PortalPresenter } from './PortalPresenter';

describe('PortalPresenter', (): void => {
    it('should know when the element is not ready', (): void => {
        const presenter: PortalPresenter = new PortalPresenter({
            el: null,
        });

        expect(presenter.isElReady()).toBe(false);
    });

    it('should know when the element is ready', (): void => {
        const div: HTMLDivElement = document.createElement('div');

        document.body.appendChild(div);

        const presenter: PortalPresenter = new PortalPresenter({
            el: div,
        });

        expect(presenter.isElReady()).toBe(true);

        document.body.removeChild(div);
    });

    it('should throw an error when trying to access an el that is not ready', (): void => {
        const presenter: PortalPresenter = new PortalPresenter({
            el: null,
        });

        expect((): void => {
            presenter.el;
        }).toThrow();
    });

    it('should not throw an error when trying to access an el that is ready', (): void => {
        const div: HTMLDivElement = document.createElement('div');

        document.body.appendChild(div);

        const presenter: PortalPresenter = new PortalPresenter({
            el: div,
        });

        expect(presenter.el).toBe(div);

        document.body.removeChild(div);
    });

    it('should only try to clean an element that is ready', (): void => {
        const presenter: PortalPresenter = new PortalPresenter({
            el: null,
        });

        expect((): void => {
            presenter.cleanEl();
        }).not.toThrow();
    });

    it('should clean an element that is ready', (): void => {
        const div: HTMLDivElement = document.createElement('div');

        document.body.appendChild(div);

        const content: HTMLParagraphElement = document.createElement('p');

        div.appendChild(content);

        const presenter: PortalPresenter = new PortalPresenter({
            el: div,
        });

        expect(content).toBeInTheDocument();

        presenter.cleanEl();

        expect(content).not.toBeInTheDocument();

        expect((): void => {
            presenter.cleanEl();
        }).not.toThrow();

        document.body.removeChild(div);
    });
});
