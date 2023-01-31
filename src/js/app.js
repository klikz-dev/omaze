/**
 * app
 *
 * script
 * polyfills
 * plugins
 * utils
 * global modules
 * global js
 */

import './lib/back-forward-cache';

/**
 * script
 */
import './lib/script-module';

/**
 * polyfills
 */
import './lib/polyfills';

/**
 * plugins
 */
import './plugins/what-input';
import './lib/lazy-load-option';
import './plugins/lazysizes';
import './plugins/ls.attchange';
import './plugins/jquery.countdown.min';

/**
 * utils
 */
import './util/add-class';
import './util/ajax';
import './util/array-to-lower';
import './util/click-outside';
import './util/debounce';
import './util/extend';
import './util/encode';
import './util/events';
import './util/focus-first-input';
import './util/format-price';
import './util/format-price-display';
import './util/format-price-number';
import './util/get-hidden-styles';
import './util/get-query-string';
import './util/get-sized-image-url';
import './util/get-url-parameter';
import './util/handleize';
import './util/has-class';
import './util/hide';
import './util/insert-after';
import './util/is-delimited-array';
import './util/is-dom-element';
import './util/is-object';
import './util/is-object-empty';
import './util/media-query';
import './util/namespace';
import './util/number-with-commas';
import './util/object-to-query-string';
import './util/parents';
import './util/ready';
import './util/remap-size-values';
import './util/remove-class';
import './util/remove-class-by-prefix';
import './util/remove-protocol';
import './util/scroll-to';
import './util/serialize';
import './util/show';
import './util/slide';
import './util/to-number';
import './util/transition';
import './util/trigger';
import './util/upcase';
import './util/waypoint';
import './util/window-resize';
import './util/load-jsonp';

/**
 * global modules
 */
import './lib/accordion';
import './lib/bag-config';
import './lib/bag-count';
import './lib/bag-empty';
import './lib/bag-init';
import './lib/bag-items';
import './lib/bag-recalc';
import './lib/bag-refresh';
import './lib/bag-update';
import './lib/bag-variant';
import './lib/cookies';
import './lib/footer';
import './lib/header';
import './lib/incrementer';
import './lib/input-placeholder';
import './lib/messages';
import './lib/modal-clear';
import './lib/modal-get-html';
import './lib/modal';
import './lib/newsletter';
import './lib/sq';
import './lib/toggle-dropdown';

import './lib/access-restrictions';
import './lib/access-restrictions/country-restrictions';

import './lib2/cart-handler';

/**
 * global js (js used throughout every page of the site)
 */
import './lib/global-ui';

/**
 * utility classes
 */
import './lib/utility/date';
import './lib/utility/string';
import './lib/utility/html-element';
import './lib/utility/html-utils';
import './lib/utility/script-load';
import './lib/utility/style';
import './lib/utility/uri';
import './lib/utility/tags';

/**
 * components
 */
import './lib/components/ozc-base-node';
import './lib/components/ozc-time-countdown';
import './lib/components/ozc-element';
import './lib/components/ozc-image';
import './lib/components/ozc-carousel';
import './lib/components/ozc-winner-card';
import './lib/components/ozc-scroll-top-button';
import './lib/components/ozc-page-tabs';
import './lib/components/ozc-prizes-overview';
import './lib/components/ozc-page-hero';
import './lib/components/ozc-prize-card';
import './lib/components/ozc-prize-card-simple';
import './lib/components/ozc-callout-block';
import './lib/components/ozc-message-banner';
import './lib/components/ozc-quote-block';
import './lib/components/ozc-video-player';
import './lib/components/ozc-social-share';
import './lib/components/ozc-social-share-facebook';
import './lib/components/ozc-social-share-twitter';
import './lib/components/ozc-social-share-email';
import './lib/components/ozc-social-share-clipboard';
import './lib/components/ozc-link-row';
import './lib/components/ozc-modal';
import './lib/components/ozc-cross-sell-product-card';
import './lib/components/ozc-product-recommendation-card';
import './lib/components/ozc-promotion-board';

/**
 * features
 */
import './lib/cosmicjs/api';
import './lib/features/analytics/index';
import './lib/features/banner-ad/index';
import './lib/features/feature-load';
import './lib/features/feature-validation';
import './lib/features/more-winners/index';
import './lib/features/message-banner/index';
import './lib/features/image-carousel/index';
import './lib/features/more-winners/shared/prize-data-utils';
import './lib/features/more-winners/open-experience/tab-overview';
import './lib/features/more-winners/open-experience/tab-impact';
import './lib/features/more-winners/open-experience/tab-prizes';
import './lib/features/more-winners/closed-experience/closed-experience';
import './lib/features/marketing';
import './lib/features/contextual-email-capture';
import './lib/features/personalization';
import './lib/features/signup-value-proposition';
import './lib/features/combo-promotion';
import './lib/features/promotion-board';

/**
 * feature templates
 */
import './lib/features/more-winners/open-experience/templates/announcement-card-list';
import './lib/features/more-winners/open-experience/templates/more-prizes';
import './lib/features/more-winners/open-experience/templates/scroll-top-button';
import './lib/features/more-winners/open-experience/templates/featured-winner';
import './lib/features/more-winners/open-experience/templates/drawing-countdown';
import './lib/features/more-winners/closed-experience/templates/header';
import './lib/features/more-winners/closed-experience/templates/impact';
import './lib/features/more-winners/closed-experience/templates/cta-card';
import './lib/features/more-winners/closed-experience/templates/winner-cards';
import './lib/features/more-winners/closed-experience/templates/quote-block';
import './lib/features/more-winners/closed-experience/templates/extra-prizes';
import './lib/features/more-winners/closed-experience/templates/extra-prizes-no-winners';

// Cart scripts
import './lib/cart/combo-promotion/banner-ad';
import './lib/cart/index';

// Account orders product recommendation script
import './lib/account-orders/index.js'

// Product experience product recommendation script
import './lib/product-experience/index.js'

import './lib/skeleton-loading';

// Email Verification
import './lib/send-verification-email';
