/**
 * counter
 */

SDG.counter = function() {

    function init(parentSelector) {

        const $parent = parentSelector ? jQuery(parentSelector) : '';
        const $counter = ($parent.length && $parent.find('.js-counter')) || jQuery('.js-counter');
        const $counterDays = $counter.find('.js-counter-days');
        const $counterHours = $counter.find('.js-counter-hours');
        const $counterMins = $counter.find('.js-counter-mins');
        const $counterSecs = $counter.find('.js-counter-secs');
        const endDateUnix = $counter.data('endDate');
        const nextDate = new Date(endDateUnix);
        const endDateJs = nextDate.getTime();

        // For experience page, only show when the end date is valid & ends less then 48 hours
        if (!endDateUnix || (!endsInTwoDays(endDateJs) && parentSelector !== '.pv-essential__content') || !$counter || !$counter.countdown) {
            return;
        }

        $counter.countdown(endDateJs, (event) => {
            $counterDays.text(event.strftime('%D'));
            $counterHours.text(event.strftime('%H'));
            $counterMins.text(event.strftime('%M'));
            $counterSecs.text(event.strftime('%S'));
        });

        // once init, counter fade in
        $counter.css({
            display: 'block',
            opacity: 1,
        });
    }

    function endsInTwoDays (endDateJs) {
        const now = new Date().getTime();

        return ((endDateJs - now) / 1000 / 3600 / 24) <= 2;
    }

    return {
        init,
    };
};

export default SDG.counter;