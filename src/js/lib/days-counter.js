/**
 * Calculate days between now and a given end date
 */

SDG.daysCounter = function() {
    function init(conf) {
        const selector = (conf && conf.selector) || '.js-days-left';
        const nodeList = jQuery(selector);

        if (!nodeList.length) {
            return;
        }

        nodeList.each(function () {
            calculateDaysLeft(jQuery(this));
        });
    }

    function calculateDaysLeft(node) {
        const now = new Date().getTime();
        const nextDate = new Date(node.data('endDate'));
        const endDateJs = nextDate.getTime();

        if (endDateJs && (endDateJs > now)) {
            const timeDifference = endDateJs - now;
            const formattedDaysDiff = getFormattedDaysDiff(timeDifference);
            if (formattedDaysDiff) {
                node.text(formattedDaysDiff);
                node.css('opacity', 1);
            } 
        } else {
            node.css('display', 'none');
        }
    }

    /**
     * 
     * @param {*} timestamp - in milliseconds
     * @param {*} maxDaysDiff - max day to start showing the `days left` label
     */
    function getFormattedDaysDiff(timestamp, maxDaysDiff = 7) {
        const TWO_DAYS_IN_HOURS = 48;
        const MILLISECONDS_IN_ONE_HOUR = 3600000;
        const HOURS_IN_ONE_DAY = 24;

        const hourDifference = Math.ceil(timestamp / MILLISECONDS_IN_ONE_HOUR);
        const dayDifference = Math.ceil(hourDifference / HOURS_IN_ONE_DAY);
        if (hourDifference > 0 && dayDifference <= maxDaysDiff) {
            if (hourDifference === 1) { 
                return `${hourDifference} hour left!`;
            }
            if (hourDifference <= TWO_DAYS_IN_HOURS) { 
                return `${hourDifference} hours left!`;
            }
            if (dayDifference <= maxDaysDiff) {
                return `${dayDifference} days left!`;
            }
        }

        return false;
    }

    /* eslint-enable */

    return {
        init,
        getFormattedDaysDiff,
    };

};

export default SDG.daysCounter;