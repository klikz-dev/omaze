import { default as Validation } from './feature-validation.js';
import { default as StringUtility } from '../utility/string.js';
import { cosmicFetchBySlug } from '../cosmicjs/api';
import { SilentError } from '../errors/silent-error';

SDG = SDG || {};
SDG.Features = SDG.Features || {};

SDG.Features.Loader = {
    load (config) {
        const {
            env,
            slug,
            preview,
        } = config;

        if (!slug || !env) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.Features.Loader.load]: invalid data with slug: [${slug}], env: [${env}]`);

            return false;
        }

        return cosmicFetchBySlug(slug, env, preview)
            .then((features) => {
                this.initFeatures(features, config);
            })
            .catch((error) => {
                if (error instanceof SilentError) {
                    return false;
                }

                /* eslint-disable-next-line  no-console */
                console.error('[SDG.Features.Loader.load]: ', error);
            });
    },

    initFeatures (features = [], config) {
        Object.keys(features).forEach((key) => {
            const featureName = this.toFeatureName(key);

            this.initFeature(featureName, features[key], config);
        });

        return true;
    },

    initFeature (featureName, featureData = {}, config = {}) {
        const {
            featureFlags = {},
        } = config;

        if (Validation.shouldSkipFeature(featureName)) {
            return false;
        }

        const moduleName = this.toModuleName(featureName);

        if (!SDG[moduleName]) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.Features.initFeatures]: cannot init feature [${featureName}] for module: [${moduleName}].`);

            this.onFeatureFail(featureName);

            return false;
        }

        return Validation
            .featureFlagDisabled(featureName, featureFlags)
            .then((disabled) => {
                if (disabled) {
                    return false;
                }

                this.initFeatureClass(featureName)

                SDG[moduleName].init(featureData, config);
            })
    },

    initFeatureClass (featureName) {
        const body_SELECTOR = 'body';
        const CSS_PREFIX = 'oz-external--';

        const className = CSS_PREFIX + featureName;

        document.querySelector(body_SELECTOR).classList.add(className);
    },

    // reformats string to "Feature module" format (e.g.: hello-feature)
    toModuleName (string) {
        const featureName = this.toFeatureName(string);

        if (!featureName) {
            return false;
        }

        return featureName
            .split(/[-_]+/)
            .map(str => StringUtility.capitalize(str))
            .join('');
    },

    // reformats string to "Feature name" format (e.g.: HelloFeature)
    toFeatureName (string) {
        if (!string) {
            return false;
        }

        return string
            .toLowerCase()
            .replace(/[\s_-]+/g, '_')
            .replace('_feature', '')
            .replace(/_/g, '-');
    },

    onFeatureFail (featureName) {
        return Validation.invalidateFeature(featureName);
    },
};


export default SDG.Features.Loader;
