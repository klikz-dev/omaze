window.SDG = window.SDG || {};
SDG.Utility = SDG.Utility || {};

SDG.Utility.Date = {

    monthNames () {
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    },

    shortMonthNames () {
        return [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
        ];
    },

    isValid (date) {
        const timeStamp = this.getDateTimestamp(date);

        if (!timeStamp) {
            return false;
        }

        return timeStamp;
    },

    getDateTimestamp (date) {
        return new Date(date).getTime();
    },

    format (date, format) {
        if (!this.isValid(date)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.Date.format] Invalid date: ', date);

            return '';
        }

        const monthNames = this.monthNames();
        const monthShort = this.shortMonthNames();
        const dateObj = new Date(date);

        if (format === 'mmm:dd') {
            return `${monthNames[dateObj.getMonth()].substring(0, 3)} ${dateObj.getDate()}`;
        }

        if (format === 'm:dd') {
            return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}`;
        }

        // June 12, 2020, Dec 12, 2020
        if (format === 'mmmm:dd:yyyy') {
            return `${monthShort[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
        }

        return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    },

    isInFuture (date) {
        const compareDate = this.getDateTimestamp(date);

        if (!compareDate) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.Date.isInFuture] Invalid date: ', date);

            return '';
        }

        return compareDate > Date.now();
    },

    getDateValues(date, hourFormat) {
        // this method takes a date and hourFormat (12h or 24h)
        // and returns all parts of the date in an object
        if (!this.isValid(date)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.Date.getDateValues] Invalid date: ', date);

            return false;
        }

        const HOUR_FORMAT_12 = '12h';
        const HOUR_FORMAT_24 = '24h';

        if (hourFormat && ![HOUR_FORMAT_12, HOUR_FORMAT_24].includes(hourFormat)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Utility.Date.getDateValues] Invalid hour format: ', hourFormat);

            return false;
        }

        hourFormat = !hourFormat ? HOUR_FORMAT_12 : hourFormat;

        const newDate = new Date(date);
        const month = this.monthNames()[newDate.getMonth()];
        const day = newDate.getDate();
        const year = newDate.getFullYear();
        let minute = newDate.getMinutes();
        let hour = newDate.getHours();
        const seconds = newDate.getSeconds();
        let timeOfDay = (hourFormat == HOUR_FORMAT_12) ? 'am' : HOUR_FORMAT_24;

        if (hourFormat === HOUR_FORMAT_12 && hour >= 12) {
            timeOfDay = 'pm';
            hour = (hour > 12) ? hour - 12 : hour;
        }

        // convert 0 (in 24 hour time pattern) to 12
        if (hourFormat === HOUR_FORMAT_12 && hour === 0) {
            hour = 12;
        }

        return {
            year,
            month,
            day,
            hour,
            minute,
            seconds,
            timeOfDay,
            hourFormat,
        }
    },

    getDaySuffix (dayNumber) {
        if (dayNumber > 3 && dayNumber < 21) return 'th';
        switch (dayNumber % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    },

    formatAllElements () {
        const ELEMENT_SELECTOR = '.js-formattable-date';
        const elements = document.querySelectorAll(ELEMENT_SELECTOR);

        elements.forEach(el => {
            const date = el.dataset.date;
            const format = el.dataset.format;

            if (!date || !format) {
                return;
            }

            const dateFormatted = this.format(date, format);

            el.innerHTML = dateFormatted;
        });
    },

    regexForPattern (pattern) {
        /* eslint-disable-next-line  no-useless-escape */
        const timeRe = '(0?[1-9]|1[0-2]):([0-5][0-9])\\s?([APap][mM])';
        /* eslint-disable-next-line  no-useless-escape */
        const dateRe = '(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(\\d{4})';

        const REGEX_MAP = {
            'h:mm am': {
                regex: new RegExp(`^${timeRe}$`),
                groupMap: [
                    'original',
                    'hour',
                    'minute',
                    'ampm',
                ],
            },
            'm/d/yyyy h:mm am': {
                regex: new RegExp(`^${dateRe} ${timeRe}$`),
                groupMap: [
                    'original',
                    'month',
                    'day',
                    'year',
                    'hour',
                    'minute',
                    'ampm',
                ],
            },
        };

        return REGEX_MAP[pattern];
    },

    stringDateAsTimestampUTC (string, pattern) {
        const parsed = this.parseDateTimePattern(string, pattern);

        if (!parsed) {
            return false;
        }

        return Date.UTC(
            parseInt(parsed.year) || 0,
            parseInt(parsed.month) -1 || 0,
            parseInt(parsed.day) || 0,
            parseInt(parsed.hour24) || 0,
            parseInt(parsed.minute) || 0,
            parseInt(parsed.millisecond) || 0,
        );
    },

    parseDateTimePattern (string, pattern) {
        if (typeof(string) !== 'string') {
            return false;
        }

        const re = this.regexForPattern(pattern);

        if (!re) {
            // eslint-disable-next-line no-console
            console.error(`[SDG.Utility.Date.parseDateTimePattern] regex not found for pattern: ${pattern}`);

            return false;
        }

        const match = string.match(re.regex);

        if (!match) {
            return false;
        }

        const result = {};

        re.groupMap.forEach((name, index) => {
            result[name] = String(match[index]).toLowerCase();
        })

        if (result.hour && result.minute && result.ampm) {
            const hour24 = this.hoursTo24Hour(result.hour, result.ampm);

            result.hour24 = hour24 && String(hour24);
        }

        return result;
    },

    hoursTo24Hour (hours, ampm) {
        const validAmPm = ['am', 'pm'];
        ampm = String(ampm).toLowerCase();
        hours = parseInt(hours, 10);

        if (!hours || !validAmPm.includes(ampm)) {
            return false;
        }

        if (ampm === 'am' && hours === 12) {
            return 0;
        }

        if (ampm === 'pm' && hours < 12) {
            return hours + 12;
        }

        return hours;
    },
};

export default SDG.Utility.Date;
