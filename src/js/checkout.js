//! This doesn't exist on checkout, necessary otherwise SDG imports break...
window.SDG = window.SDG || {};

/**
 * plugins
 */
import './plugins/lazysizes';

/**
 * utility classes
 */
import './lib/utility/date';
import './lib/utility/html-element';
import './lib/cookies';
import './lib/checkout-countries';
import './lib/access-restrictions/index';
import './lib/access-restrictions/country-restrictions';

// import your checkout scripts here
import './lib/features/analytics/index';
import './lib/features/custom-select-options';
import './lib/features/contextual-email-capture';
import './lib/components/ozc-base-node';
import './lib/components/ozc-element';
import './lib/components/ozc-carousel';
import './lib/components/ozc-product-recommendation-card';
import './lib/features/signup-value-proposition';


// init / load scripts for checkout (features, etc)
import './lib/checkout/modify-header-content';
import './lib/checkout/modify-footer-content';
import './lib/checkout/modify-contact-information-content';
import './lib/checkout/modify-content-compliance';
import './lib/checkout/modify-line-item-content';
import './lib/checkout/contextual-email-capture';
import './lib/checkout/product-recommendations';
import './lib/checkout/marketing-opt-in';
import './lib/checkout/customize-content';
