export interface IUseGTMDataLayer {
    pushEvent(): void;
}

/* eslint-disable camelcase */
export interface IDataLayer {
    event: string;
    ga_category: string;
    ga_action: string;
    ga_label: string;
    ga_value?: string | number;
}
/* eslint-enable camelcase */

export function useGTMDataLayer (trackingData: IDataLayer): IUseGTMDataLayer {
    function pushEvent (): void {
        window.dataLayer && window.dataLayer.push(trackingData);
    }

    return {
        pushEvent: pushEvent,
    };
}
