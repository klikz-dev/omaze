SDG.Email = SDG.Email || {};
SDG.Email.ContextualCapture = SDG.Checkout.ContextualCapture || {}

SDG.Email.ContextualCapture.load = function() {
    const productTitle =  Shopify && Shopify.checkout && Shopify.checkout.line_items[0] && Shopify.checkout.line_items[0].title;
    const URI = `/search/suggest.json?q=${productTitle}&resources[type]=product&resources[fields]=title&resources[limit]=1`;
    const shouldLoadContextualCapture = shouldLoad();

    if (!shouldLoadContextualCapture) {
        return;
    }

    fetchData(URI, ({ resources }) => {
        if (!resources || !resources.results || !resources.results.products.length) {
          return;
        }
        const productWithHandle = resources.results.products[0];
        const productHandleURI = `/products/${productWithHandle.handle}.json`;

        fetchData(productHandleURI, ({ product }) => {
          if(!product) {
            return
          }

          const tagsArray = product.tags.split(', ')

          window.SDG.ContextualEmailCapture.load({
              target: 'Thank You',
              tags: tagsArray || [],
          });
        });
    });

    function shouldLoad () {
        const THANK_YOU_STEP = 'thank_you';
        const CURRENT_STEP = Shopify && Shopify.Checkout && Shopify.Checkout.step;
        const IS_ORDER_STATUS_PAGE = Shopify && Shopify.Checkout && Shopify.Checkout.isOrderStatusPage;

        return CURRENT_STEP === THANK_YOU_STEP || IS_ORDER_STATUS_PAGE;
    }

    function fetchData(url, callback) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return;
                }

                return response.json();
            })
            .then(data => {
                return callback(data);
            });
    }
}
