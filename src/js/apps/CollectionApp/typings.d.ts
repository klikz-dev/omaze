declare module '*.module.css' {
    const classes: { [key: string]: string };
    // eslint-disable-next-line import/no-default-export
    export default classes;
}

declare module '*.styles.css' {
    const classes: { [key: string]: string };
    // eslint-disable-next-line import/no-default-export
    export default classes;
}

/* eslint-disable camelcase */
interface IDataLayer {
    event: string;
    ga_category: string;
    ga_action: string;
    ga_label: string;
    ga_value?: string | number;
}
/* eslint-enable camelcase */

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
    SDG: any;
    ozEligibilitySettings: {
        restrictedCountries: string[];
        eligibilityDate: Date;
    };
    dataLayer: IDataLayer[];
}
