SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};

SDG.MoreWinners.Templates.DrawingCountdown = function(drawing) {
    function run () {
        if (!drawing || !drawing.title || !drawing.drawing_date) {
            return false;
        }

        const footerHTML = `
            <p>to also win a</p>
            <h3>${drawing.title}</h3>
        `;

        const countdownClock = new SDG.Component.TimeCountdown({
            dateISO: drawing.drawing_date,
            header: 'Enter in the next',
            footer: footerHTML,
        });

        if (!countdownClock || !countdownClock.el) {
            return false;
        }

        const component = new SDG.Component.Element({
            cssClasses: 'ozc-more-winners__drawing-countdown',
            children: [
                countdownClock,
            ],
        });

        if (component && component.el) {
            countdownClock.start();
        }

        return component.el;
    }

    return run();
};
