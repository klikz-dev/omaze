/**
 * Product Info Tabs
 */

SDG.Product = SDG.Product || {};

SDG.Product.infoTabs = function(opts) {

    /**
     * config
     */
    const config = {
        cls: {
            active_content: 'active-content',
            active_tab: 'oz-active-tab',
            active_location: 'active-location',
            selected: 'oz-selected',
        },
        container: 'pvInfoTabs',
        content_wrap: 'js-content-wrap',
        location_btn: 'js-location',
        location_content: 'js-location-content',
        location_drop: 'js-location-drop',
        location_text: 'js-location-text',
        location_select: 'js-location-select',
        nav: 'pvTabsNav',
        tab: 'js-infotab',
    };
    const c = _.extend(config, opts);

    /**
     * globals vars
     */
    const $container = document.getElementById(c.container);
    const $nav = document.getElementById(c.nav);
    const $locationDrop = $container.querySelector(`.${c.location_drop}`);
    const $locationSelect = $container.querySelector(`.${c.location_select}`);

    /**
     * init
     */
    function init() {
        addEvents();
    }

    /**
     * add events
     */
    function addEvents() {
        _.addEvent({
            event: 'click',
            id: c.container,
            className: c.tab,
            fn: toggleTab,
        });

        _.addEvent({
            event: 'click',
            id: c.container,
            className: c.location_select,
            fn: toggleShippingDrop,
        });

        _.addEvent({
            event: 'click',
            id: c.container,
            className: c.location_btn,
            fn: toggleLocation,
        });
    }

    /**
     * toggle content and styles on tab click
     */
    function toggleTab() {

        // toggle styles on tabs
        handleActiveTab(this);

        // toggle content
        toggleSectionContent(this, c.cls.active_content);
    }

    /**
     * handle tab styles
     */
    function handleActiveTab(tab) {
        const $lastActive = $nav.querySelector(`.${c.cls.active_tab}`);

        if (!$lastActive || _.hasClass(tab, c.cls.active_tab)) return;

        _.removeClass($lastActive, c.cls.active_tab);
        _.addClass(tab, c.cls.active_tab);
    }

    /**
     * toggle active location
     */
    function toggleLocation() {
        const $prevLocation = $locationDrop.querySelector(`.${c.cls.selected}`);
        const $locationText = $locationSelect.querySelector(`.${c.location_text}`);

        // hide menu
        toggleShippingDrop();

        // style option in select in case it is opened again
        _.removeClass($prevLocation, c.cls.selected);
        _.addClass(this, c.cls.selected);

        // change text of select
        $locationText.innerText = this.innerText;

        // toggle content
        toggleSectionContent(this, c.cls.active_location);
    }

    /**
     * show/hide shipping dropdown
     */
    function toggleShippingDrop() {
        if (!_.hasClass($locationDrop, c.cls.active_content)) {
            _.addClass($locationDrop, c.cls.active_content);
        } else {
            _.removeClass($locationDrop, c.cls.active_content);
        }
    }

    /**
     * toggle section content for tabs and locations
     */
    function toggleSectionContent(el, cls) {
        const $lastShown = $container.querySelector(`.${cls}`);
        const $parent = _.parents(el, `.${c.content_wrap}`)[0];
        const $content = $parent.querySelector(`#${el.dataset.id}`);

        if (!$content || _.hasClass($content, cls)) return;

        _.removeClass($lastShown, cls);
        _.addClass($content, cls);
    }

    return init();
};

export default SDG.Product.infoTabs;