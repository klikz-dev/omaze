interface IPortalPresenterConfig {
    el: Element | null;
}

export class PortalPresenter {
    protected _el: Element | null;

    protected hasCleaned: boolean = false;

    public get el (): Element {
        if (this._el === null) {
            throw new Error('Portal element is not ready');
        }

        return this._el;
    }

    public constructor (config: IPortalPresenterConfig) {
        this._el = config.el;
    }

    public isElReady (): boolean {
        return this._el !== null;
    }

    public cleanEl (): void {
        if (this.hasCleaned || this._el === null) {
            return;
        }

        const children: Element[] = Array.prototype.slice.apply(this._el.children);

        children.forEach((child: ChildNode): void => {
            // TS falsely thinks this.el can be null here
            this._el?.removeChild(child);
        });

        this.hasCleaned = true;
    }
}
