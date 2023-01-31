import  {default as ImageComponent}  from '../../components/ozc-image.js';
import  {default as CarouselComponent}  from '../../components/ozc-carousel.js';
import  {default as HtmlElementUtils}  from '../../utility/html-element.js';

import  {default as Feature}  from './index.js';

// mock ES6 classes
jest.mock('../../components/ozc-image.js');
jest.mock('../../components/ozc-carousel.js');

// clear ES6 class mocks
beforeEach(() => {
  ImageComponent.mockClear();
  CarouselComponent.mockClear();
});

describe('init', () => {
    let getValidConfigSpy;
    let getCarouselCardsSpy;
    let htmlElementUtilsSpy;

    beforeEach(() => {
        getValidConfigSpy = jest.spyOn(Feature, 'getValidConfig');
        getValidConfigSpy.mockImplementation(() => true);

        getCarouselCardsSpy = jest.spyOn(Feature, 'getCarouselCards');
        getCarouselCardsSpy.mockImplementation(() => ['cards']);

        htmlElementUtilsSpy = jest.spyOn(HtmlElementUtils, 'placeElement');
        htmlElementUtilsSpy.mockImplementation(() => true);

        CarouselComponent.mockImplementation(() => {
            return {
                el: 'carouselEl',
                init: () => true,
            };
        });
    });

    afterEach(() => {
        getValidConfigSpy.mockRestore();
        getCarouselCardsSpy.mockRestore();
        htmlElementUtilsSpy.mockRestore();
    });

    test('initializes carousel', () => {
        const config =  {
            images: ['img1'],
        };

        expect(Feature.init(config)).toBe(true);
    });

    test('initializes with correct functions called', () => {
        const config = 'config';
        const validatedConfig =  {
            images: ['img1'],
            placementSelector: 'helloSelector',
            placementType: 'helloPlacementType',
        };

        getValidConfigSpy.mockImplementation(() => validatedConfig);

        Feature.init(config);

        expect(getValidConfigSpy).toHaveBeenCalledWith('config');
        expect(getCarouselCardsSpy).toHaveBeenCalledWith(validatedConfig);
        expect(CarouselComponent).toHaveBeenCalledWith({
            content: ['cards'],
            slickConfig: undefined,
            type: 'compact',
        });

        expect(htmlElementUtilsSpy).toHaveBeenCalledWith(
            'carouselEl',
            'helloSelector',
            'helloPlacementType',
        );
    });

    test('initializes carousel with metadata options', () => {
        const config =  {
            metadata: {
                images: 'hello',
            },
        };

        Feature.init(config);

        expect(getValidConfigSpy).toHaveBeenCalledWith(config.metadata);
    });
});

describe('getCarouselCards', () => {
    let getSrcToPrependSpy;

    beforeEach(() => {
        getSrcToPrependSpy = jest.spyOn(Feature, 'getSrcToPrepend');
        getSrcToPrependSpy.mockImplementation(() => false);

        ImageComponent.mockImplementation((value) => {
            return {
                el: value,
            };
        });
    });

    afterEach(() => {
        getSrcToPrependSpy.mockRestore();
    });

    test('uses Image component', () => {
        const config =  {
            images: ['img1','img2'],
        };

        Feature.getCarouselCards(config)

        expect(ImageComponent).toHaveBeenCalledTimes(2);
    });

    test('calls Image component with options', () => {
        const config =  {
            images: ['img1'],
            imageAspectWidth: 16,
            imageAspectHeight: 9,
        };

        Feature.getCarouselCards(config)

        const expected = {
            aspectH: 9,
            aspectW: 16,
            src: 'img1',
        };

        expect(ImageComponent).toHaveBeenCalledWith(expected);
    });

    test('returns cards', () => {
        const config =  {
            images: ['img1','img2'],
        };

        const cards = Feature.getCarouselCards(config)

        const expected = [
            {el: {src: 'img1'}},
            {el: {src: 'img2'}},
        ];

        expect(cards).toMatchObject(expected);
    });

    test('prepends src to cards', () => {
        getSrcToPrependSpy.mockImplementation(() => 'prepend');

        const config =  {
            images: ['img1','img2'],
        };

        const cards = Feature.getCarouselCards(config)

        const expected = [
            {el: {src: 'prepend'}},
            {el: {src: 'img1'}},
            {el: {src: 'img2'}},
        ];

        expect(cards).toEqual(expected);
    });
});

