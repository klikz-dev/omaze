const prompts = require('prompts');

const { ComponentGenerator } = require('./Component');

class Generator {
    async requestComponentConfig () {
        const COMPONENT_NAME_REGEX = /^([A-Z][a-z0-9]+)+$/;

        const response = await prompts([{
            type: 'text',
            name: 'componentName',
            message: 'What is the name of the component?',
            validate: (value) => {
                if (!COMPONENT_NAME_REGEX.test(value)) {
                    return 'Component name must be UpperCamelCase';
                }

                // make sure a component with this name doesn't exist already

                return true;
            },
        }, {
            type: 'confirm',
            name: 'hasContainer',
            message: (prev, values) => {
                return `Does ${values.componentName} need a container?`;
            },
            initial: false,
        }]);

        return response;
    }

    async run () {
        const config = await this.requestComponentConfig();

        try {
            const writer = new ComponentGenerator({
                path: process.argv[2],
                componentName: config.componentName,
                hasContainer: config.hasContainer,
                isDry: false,
            });

            writer.write()
        } catch (error) {
            this.formatError(error);
        }
    }

    formatError (error) {
        throw new Error(error);
    }
}

const generator = new Generator();

generator.run();
