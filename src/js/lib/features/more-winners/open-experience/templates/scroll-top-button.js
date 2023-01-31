SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};

SDG.MoreWinners.Templates.ScrollTopButton = function() {
    function run () {
        const component = new SDG.Component.Element({
            cssClasses: 'ozc__panel--emphasis-2 text--centered',
        });

        const button = new SDG.Component.ScrollTop({
            tag: 'span',
            text: 'Back to top',
        });

        component.appendChild(button);

        return component.el;
    }

    return run();
};
