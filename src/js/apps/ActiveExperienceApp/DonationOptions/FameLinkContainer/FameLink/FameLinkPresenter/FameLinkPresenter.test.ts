import {
    IFameLinkPresenterClassNames,
    IFameLinkPresenterConfig,
    FameLinkPresenter,
} from './FameLinkPresenter';

describe('FameLinkPresenter', (): void => {
    const mockPresenterConf: IFameLinkPresenterConfig = {
        hostName: 'fame.com',
        productId: 111,
        productTitle: 'product title',
        productHandle: 'product-handle',
        upsellVariantId: 222,
        upsellVariantPrice: 100,
    };

    it('should have all classNames', (): void => {
        mockPresenterConf.className = 'extra';

        const presenter: FameLinkPresenter = new FameLinkPresenter(mockPresenterConf);
        const classNames: IFameLinkPresenterClassNames = presenter.getAllClassNames();

        expect(classNames).toEqual({
            host: 'host extra',
        });
    });

    it('should present style as link', (): void => {
        mockPresenterConf.prominent = false;

        const presenter: FameLinkPresenter = new FameLinkPresenter(mockPresenterConf);

        expect(presenter.getFameLinkType().size).toBe('medium');
        expect(presenter.getFameLinkType().style).toBe('link');
    });

    it('should present style as button', (): void => {
        mockPresenterConf.prominent = true;

        const presenter: FameLinkPresenter = new FameLinkPresenter(mockPresenterConf);

        expect(presenter.getFameLinkType().size).toBe('small');
        expect(presenter.getFameLinkType().style).toBe('secondary');
    });

    describe('getFameHref', (): void => {
        interface ITestCase {
            inputs: {
                productTitle: string;
                productHandle: string;
                upsellVariantId: number | undefined;
                upsellVariantPrice: number | undefined;
            }
            expectedHref: string;
        }

        /* eslint-disable object-curly-spacing, object-property-newline */
        const testCases: ITestCase[] = [
            {
                inputs: {
                    productTitle: 'my title',
                    productHandle: 'hello-handle',
                    upsellVariantId: 123,
                    upsellVariantPrice: 200,
                },
                expectedHref: '//fame.com/111?title=my%20title&handle=hello-handle&variant_id=123&variant_price=$2',
            }, {
                inputs: {
                    productTitle: 'title',
                    productHandle: 'hello',
                    upsellVariantId: 123,
                    upsellVariantPrice: 250,
                },
                expectedHref: '//fame.com/111?title=title&handle=hello&variant_id=123&variant_price=$2.5',
            }, {
                inputs: {
                    productTitle: 'title',
                    productHandle: 'hello',
                    upsellVariantId: undefined,
                    upsellVariantPrice: undefined,
                },
                expectedHref: '//fame.com/111?title=title&handle=hello',
            }, {
                inputs: {
                    productTitle: 'title',
                    productHandle: 'hello',
                    upsellVariantId: 123,
                    upsellVariantPrice: undefined,
                },
                expectedHref: '//fame.com/111?title=title&handle=hello',
            }, {
                inputs: {
                    productTitle: 'title',
                    productHandle: 'hello',
                    upsellVariantId: undefined,
                    upsellVariantPrice: 200,
                },
                expectedHref: '//fame.com/111?title=title&handle=hello',
            }, {
                inputs: {
                    productTitle: 'one & two',
                    productHandle: 'hello',
                    upsellVariantId: undefined,
                    upsellVariantPrice: undefined,
                },
                expectedHref: '//fame.com/111?title=one%20%26%20two&handle=hello',
            }, {
                inputs: {
                    productTitle: 'one + two',
                    productHandle: 'hello',
                    upsellVariantId: undefined,
                    upsellVariantPrice: undefined,
                },
                expectedHref: '//fame.com/111?title=one%20%2B%20two&handle=hello',
            },
        ];
        /* eslint-enable object-curly-spacing, object-property-newline */

        testCases.forEach((testCase: ITestCase): void => {
            test(testCase.expectedHref, (): void => {
                const conf: IFameLinkPresenterConfig = {
                    ...mockPresenterConf,
                    ...testCase.inputs,
                };

                const presenter: FameLinkPresenter = new FameLinkPresenter(conf);

                expect(presenter.getFameHref()).toBe(testCase.expectedHref);
            });
        });
    });
});
