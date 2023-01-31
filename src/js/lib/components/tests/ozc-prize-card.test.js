import  {default as Component}  from '../ozc-prize-card.js';


describe('create valid Card HTML', () => {
    let cardConf;

    beforeEach(() => {
        cardConf = {
            header: 'hello',
            winnerAnnounceHeader: 'hello',
            winnerAnnounceBody: 'hello',
            title: 'hello',
            description: 'hello',
            imageUrl: 'hello',
            footnote: 'hello',
            closedTag: 'hello',
        }
    });

    test('should set component CSS class', () => {
        const COMPONENT_CSS_CLASS = 'ozc-prize-card';
        const component = new Component(cardConf);

        expect(component.el.classList[0]).toEqual(COMPONENT_CSS_CLASS);
    });

    test('should set header', () => {
        cardConf.header = 'test header';

        const component = new Component(cardConf);
        const content = component.el.getElementsByClassName('ozc-prize-card__header')[0];

        expect(content.innerHTML).toEqual('test header');
    });

    test('should set title', () => {
        cardConf.title = 'test title';

        const component = new Component(cardConf);
        const content = component.el.getElementsByClassName('ozc-prize-card__title')[0];

        expect(content.innerHTML).toEqual('<h3>test title</h3>');
    });

    test('should set description', () => {
        cardConf.description = 'test description';

        const component = new Component(cardConf);
        const content = component.el.getElementsByClassName('ozc-prize-card__description')[0];

        expect(content.innerText).toEqual('test description');
    });

    test('should set image', () => {
        cardConf.imageUrl = '/img.jpg';

        const component = new Component(cardConf);
        const content = component.el.getElementsByClassName('ozc-prize-card__image')[0];

        expect(content.innerHTML).toContain('<img');
        expect(content.innerHTML).toContain('/img.jpg');
    });

    test('should set no closedTag by default', () => {
        cardConf.closedTag = false;

        const component = new Component(cardConf);
        const content = component.el.getElementsByClassName('ozc-prize-card__prize--closed');

        expect(content.length).toEqual(0);
    });

    test('should set closedTag', () => {
        cardConf.closedTag = 'tag text';

        const component = new Component(cardConf);
        const content = component.el.getElementsByClassName('ozc-prize-card__prize--closed')[0];

        expect(content.innerHTML).toContain('tag text');
    });

    test('should set footnote', () => {
        cardConf.footnote = 'footnote text';

        const component = new Component(cardConf);
        const content = component.el.getElementsByClassName('ozc-prize-card__footer')[0];

        expect(content.innerHTML).toContain('footnote text');
    });
});


describe('create winner announcement HTML', () => {
    const CSS_BASE_CLASS = 'ozc-prize-card__announcement';

    let cardConf;

    beforeEach(() => {
        cardConf = {
            winnerAnnounceHeader: 'winner announce header',
            winnerAnnounceBody: 'winner announced body',
            winnerImage: 'img url',
        }
    });

    test('should set winner announcement content', () => {
        cardConf.winnerAnnounceHeader = 'winnerAnnounceHeader';
        cardConf.winnerAnnounceBody = 'winnerAnnounceBody';

        const component = new Component(cardConf);

        const announceSection = component.el.getElementsByClassName(CSS_BASE_CLASS)[0];
        const header = announceSection.getElementsByClassName(`${CSS_BASE_CLASS}-header`)[0];
        const body = announceSection.getElementsByClassName(`${CSS_BASE_CLASS}-content`)[0];

        expect(header.innerHTML).toEqual('winnerAnnounceHeader');
        expect(body.innerHTML).toEqual('winnerAnnounceBody');
    });

    test('should set winner image', () => {
        const IMAGE_PATH = '/path/to/img.jpg';

        cardConf.winnerImage = IMAGE_PATH;

        const component = new Component(cardConf);

        const announceSection = component.el.getElementsByClassName(CSS_BASE_CLASS)[0];
        const image = announceSection.getElementsByTagName('img')[0];

        expect(announceSection.classList[1]).toEqual(`${CSS_BASE_CLASS}--has-image`);
        expect(image.src).toContain(IMAGE_PATH);
    });

    test('should not exist without header or body.', () => {
        cardConf.winnerAnnounceHeader = false;
        cardConf.winnerAnnounceBody = false;

        const component = new Component(cardConf);
        const announceSection = component.el.getElementsByClassName(CSS_BASE_CLASS);

        expect(announceSection.length).toEqual(0);
    });
});
