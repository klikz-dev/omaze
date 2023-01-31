/**
 * Experience Details
 */

SDG.experienceDetails = function() {

    const $experienceLeader = jQuery('.oz-experience-leader');
    const $expDetailsWrapper = jQuery('.js-details-wrapper');
    const $fullWidthSectionAfterDetails = $expDetailsWrapper.nextAll('.columns__one-full-width');
    const $expBenefitEl = jQuery('.exp-benefit');
    const $facebookShareButtonEl = jQuery('.exp-details__share .social-share--fb');
    const $gallerySections = jQuery('.js-gallery-section');
    const EXPERIENCE_WINNER_SECTION = jQuery('.js-exp-winner');
    const isClosedCampaign = EXPERIENCE_WINNER_SECTION.length > 0;
    const LARGE_SCREEN_THRESHOLD = 1100;
    let isSubscribedToScroll = false;

    function init() {
        setupFBShareBtn();

        if (window.innerWidth > LARGE_SCREEN_THRESHOLD) {

            if ($gallerySections.length < 3) return;

            setExpDetailsPositionOnScroll();

            // bind scroll event to large screen on init
            jQuery(window).on('scroll', setExpDetailsPositionOnScroll);
            isSubscribedToScroll = true;
        }

        jQuery(window).on('resize', setExpDetailsPositionOnResize);
        _.scrollTo({
            id: 'enter-now-button-desktop',
            offset: () => -1 * SDG.Header.getHeight(),
        })
        _.scrollTo({
            id: 'enter-now-button-mobile',
            offset: () => -1 * SDG.Header.getHeight(),
        })
        _.scrollTo({
            id: 'enter-now-button-secondary',
            offset: () => -1 * SDG.Header.getHeight(),
        })
    }

    function setupFBShareBtn () {
        $facebookShareButtonEl.on('click', () => {
            FB.ui({
                method: 'share',
                display: 'popup',
                href: window.location.href,
            }, (response) => {
                /* eslint-disable-next-line  no-console */
                console.log(response);
            });
        });
    }

    /* Handle ExpDetails Position
    * based on how much page scrolled
    */
    function setExpDetailsPositionOnScroll () {
        if (isClosedCampaign || (window.innerWidth <= LARGE_SCREEN_THRESHOLD)) {
            return;
        }

        const detailsOffsetTop = $experienceLeader.offset().top;
        const detailsHeight = $expDetailsWrapper.height();
        const detailsHeightWithMargin = detailsHeight + detailsOffsetTop;

        // check if details section can show within the viewport height
        if (detailsHeightWithMargin > jQuery(window).height()) {
            $expDetailsWrapper.css({
                'position': 'absolute',
                'top': 'initial',
            });

            return;
        }

        const nextSectionOffsetTop = $fullWidthSectionAfterDetails.offset().top;
        const nextSectionMargin = parseInt($expBenefitEl.css('margin-bottom')) || 0;
        const scrollTopDelta = nextSectionOffsetTop - nextSectionMargin - detailsHeightWithMargin;

        if (jQuery(window).scrollTop() >= (scrollTopDelta)) {
            // page scroll over fullColumnSection
            $expDetailsWrapper.css({
                'position': 'absolute',
                'top': scrollTopDelta,
            });
        } else {
            $expDetailsWrapper.css({
                'position': 'fixed',
                'top': 'initial',
            });
        }
    }

    /* Handle ExpDetails Position
    * based on screen width
    */
    function setExpDetailsPositionOnResize () {
        if (window.innerWidth <= LARGE_SCREEN_THRESHOLD) {
            // do not bother change pos if it's already relative
            if ($expDetailsWrapper.css('position') !== 'relative') {
                $expDetailsWrapper.css({
                    'position': 'relative',
                    'top': 'initial',
                });
            }
        } else {
            setExpDetailsPositionOnScroll();

            // bind scroll event if not yet
            if (!isSubscribedToScroll) {
                jQuery(window).on('scroll', setExpDetailsPositionOnScroll);
                isSubscribedToScroll = true;
            }
        }
    }

    return {
        init,
    };
};

export default SDG.experienceDetails;
