/**
* Product Page - Experience
*/

import daysCounter from './days-counter';
import experienceDetails from './experience-details';

SDG.productExperience = function () {

    // cached globals
    const $yellowFlag = document.querySelector('.yellow-flag');
    const $winnerAnnounceDates = Array.from(
        document.querySelectorAll('.js-winner-announce-date')
    );

    function init() {
        experienceDetails().init();

        // set up days left banners in leader
        daysCounter().init();

        // add yellow flag for end date to closed experience
        if ($yellowFlag) {
            timestampToDateLongForm($yellowFlag, true);
        }

        // add formatted end date to Winner Announced Date to closed experience
        if ($winnerAnnounceDates.length > 0) {
            $winnerAnnounceDates.forEach(($announceDate) => {
                timestampToDateLongForm($announceDate, false);
            })
        }
    }

    function addEvents() {

        _.addEvent({
            event: 'click',
            id: 'pvExperience',
            className: 'js-add-entries',
            fn: addEntries,
        });
    }

    window.addEvents = addEvents;

    function addEntries(e) {

        e.stopImmediatePropagation();
        const data = `add=&quantity=1&id=${this.dataset.id}`;

        if (_.hasClass(this, 'oz-btn--cta')) {
            // handle button
            this.disabled = true;
            _.addClass(this, 'is-loading');
            _.addClass(this, 'is-loading--white');
        }

        // add to bag
        SDG.Bag.addItem(data, 1);
    }

    /**
     * Timestamp to Date - Long Form
     * e.g. 2019-06-21T07:00:00.000Z --> June 21, 2019
     *
     * Experience Closed Yellow Flag
     * Experience Closed Winner Announced Date
     */
    function timestampToDateLongForm(selector, includeEnded) {
        const endDate = new Date(selector.dataset.endDate);
        const monthNames = [
            'Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
        ;
        const month = endDate.getUTCMonth();
        const day = endDate.getUTCDate();
        const year = endDate.getUTCFullYear();
        let string;

        if (includeEnded === true) {
            string = `Ended ${monthNames[month]} ${day}, ${year}`;
        } else {
            string = `${monthNames[month]} ${day}, ${year}`;
        }

        selector.innerHTML = string;
        selector.style.opacity = '1';
    }

    return init();
};

export default SDG.productExperience;
