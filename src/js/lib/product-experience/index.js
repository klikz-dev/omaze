import { initProductRecommendations } from '../../lib/features/product-recommendations';
import { trackProductRecommendationButton } from '../../lib/features/product-recommendations/modules/analytics/index';
import { getEnvironment } from '../env/environment';

SDG.ProductExperience = SDG.ProductExperience || {};

SDG.ProductExperience.init = function (productConf) {
    const {
        productId,
        productStatus,
    } = productConf;

    SDG.Utility.Date.formatAllElements();

    initExperienceProductRecommendations(productId, productStatus);

    initSecondaryStickyButton();
};

function initExperienceProductRecommendations (productId, productStatus) {
    const carouselConfig = {
        header: 'Check out more dreams to win!',
    }

    if (productStatus === 'closed') {
        carouselConfig.header = 'Explore more chances to win-win!';
    }

    if (getEnvironment().featureHouseFocusOn) {
        carouselConfig.header = getEnvironment().productRecDefaultHeader;
    }

    initProductRecommendations({
        productId: productId,
        carouselConfig: carouselConfig,
    });

    trackProductRecommendationButton();
}

// more background of this use of `requestAnimationFrame` at:
// https://www.html5rocks.com/en/tutorials/speed/animations/
function initSecondaryStickyButton () {
    const cssClassHidden = 'hidden';
    const optionsEl = document.getElementById('active-experience-app__donation-cards')
    const stickyEl = document.getElementsByClassName('exp-donate-button-wrapper--secondary')[0];

    if (!optionsEl || !stickyEl) {
        return false;
    }

    const stickyElClassList = stickyEl.classList;
    let lastKnownScrollY = 0;
    let lastIsPastThreshold = false;
    let isUpdating = false;

    function onScroll() {
        lastKnownScrollY = window.scrollY;

        requestUpdate();
    }

    function requestUpdate() {
        if(!isUpdating) {
            window.requestAnimationFrame(update);
        }

        isUpdating = true;
    }

    function update() {
        isUpdating = false;

        const currentScrollY = lastKnownScrollY;
        const currentIsPastThreshold = currentScrollY > (optionsEl.offsetTop + optionsEl.offsetHeight);

        if (currentIsPastThreshold === lastIsPastThreshold) {
            return false;
        }

        if (currentIsPastThreshold) {
            stickyElClassList.remove(cssClassHidden);
        } else {
            stickyElClassList.add(cssClassHidden);
        }

        lastIsPastThreshold = currentIsPastThreshold;
    }

    window.addEventListener('scroll', onScroll, false);
}
