/**
 * TimeCountdown component
 *
 * @class TimeCountdown
 *
 * @param  {ISO format date | string} date [end date for countdown]
 * @param  {string} [header] [header text]

 * @param {string} [padding = '00'] [number of 0 padded digits to display per time value]
 * @param {string} [displayUnits = 'dhms'] [map of labels to display for days, months, hours, and seconds]
 * @param {object} [valueLabels] [map of labels to display for days, months, hours, and seconds]
 * @return {class} Returns a class instance
 *
 * @method appendTo [appends counter element to an element]
 * @param {string} [class name, id, or css selector of element where to append counter element]
 *
 * @method start [starts counter]
 * @return {boolean}
 *
 * @method stop [ends counter - clears interval]
 *
 * @method remove [removes element from DOM]

 * @example
 * const options = {
 *     date: "019-07-22T18:01:39.671Z",
 *     header: "My header",
 *     displayUnits: 'hms',
 *     valueLabels: {
 *         'd': 'Dys',
 *         'h': 'Hrs',
 *         'm': 'Mns',
 *         's': 'Scs'
 *     }
 * };
 *
 * const timer = new SDG.Component.timeCountdown(options);
 * timer.appendTo([element selector]);
 *
 * timer.start();
 */


SDG.Component = SDG.Component || {};

SDG.Component.TimeCountdown = class TimeCountdown {
    constructor(options) {
        this.date = options.dateISO; // TODO: update options.date after MW1 converted or expired
        this.header = options.header;
        this.footer = options.footer;
        this.valueLabels = options.valueLabels || this.constructor.defaults().labels;
        this.padding = options.padding || this.constructor.defaults().valuePadding;
        this.displayUnits = this.constructor.parseDisplayUnits(options.displayUnits);

        this.currentRemaining = {};
        this.countdownValueEls = {};

        this.el = this.createEl();
    }

    static defaults () {
        return {
            labels: {
                'd': 'Days',
                'h': 'Hours',
                'm': 'Minutes',
                's': 'Seconds',
            },
            allowedUnits: ['d', 'h', 'm', 's'],
            valuePadding: '00',
        };
    }

    static parseDisplayUnits (units) {
        const { allowedUnits } = this.defaults();

        if (!units) {
            return allowedUnits;
        }

        units = units
            .toLowerCase()
            .replace(/[^a-z]/g, '')
            .split('');

        const validUnits = units.every(unit => allowedUnits.includes(unit));

        if (!validUnits) {
            return allowedUnits;
        }

        return units;
    }

    createUnitEl (unitKey) {
        const unitLabel = this.valueLabels[unitKey];

        const el = document.createElement('div');
        el.classList = 'ozc-time-countdown__item';

        const valueEl = document.createElement('div');
        valueEl.classList = 'ozc-time-countdown__value';
        valueEl.innerHTML = '<span>0</span><span>0</span>';

        const labelEl = document.createElement('div');
        labelEl.classList = 'ozc-time-countdown__value-label';
        labelEl.innerHTML = `${unitLabel}`;

        this.countdownValueEls[unitKey] = valueEl;

        el.appendChild(valueEl);
        el.appendChild(labelEl);

        return el;
    }

    createElHeader () {
        if (!this.header) {
            return false;
        }

        const el = document.createElement('h3');
        el.classList = 'ozc-time-countdown__header h3-2';
        el.innerHTML = this.header;

        return el;
    }

    createFooterEl () {
        if (!this.footer) {
            return false;
        }

        const el = document.createElement('div');
        el.classList = 'ozc-time-countdown__footer';
        el.innerHTML = this.footer;

        return el;
    }

    createElBody () {
        const el = document.createElement('div');
        el.classList = 'ozc-time-countdown__body';

        this.displayUnits.forEach((key) => {
            el.appendChild(this.createUnitEl(key));
        });

        return el;
    }

    createEl () {
        const dateValid = SDG.Utility.Date.isValid(this.date);

        if (!dateValid) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.timeCountdown] date requires valid ISO format. Received: ', this.date);

            return false;
        }

        const headerEl = this.createElHeader();
        const bodyEl = this.createElBody();
        const footerEl = this.createFooterEl();

        const el = document.createElement('div');
        el.classList = 'ozc-time-countdown';

        if (headerEl) {
            el.appendChild(headerEl);
        }

        if (bodyEl) {
            el.appendChild(bodyEl);
        }

        if (footerEl) {
            el.appendChild(footerEl);
        }

        return el;
    }

    start () {
        const endDate = SDG.Utility.Date.getDateTimestamp(this.date);

        if (!endDate) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.timeCountdown start] date requires valid ISO format. Received: ', this.date);

            return false;
        }

        this.interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;
            const currentRemaining = {};

            currentRemaining.d = Math.floor(distance / (1000 * 60 * 60 * 24));
            currentRemaining.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            currentRemaining.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            currentRemaining.s = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                this.stop();

                return;
            }

            Object.keys(this.countdownValueEls).forEach((key) => {
                if (currentRemaining[key] !== this.currentRemaining[key]) {
                    this.updateTemplateValue(key, currentRemaining[key]);
                }
            });

            this.currentRemaining = currentRemaining;
        }, 1000);

        return true;
    }

    stop () {
        clearInterval(this.interval);
    }

    updateTemplateValue (key, newValue) {
        const digitsArray = String(newValue).split('');
        let digitsString = '';

        // Pad left to '00'
        if (digitsArray.length < this.padding.length) {
            for (let i = this.padding.length - digitsArray.length - 1; i >= 0; i -= 1) {
                digitsArray.unshift('0');
            }
        }

        digitsArray.forEach((digit) => {
            digitsString = digitsString.concat(`<span>${digit}</span>`);
        });

        this.countdownValueEls[key].innerHTML = digitsString;
    }

    appendTo (selector) {
        let targetEl = document.getElementsByClassName(selector)[0];

        if (!targetEl) {
            targetEl = document.getElementById(selector);
        }

        if (!targetEl) {
            // eslint-disable-next-line  prefer-destructuring
            targetEl = document.querySelectorAll(selector)[0];
        }

        if (!targetEl) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.TimeCountdown]: cannot find appendTo element by selector: ', selector);

            return;
        }

        targetEl.appendChild(this.el);
    }

    remove () {
        if (this.el && this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
    }
};

export default SDG.Component.TimeCountdown;
