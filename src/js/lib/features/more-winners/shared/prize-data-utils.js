window.SDG = window.SDG || {};
SDG.MoreWinners = SDG.MoreWinners || {};

SDG.MoreWinners.PrizeDataUtils = {
    setData (contestData) {
        const formattedContestData = this.formatPrizes(contestData);

        this.cache.contests = formattedContestData;
    },

    getContests () {
        if (!this.cache.contests) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.MoreWinners.PrizeDataUtils.getContests] contest data not set.');

            return false;
        }

        return this.cache.contests;
    },
    getContestByTier (tier, sortKey) {
        const DEFAULT_SORT_KEY = 'announce_date_max';
        const contests = this.getContests();

        sortKey = sortKey || DEFAULT_SORT_KEY;

        if (!contests) {
            return [];
        }

        const tierContests = this.filterByTier(contests, tier);

        return this.sortDrawingsByDate(sortKey, tierContests);
    },

    getGrandPrize () {
        const GRAND_PRIZE_TIER = 1;

        return this.filterByTier(this.getContests(), GRAND_PRIZE_TIER)[0];
    },

    isValid (prizes) {
        if (!prizes || !Array.isArray(prizes)) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.MoreWinners.PrizeDataUtils] invalid prize data');

            return false;
        }

        return true;
    },

    formatPrizes (prizes) {
        if (!this.isValid(prizes)) {
            return false;
        }

        const prizesArray = [];

        prizes.forEach((prize) => {
            const flattenedPrize = this.flattenPrizeData(prize);

            if (flattenedPrize) {
                prizesArray.push(flattenedPrize);
            }
        });

        return prizesArray;
    },

    formatDrawings (prizes) {
        if (!this.isValid(prizes)) {
            return false;
        }

        let drawingArray = [];

        prizes.forEach((prize) => {
            const flattenedDrawing = this.flattenDrawingData(prize);

            if (flattenedDrawing) {
                drawingArray = drawingArray.concat(flattenedDrawing);
            }
        });

        return drawingArray;
    },

    getNextDrawingByDateKey (drawings, dateKey) {
        if (!Array.isArray(drawings) || !dateKey) {
            return false;
        }

        const sorted = this.sortDrawingsByDate(dateKey, drawings);

        return sorted && sorted.find(drawing => SDG.Utility.Date.isInFuture(drawing[dateKey]));
    },

    flattenPrizeData (prizeData) {
        const prize = prizeData && prizeData.metadata;
        const drawings = prize && prize.drawings;

        if (!Array.isArray(drawings) || drawings.length < 1) {
            return false;
        }

        let prizeCopy = Object.assign({}, prize);

        if (drawings.length === 1) {
            prizeCopy.recurring = false;

            prizeCopy = Object.assign(prizeCopy, drawings[0]);
        }

        if (drawings.length > 1) {
            prizeCopy.recurring = true;
        }

        prizeCopy = Object.assign(prizeCopy, this.getMinMaxDrawingDates(drawings));

        return prizeCopy;
    },

    flattenDrawingData (prizeData) {
        const prize = prizeData && prizeData.metadata;
        const drawings = prize && prize.drawings;

        if (!Array.isArray(drawings) || drawings.length < 1) {
            return false;
        }

        const drawingArray = [];
        let drawingCopy;

        drawings.forEach((drawing) => {
            drawingCopy = Object.assign({}, prize, drawing);

            const overrideData = this.getDrawingOverrideData(drawing);

            if (overrideData && overrideData.title) {
                drawingCopy.title = overrideData.title;

                delete drawingCopy.prize_title;
            }

            if (overrideData && overrideData.hero_image) {
                drawingCopy.hero_image = overrideData.hero_image;

                delete drawingCopy.prize_image;
            }

            delete drawingCopy.drawings;

            drawingArray.push(drawingCopy);
        });

        return drawingArray;
    },

    // allow individual prize properties to override contest properties
    getDrawingOverrideData (drawing) {
        const data = {};

        if (!drawing) {
            return data;
        }

        const prizeTitle = drawing.prize_title && drawing.prize_title.trim();

        if (prizeTitle) {
            data.title = prizeTitle;
        }

        if (drawing.prize_image && drawing.prize_image.imgix_url) {
            data.hero_image = drawing.prize_image;
        }

        return data;
    },

    getMinMaxDrawingDates (drawings) {
        const dateKeys = ['enter_by_date', 'drawing_date', 'announce_date'];
        const dates = {};

        if (!Array.isArray(drawings)) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.MoreWinners.PrizeDataUtils.getMinMaxDrawingDates] invalid drawing data');

            return dates;
        }

        dateKeys.forEach((key) => {
            const sorted = this.sortDrawingsByDate(key, drawings, false);

            dates[`${key}_min`] = sorted[0][key];
            dates[`${key}_max`] = sorted[sorted.length - 1][key];
        });

        return dates;
    },

    sortDrawingsByDate (sortKey, drawings, reverse) {
        if (!sortKey || !Array.isArray(drawings)) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.MoreWinners.PrizeDataUtils.sortDrawingsByDate] invalid drawing data');

            return false;
        }

        const sortable = drawings.slice(0);
        let returnVal = 1;

        if (reverse) {
            returnVal = -returnVal;
        }

        function compare (a, b) {
            const timestampA = SDG.Utility.Date.getDateTimestamp(a[sortKey]);
            const timestampB = SDG.Utility.Date.getDateTimestamp(b[sortKey]);

            if (timestampA < timestampB) {
                return -returnVal;
            }

            if (timestampA > timestampB) {
                return returnVal;
            }

            return 0;
        }

        return sortable.sort(compare);
    },

    filterByTier (drawings, tier) {
        if (!Array.isArray(drawings) || !tier) {
            return [];
        }

        return drawings.filter(drawing => String(drawing.tier) === String(tier));
    },

    filterByTiers (drawings, tiers) {
        if (!drawings && !tiers) {
            return [];
        }

        let filtered = [];

        if (!Array.isArray(tiers)) {
            tiers = [tiers];
        }

        tiers.forEach((tier) => {
            filtered = filtered.concat(this.filterByTier(drawings, tier));
        });

        return filtered;
    },

    getLastWinnerByDate (drawings, dateKey) {
        if (!Array.isArray(drawings) || !dateKey) {
            return false;
        }

        const sorted = this.sortDrawingsByDate(dateKey, drawings, true);

        return sorted.find((drawing) => {
            const dateValid = SDG.Utility.Date.isValid(drawing[dateKey]);

            return dateValid && !SDG.Utility.Date.isInFuture(drawing[dateKey]) && drawing.winner_name && drawing.winner_location;
        });
    },
};

SDG.MoreWinners.PrizeDataUtils.cache = {};

export default SDG.MoreWinners.PrizeDataUtils;
