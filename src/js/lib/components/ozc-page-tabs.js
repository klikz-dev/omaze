/**
 * Class representing a 'ozc-page-tabs' component.
 *
 * @export
 * @class PageTabs
 * @extends BaseNode

 * @example
 *
 *    1. Create a Tabs component
 *        const tabs = new SDG.Component.PageTabs();
 *
 *    2. Register tabs
 *        const myTabConf = {
 *            panel: '<div>my panel</div>,
 *            tabId: 'myPanel',
 *            tabLabel: 'my panel label,
 *        };
 *
 *        tabs.register(myTabConf);
 */

SDG.Component = SDG.Component || {};

SDG.Component.PageTabs = class PageTabs extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.el = this.createEl();
        this.items = {};

        this.initHashChange();
    }

    initHashChange () {
        window.addEventListener('hashchange', this.onHashChange.bind(this), false);
    }

    getHash () {
        const urlHash = window.location.hash;

        if (this.items[urlHash]) {
            return urlHash;
        }

        return false;
    }

    onHashChange () {
        const hash = this.getHash();

        if (!hash) {
            return false;
        }

        this.activateTab(hash);

        return true;
    }


    deactivateTabs () {
        Object.keys(this.items).forEach((item) => {
            this.items[item].tab.classList.remove('ozc-page-tabs__tab--active');
        });
    }

    deactivatePanels () {
        Object.keys(this.items).forEach((item) => {
            this.items[item].panel.classList.remove('ozc-page-tabs__panel--active');
        });
    }

    activateTab (hash) {
        this.deactivateTabs();
        this.deactivatePanels();

        const item = this.items[hash];

        if (!item) {
            return false;
        }

        item.tab.classList.add('ozc-page-tabs__tab--active');
        item.panel.classList.add('ozc-page-tabs__panel--active');

        return true;
    }

    showNav () {
        this.navEl.classList.remove('ozc-page-tabs__nav--hidden');
    }

    hideNav () {
        this.navEl.classList.add('ozc-page-tabs__nav--hidden');
    }

    register (conf) {
        conf = conf || {};

        if (!conf.tabId || !conf.panel) {
            return false;
        }

        const hash = `#${conf.tabId.replace(/ /g, '')}`;
        const tabName = conf.tabLabel || conf.tabId;

        const tabAttributes = conf.tabAttributes || {};
        tabAttributes.href = hash;

        const tabEl = this.constructor.generateTab(tabName, tabAttributes);
        const panelEl = this.constructor.generatePanel(conf.panel, hash);

        this.items[hash] = {
            tab: tabEl,
            panel: panelEl,
        };

        this.navEl.appendChild(tabEl);
        this.contentEl.appendChild(panelEl);

        return true;
    }

    static generateTab (name, tabAttributes) {
        const conf = {
            tag: 'a',
            attributes: tabAttributes,
            cssClasses: 'ozc-page-tabs__tab',
            children: [{
                type: 'Element',
                tag: 'span',
                text: name,
            }],
        };

        const tab = new SDG.Component.Element(conf);

        return tab.el;
    }

    static generatePanel (panelEl, hash) {
        const el = document.createElement('div');

        el.classList = 'ozc-page-tabs__panel';
        el.setAttribute('data-tab-target', hash);
        el.appendChild(panelEl);

        return el;
    }

    createEl () {
        const el = this.createParentEl();
        el.classList.add('ozc-page-tabs');

        const navEl = this.constructor.createNavEl();
        const contentEl = this.constructor.createContentEl();

        el.appendChild(navEl);
        el.appendChild(contentEl);

        this.navEl = navEl;
        this.contentEl = contentEl;

        return el;
    }

    static createNavEl () {
        const el = document.createElement('div');
        el.classList = 'ozc-page-tabs__nav';

        return el;
    }

    static createContentEl () {
        const el = document.createElement('div');
        el.classList = 'ozc-page-tabs__content';

        return el;
    }
};

export default SDG.Component.PageTabs;
