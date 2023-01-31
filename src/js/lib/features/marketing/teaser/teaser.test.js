/* eslint no-console: 0 */
import teaser from './teaser';

describe('init', () => {
    let windowSpy;
    let consoleInfoSpy;
    let consoleErrorSpy;
    
    const sailthruIntegrationMock = jest.fn();

    beforeEach(() => {
        const originalWindow = { ...window };
        // eslint-disable-next-line
        windowSpy = jest.spyOn(global, 'window', 'get');
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            Sailthru: {
                integration: sailthruIntegrationMock,
            },
        }));


        consoleInfoSpy = jest.spyOn(console, 'info');
        consoleErrorSpy = jest.spyOn(console, 'error');
    });

    afterEach(() => {
        windowSpy.mockRestore();
        consoleInfoSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test('should not initialize if no teaser element', () => {
        // eslint-disable-next-line
        teaser.init();

        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test('should initialize successfully', () => {
        document.body.innerHTML = `
            <section class="oz-section-teaser">
                <!-- sign up -->
                <div class="oz-section-teaser__signup">
                    <h1 class="oz-section-teaser__signup-headline">Headline</h1>
                    <div class="oz-section-teaser__signup-body">Body</div>
                    <div class="oz-section-teaser__signup-form">
                        <div class="email oz-field">
                            <div class="oz-field__container">
                                <input class="input" id="ozTeaserOptinCustomerEmail" type="email" />
                                <label for="ozTeaserOptinCustomerEmail">Enter your email address</label>
                            </div>
                            <span class="email-error-message error hidden"></span>
                        </div>
                        <button class="oz-btn oz-btn--block" type="button">
                            <span class="btn__label">Keep me posted</span>
                            <img class="button-loader hidden" alt="loader" src="">
                        </button>
                    </div>
                    <div class="oz-section-teaser__signup-legal">Legal</div>
                </div>
            </section>
        `;

        teaser.init();

        expect(console.info).toHaveBeenCalled();
    });    
});

describe('Sailthru', () => {
    let windowSpy;
    let consoleInfoSpy;
    let consoleErrorSpy;
    
    const sailthruIntegrationMock = jest.fn();

    beforeEach(() => {
        const originalWindow = { ...window };
        // eslint-disable-next-line
        windowSpy = jest.spyOn(global, 'window', 'get');
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            Sailthru: {
                integration: sailthruIntegrationMock,
            },
        }));


        consoleInfoSpy = jest.spyOn(console, 'info');
        consoleErrorSpy = jest.spyOn(console, 'error');
    });

    afterEach(() => {
        windowSpy.mockRestore();
        consoleInfoSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test('should sign user up to sailthru for valid email', () => {
        document.body.innerHTML = `
            <section class="oz-section-teaser">
                <!-- sign up -->
                <div class="oz-section-teaser__signup">
                    <div class="oz-section-teaser__signup-form">
                        <div class="email oz-field">
                            <div class="oz-field__container">
                                <input class="input" id="ozTeaserOptinCustomerEmail" type="email" value="test@gmail.com" />
                                <label for="ozTeaserOptinCustomerEmail">Enter your email address</label>
                            </div>
                            <span class="email-error-message error hidden"></span>
                        </div>
                        <button class="oz-btn oz-btn--block" type="button">
                            <span class="btn__label">Keep me posted</span>
                            <img class="button-loader hidden" alt="loader" src="">
                        </button>
                    </div>
                </div>
            </section>
        `;

        teaser.init();
        const button = document.querySelector('.oz-section-teaser__signup-form > button');

        button.click();

        expect(sailthruIntegrationMock).toHaveBeenCalled();
    }); 

    test('should show error for wrong email', () => {
        document.body.innerHTML = `
            <section class="oz-section-teaser">
                <!-- sign up -->
                <div class="oz-section-teaser__signup">
                    <div class="oz-section-teaser__signup-form">
                        <div class="email oz-field">
                            <div class="oz-field__container">
                                <input class="input" id="ozTeaserOptinCustomerEmail" type="email" value="wrongeamil.com" />
                                <label for="ozTeaserOptinCustomerEmail">Enter your email address</label>
                            </div>
                            <span class="email-error-message error hidden"></span>
                        </div>
                        <button class="oz-btn oz-btn--block" type="button">
                            <span class="btn__label">Keep me posted</span>
                            <img class="button-loader hidden" alt="loader" src="">
                        </button>
                    </div>
                </div>
            </section>
        `;

        teaser.init();
        const button = document.querySelector('.oz-section-teaser__signup-form > button');
        const errorEl = document.querySelector('.email-error-message');

        button.click();

        expect(errorEl.innerHTML).toEqual('email address is invalid');
    });    
});