describe('getSrcToPrepend', () => {
    test('returns false if hideExistingImage is true', () => {
        const hideExistingImage = true;

        expect(Feature.getSrcToPrepend(hideExistingImage)).toEqual(false)
    });

    test('returns false if no image element found', () => {
        const hideExistingImage = false;
        const placementEl = document.createElement('div');

        const getElementsByTagNameSpy = jest.spyOn(placementEl, 'getElementsByTagName');
        getElementsByTagNameSpy.mockImplementation(() => []);

        expect(Feature.getSrcToPrepend(hideExistingImage, placementEl)).toEqual(false)
    });

    test('returns falsy if image has no src', () => {
        const hideExistingImage = false;
        const placementEl = document.createElement('div');
        const image = {};

        const getElementsByTagNameSpy = jest.spyOn(placementEl, 'getElementsByTagName');
        getElementsByTagNameSpy.mockImplementation(() => [image]);

        expect(Feature.getSrcToPrepend(hideExistingImage, placementEl)).toBeFalsy();
    });


    test('returns image src', () => {
        const hideExistingImage = false;
        const placementEl = document.createElement('div');
        const image = {
            src: 'hello.jpg',
        };

        const getElementsByTagNameSpy = jest.spyOn(placementEl, 'getElementsByTagName');
        getElementsByTagNameSpy.mockImplementation(() => [image]);

        expect(Feature.getSrcToPrepend(hideExistingImage, placementEl)).toEqual('hello.jpg')
    });
});

describe('getValidConfig', () => {
    const minimumValidOptions = {
        images: ['<img />'],
    }

    let onFeatureFailSpy;
    let getPlacementElSpy;

    beforeEach(() => {
        onFeatureFailSpy = jest.spyOn(Feature, 'onFeatureFail');
        onFeatureFailSpy.mockImplementation(() => true);

        getPlacementElSpy = jest.spyOn(Feature, 'getPlacementEl');
        getPlacementElSpy.mockImplementation(() => true);
    });

    afterEach(() => {
        onFeatureFailSpy.mockRestore();
        getPlacementElSpy.mockRestore();
    });

    test('returns false with no images', () => {
        const options = {};

        expect(Feature.getValidConfig(options)).toEqual(false)
    });

    test('returns false with empty images array', () => {
        const options = {
            images: [],
        };

        expect(Feature.getValidConfig(options)).toEqual(false)
    });

    test('calls onFeatureFail with invalid options', () => {
        const options = {};

        Feature.getValidConfig(options);

        expect(onFeatureFailSpy).toHaveBeenCalled();
    });

    test('returns false with placementEl not found', () => {
        const options = minimumValidOptions;

        getPlacementElSpy.mockImplementation(() => false);

        expect(Feature.getValidConfig(options)).toEqual(false)
    });

    test('calls onFeatureFail with placementEl not found', () => {
        const options = minimumValidOptions;

        getPlacementElSpy.mockImplementation(() => false);

        Feature.getValidConfig(options);

        expect(onFeatureFailSpy).toHaveBeenCalled();
    });

    test('returns placementEl if found', () => {
        const options = minimumValidOptions;

        getPlacementElSpy.mockImplementation(() => 'div');

        const expected = {
            placementEl: 'div',
        };

        Feature.getValidConfig(options);

        expect(Feature.getValidConfig(options)).toMatchObject(expected)
    });


    const testCases = [
        {
            name: 'sets correct defaults',
            input: minimumValidOptions,
            expected: {
                hideExistingImage: false,
                placementType: 'bottom',
                placementSelector: '.exp-leader__img',
                imageAspectWidth: 16,
                imageAspectHeight: 9,
                replaceExistingContent: false,
            },
        },
        {
            name: 'sets option values',
            input: Object.assign({}, minimumValidOptions, {
                images: ['hello'],
                custom_slick_config: {hello: 'hello'},
                hide_existing_image: true,
                placement_type: 'hello',
                placement_selector: 'hello',
                image_aspect_width: 1,
                image_aspect_height: 2,
            }),
            expected: {
                images: ['hello'],
                slickConfig: {hello: 'hello'},
                hideExistingImage: true,
                placementType: 'hello',
                placementSelector: 'hello',
                imageAspectWidth: 1,
                imageAspectHeight: 2,
            },
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(Feature.getValidConfig(testCase.input)).toMatchObject(testCase.expected)
        );
    });
});
