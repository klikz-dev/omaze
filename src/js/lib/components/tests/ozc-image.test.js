import  {default as Component}  from '../ozc-image.js';

describe('Shopify variant processable', () => {
    beforeEach(() => {
        window.Shopify = {}
        window.Shopify.cdnHost = 'cdn.shopify.com';
    });

    afterEach(() => {
        window.Shopify = undefined;
    });

    const bannedCases = [
        'cdn.shopify.com/filename_x100.png',
        'cdn.shopify.com/filename_x100.png?',
        'cdn.shopify.com/filename_x100.png?v=12345',
        'cdn.shopify.com/filename_100x.png',
        'cdn.shopify.com/filename_3.2_400x.jpg',
        'cdn.shopify.com/filename_100x_crop_abc.png',
        'cdn.shopify.com/filename_100x100.png',
        'cdn.shopify.com/filename_thumb.png',
        'cdn.shopify.com/filename_medium.png',
        'cdn.shopify.com/filename_master.png',
    ];

    const allowedCases = [
        'cdn.shopify.com/filename.png',
        'cdn.shopify.com/filename.jpg',
        'cdn.shopify.com/filename.jpeg',
        'cdn.shopify.com/filename.png?v=12345',
        'cdn.shopify.com/filename_x.jpeg',
        'cdn.shopify.com/hello_123x/filename.png',
        'cdn.shopify.com/filename_100xhello.png',
        'cdn.shopify.com/123x.png',
        'cdn.shopify.com/filename.hello',
    ];

    bannedCases.forEach((testCase) => {
        test(`not allowed: ${testCase}`, () => {
            expect(Component.isProcessableShopifySrc(testCase)).toEqual(false)
        });
    });

    allowedCases.forEach((testCase) => {
        test(`allowed: ${testCase}`, () => {
            expect(Component.isProcessableShopifySrc(testCase)).toEqual(true)
        });
    });
});

