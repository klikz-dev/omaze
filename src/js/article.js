/**
 * Article
 */

/**
 * namespace
 */
SDG.Article = SDG.Article || {};

/**
 * config
 */
SDG.Article.config = {
    id: {
        random_products: 'randomProducts',
        random_articles: 'randomArticles',
        charity_page: 'charity_page',
    },
    cls: {
        random_product: 'random-product',
        random_article: 'random-article',
    },
};

/**
 * randomize
 */
SDG.Article.randomize = function(parent, children) {
    let i;

    for (i = 0; i < children.length; i += 1) {
        parent.appendChild(children[(Math.floor(Math.random() * i))]);
    }
};

/**
 * show three
 */
SDG.Article.showThree = function(children) {
    let i;

    for (i = 0; i < children.length; i += 1) {
        if (i < 3) {
            _.removeClass(children[i], 'hide');
        }
    }
};

/**
 * Init
 * randomize child nodes
 * show first 3
 */
SDG.Article.init = function() {
    const c = SDG.Article.config;
    const randomProducts = document.querySelectorAll(`.${c.cls.random_product}`);
    const $randomProductsParent = document.getElementById(c.id.random_products);
    const randomArticles = document.querySelectorAll(`.${c.cls.random_article}`);
    const $randomArticlesParent = document.getElementById(c.id.random_articles);
    const $causes = document.getElementById(c.id.charity_page);

    // exit if not Causes Article Detail page
    if (!$causes) {
        return;
    }

    SDG.Article.randomize($randomProductsParent, randomProducts);
    SDG.Article.randomize($randomArticlesParent, randomArticles);

    // new nodelist from randomized
    const randomProductsNew = document.querySelectorAll(`.${c.cls.random_product}`);
    const randomArticlesNew = document.querySelectorAll(`.${c.cls.random_article}`);

    SDG.Article.showThree(randomProductsNew);
    SDG.Article.showThree(randomArticlesNew);
};

(function() {

    SDG.Article.init();

}());
