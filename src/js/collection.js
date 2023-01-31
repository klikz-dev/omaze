/**
 * Collection(s)
 *
 * Ajaxinate
 */
$script([path.ajaxinate], () => {
    const loadingText = '';

    // eslint-disable-next-line
    let endlessScroll = new Ajaxinate({
        loadingText,
        beforeLoad: SDG.Analytics.events.ajaxinateBeforeLoadCallback,
    });
});