describe('Shopify variant src', () => {
    beforeEach(() => {
        window.Shopify = {}
        window.Shopify.cdnHost = 'cdn.shopify.com';
    });

    afterEach(() => {
        window.Shopify = undefined;
    });

    const baseImgSrc = 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop.png';

    const testCases = [
        {
            name: 'with width and height and default crop',
            input: {
                src: baseImgSrc,
                options: {
                    width: 100,
                    height: 200,
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_100x200_crop_center.png',
        },
        {
            name: 'with width and height and custom cropping',
            input: {
                src: baseImgSrc,
                options: {
                    width: 100,
                    height: 200,
                    cropType: 'right',
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_100x200_crop_right.png',
        },
        {
            name: 'with width and height and no cropping',
            input: {
                src: baseImgSrc,
                options: {
                    width: 100,
                    height: 200,
                    cropType: 'none',
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_100x200.png',
        },
        {
            name: 'with width only',
            input: {
                src: baseImgSrc,
                options: {
                    width: 100,
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_100x.png',
        },
        {
            name: 'with height only',
            input: {
                src: baseImgSrc,
                options: {
                    height: 100,
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_x100.png',
        },
        {
            name: 'with valid cropType',
            input: {
                src: baseImgSrc,
                options: {
                    width: 100,
                    height: 200,
                    cropType: 'center',
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_100x200_crop_center.png',
        },
        {
            name: 'with invalid cropType',
            input: {
                src: baseImgSrc,
                options: {
                    width: 100,
                    height: 200,
                    cropType: 'invalid',
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_100x200.png',
        },
        {
            name: 'returns false with non shopify cdn src',
            input: {
                src: 'cdn-random.com/hello',
                options: {
                    width: 100,
                },
            },
            expected: false,
        },
        {
            name: 'returns false with no src',
            input: {
                options: {
                    width: 100,
                    height: 200,
                },
            },
            expected: false,
        },
        {
            name: 'returns false with no width and no height',
            input: {
                src: baseImgSrc,
                options: {
                    cropType: 'center',
                },
            },
            expected: false,
        },
        {
            name: 'returns original src if already represents a variant',
            input: {
                src: 'https://cdn.shopify.com/hello_100x.png',
                options: {
                    width: 500,
                    height: 500,
                },
            },
            expected: 'https://cdn.shopify.com/hello_100x.png',
        },
        {
            name: 'returns original src with extension that is not jpg|jpeg|png',
            input: {
                src: 'https://cdn.shopify.com/hello.gifffff',
                options: {
                    width: 100,
                },
            },
            expected: 'https://cdn.shopify.com/hello.gifffff',
        },
        {
            name: 'with png image',
            input: {
                src: 'https://cdn.shopify.com/hello.png',
                options: {
                    width: 100,
                },
            },
            expected: 'https://cdn.shopify.com/hello_100x.png',
        },
        {
            name: 'with jpg image',
            input: {
                src: 'https://cdn.shopify.com/hello.jpg',
                options: {
                    width: 100,
                },
            },
            expected: 'https://cdn.shopify.com/hello_100x.jpg',
        },
        {
            name: 'with jpeg image',
            input: {
                src: 'https://cdn.shopify.com/hello.jpeg',
                options: {
                    width: 100,
                },
            },
            expected: 'https://cdn.shopify.com/hello_100x.jpeg',
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () => {
            expect(Component.generateShopifyVariantSrc(testCase.input.src, testCase.input.options)).toEqual(testCase.expected)
        });
    });
});

describe('Imgix (other) variant src', () => {
    const testCases = [
        {
            name: 'with no options using default format string',
            input: {
                src: 'imgix.com/hello.png',
                options: {},
            },
            expected: `imgix.com/hello.png?${Component.defaults().imageFormat}`,
        },
        {
            name: 'with custom format string',
            input: {
                src: 'imgix.com/hello.png',
                options: {
                    format: 'world',
                },
            },
            expected: 'imgix.com/hello.png?world',
        },
        {
            name: 'with width and height',
            input: {
                src: 'imgix.com/hello.png',
                options: {
                    format: 'some-string',
                    width: 100,
                    height: 200,
                },
            },
            expected: 'imgix.com/hello.png?some-string&w=100&h=200',
        },
        {
            name: 'with width only',
            input: {
                src: 'imgix.com/hello.png',
                options: {
                    format: 'some-string',
                    width: 100,
                },
            },
            expected: 'imgix.com/hello.png?some-string&w=100',
        },
        {
            name: 'with height only',
            input: {
                src: 'imgix.com/hello.png',
                options: {
                    format: 'some-string',
                    height: 100,
                },
            },
            expected: 'imgix.com/hello.png?some-string&h=100',
        },
        {
            name: 'with invalid height',
            input: {
                src: 'imgix.com/hello.png',
                options: {
                    format: 'some-string',
                    height: 'wat?',
                },
            },
            expected: 'imgix.com/hello.png?some-string',
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () => {
            expect(Component.generateImgixVariantSrc(testCase.input.src, testCase.input.options)).toEqual(testCase.expected)
        });
    });
});

describe('generates correct src for variant type', () => {
    beforeEach(() => {
        window.Shopify = {}
        window.Shopify.cdnHost = 'cdn.shopify.com';
    });

    afterEach(() => {
        window.Shopify = undefined;
    });

    const testCases = [
        {
            name: 'with valid shopify cdn src',
            input: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop.png',
                options: {
                    width: 100,
                    height: 200,
                },
            },
            expected: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/WinnerWednesdayHomepage_Desktop_100x200_crop_center.png',
        },
        {
            name: 'with valid imgix cdn src',
            input: {
                src: 'http://images.omaze.com/web/assets/images/static/features/email-capture/HandRaiser_Q320_HomeReno_1.jpg',
                options: {
                    format: 'auto=format&fm=jpg&q=80&fit=crop&crop=entropy',
                    height: 200,
                },
            },
            expected: 'http://images.omaze.com/web/assets/images/static/features/email-capture/HandRaiser_Q320_HomeReno_1.jpg?auto=format&fm=jpg&q=80&fit=crop&crop=entropy&h=200',
        },
        {
            name: 'with unknown cdn src',
            input: {
                src: 'random.com/hello.png',
                options: {
                    format: 'my-format',
                    height: 200,
                },
            },
            expected: 'random.com/hello.png?my-format&h=200',
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () => {
            expect(Component.getVariantSrc(testCase.input.src, testCase.input.options)).toEqual(testCase.expected)
        });
    });
});

describe('LQIP element', () => {
    let imgConf;

    beforeEach(() => {
        imgConf = {
            src: '//hello.png',
        }

        window.Shopify = {}
        window.Shopify.cdnHost = 'cdn.shopify.com';
    });

    afterEach(() => {
        imgConf = {};
        window.Shopify = undefined;
    });

    test('not set by default', () => {
        const component = new Component(imgConf);
        const LQIP_CSS_CLASS = 'ozc-image__image--lqip';
        const lqipEl = component.el.getElementsByClassName(LQIP_CSS_CLASS);

        expect(lqipEl.length).toEqual(0);
    });

    test('set with valid flag', () => {
        const component = new Component({
            src: '//hello.png',
            lqip: true,
        });
        const LQIP_CSS_CLASS = 'ozc-image__image--lqip';
        const lqipEl = component.el.getElementsByClassName(LQIP_CSS_CLASS)[0];
        const expectedSrc = `//hello.png?${Component.defaults().lqipFormat}&w=${Component.defaults().lqipWidth}`;

        expect(lqipEl.getAttribute('src')).toEqual(expectedSrc);
    });
 });

describe('creates responsive ozc-image', () => {
    beforeEach(() => {
        window.Shopify = {}
        window.Shopify.cdnHost = 'cdn.shopify.com';
    });

    afterEach(() => {
        window.Shopify = undefined;
    });

    test('with component CSS class', () => {
        const component = new Component({
            src: '//hello.png',
        });

        const COMPONENT_CSS_CLASS = 'ozc-image';

        expect(component.el.classList[0]).toEqual(COMPONENT_CSS_CLASS);
    });

    test('with placeholder element', () => {
        const component = new Component({
            src: '//hello.png',
            aspectW: 200,
            aspectH: 100,
        });

        const CSS_CLASS = 'ozc-image__placeholder';
        const placeholderEl = component.el.getElementsByClassName(CSS_CLASS)[0];
        const paddingTopValue = placeholderEl && placeholderEl.style._values['padding-top'];

        expect(placeholderEl).toBeDefined();
        expect(paddingTopValue).toEqual('50.00%')
    });

    test('with responsive and lazyloading image', () => {
        const component = new Component({
            src: '//hello.png',
            aspectW: 200,
            aspectH: 100,
            alt: 'my alt text',
        });

        const CSS_SELECTOR = 'img.ozc-image__image.lazyload';
        const imageEl = component.el.querySelectorAll(CSS_SELECTOR)[0];

        const attrDataSizes = imageEl.getAttribute('data-sizes');
        const attrSrcSet = imageEl.getAttribute('data-srcset');
        const attrSrc = imageEl.getAttribute('data-src');

        expect(imageEl).toBeDefined();
        expect(attrDataSizes).toEqual('auto')
        expect(attrSrcSet).toBeTruthy();
        expect(attrSrc).toBeTruthy();
    });

    test('with correct data-srcset', () => {
        const component = new Component({
            src: '//hello.png',
            imageFormat: 'fmt-string',
            aspectW: 200,
            aspectH: 100,
        });

        const CSS_SELECTOR = 'img.ozc-image__image.lazyload';
        const imageEl = component.el.querySelectorAll(CSS_SELECTOR)[0];
        const attrSrcSet = imageEl.getAttribute('data-srcset');

        const expected = [
             '//hello.png?fmt-string&w=480&h=240 480w, ',
             '//hello.png?fmt-string&w=650&h=325 650w, ',
             '//hello.png?fmt-string&w=812&h=406 812w, ',
             '//hello.png?fmt-string&w=1049&h=525 1049w, ',
             '//hello.png?fmt-string&w=1249&h=625 1249w, ',
             '//hello.png?fmt-string&w=1439&h=720 1439w, ',
             '//hello.png?fmt-string&w=1600&h=800 1600w, ',
             '//hello.png?fmt-string&w=2000&h=1000 2000w, ',
             '//hello.png?fmt-string&w=2400&h=1200 2400w',
        ].join('');

        expect(attrSrcSet).toEqual(expected);
    });

    test('with alt text', () => {
        const component = new Component({
            src: '//hello.png',
            aspectW: 200,
            aspectH: 100,
            alt: 'my alt text',
        });

        const CSS_SELECTOR = 'img.ozc-image__image.lazyload';
        const imageEl = component.el.querySelectorAll(CSS_SELECTOR)[0];
        const altTextAttr = imageEl.getAttribute('alt');

        expect(altTextAttr).toEqual('my alt text');
    });
 });

describe('ozc-image with only src option', () => {
    beforeEach(() => {
        window.Shopify = {}
        window.Shopify.cdnHost = 'cdn.shopify.com';
    });

    afterEach(() => {
        window.Shopify = undefined;
    });

    test('has ozc-image parent class', () => {
        const component = new Component({
            src: '//hello.png',
        });

        const COMPONENT_CSS_CLASS = 'ozc-image';

        expect(component.el.classList[0]).toEqual(COMPONENT_CSS_CLASS);
    });

    test('has img element with src attribute set', () => {
        const component = new Component({
            src: '//hello.png',
        });

        const imageEl = component.el.getElementsByTagName('img')[0];

        expect(imageEl.getAttribute('src')).toEqual('//hello.png');
    });

    test('has ozc-image__image--relative class', () => {
        const component = new Component({
            src: '//hello.png',
        });

        const CSS_CLASS = 'ozc-image__image--relative';
        const imageEl = component.el.getElementsByClassName(CSS_CLASS)[0];
        expect(imageEl.getAttribute('src')).toEqual('//hello.png');
    });

    test('has no placeholder element', () => {
        const component = new Component({
            src: '//hello.png',
        });

        const CSS_CLASS = 'ozc-image__placeholder';
        const placeholderEls = component.el.getElementsByClassName(CSS_CLASS);

        expect(placeholderEls.length).toEqual(0);
    });
});
