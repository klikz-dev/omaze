/**
 * Size Guide
 */

SDG.Product = SDG.Product || {};

SDG.Product.sizeGuide = function(btnClass, content) {
    const c = {
        id: 'sGuide',
        cls: {
            active: 'is-active',
        },
    };

    function init() {

        _.addEvent({
            event: 'click',
            id: c.id,
            className: btnClass,
            fn: toggleGuide,
        });
    }

    function toggleGuide() {


        if (_.hasClass(content, c.cls.active)) {
            _.removeClass(content, c.cls.active);

            this.innerText = 'Show size chart + item details';
            content.style.height = 0;

        } else {
            content.style.display = 'block';
            content.style.height = 'auto';

            // get element height when displayed
            const elHeight = content.clientHeight;

            // set height to 0 first
            content.style.height = 0;

            // add active class
            _.addClass(content, c.cls.active);

            // set link text
            this.innerText = 'Hide size chart + item details';

            // create slide effect by adding height
            setTimeout(() => {
                content.style.height = `${elHeight}px`;
            }, 1);
        }
    }

    return init();
};

export default SDG.Product.sizeGuide;