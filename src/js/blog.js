/**
 * Blog
 *
 * Ajaxinate
 */

/**
 * Ajaxinate endless scroll
 *
 * isPaginated flag in blog template
 */
$script([path.ajaxinate], () => {
    _.ready(() => {

        const $winners = document.getElementById('winners');
        const method = $winners ? 'click' : 'scroll';

        if (isPaginated) {
            // eslint-disable-next-line
            const endlessScroll = new Ajaxinate({
                method,
            });
        }
    });
});
