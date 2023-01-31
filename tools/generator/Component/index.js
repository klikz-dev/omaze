const path = require('path');
const fs = require('fs');

const { ContainerWriter } = require('./ContainerWriter');
const { StyledComponentWriter } = require('./StyledComponentWriter');
const { PresenterWriter } = require('./PresenterWriter');

class ComponentGenerator {
    constructor (config) {
        this.path = config.path;
        this.componentName = config.componentName;
        this.hasContainer = config.hasContainer;
        this.isDry = config.isDry;
        this.namespacePath = this.getNamespacePath(this.path)
    }

    getNamespacePath (searchPath) {
        const NAMESPACE_FILE_REGEX = /^[A-Za-z0-9]+\.namespace\.ts$/;

        // find nearest namespace
        const dirs = fs.readdirSync(searchPath);
        const namespace = dirs.find((dir) => {
            return NAMESPACE_FILE_REGEX.test(dir);
        });

        if (!namespace) {
            if (searchPath !== '/') {
                return this.getNamespacePath(path.resolve(searchPath, '..'));
            }

            throw new Error('Unable to find a namespace. Make sure you create your component\'s namespace first.');
        }

        return`${searchPath}/${namespace}`;
    }

    write () {
        let targetPath = this.path;

        if (this.hasContainer) {
            this.writeContainer(targetPath);

            targetPath = targetPath + `/${this.componentName}Container`
        }

        this.writeComponent(targetPath);

        targetPath = targetPath + `/${this.componentName}`;

        this.writePresenter(targetPath);
    }

    writeComponent (targetPath) {
        const componentWriter = new StyledComponentWriter({
            path: targetPath,
            name: this.componentName,
            isDry: this.isDry,
            namespacePath: this.namespacePath,
            content: {
                'qa': path.resolve(__dirname, './templates/component/Component.qa.ts.txt'),
                'component': path.resolve(__dirname, './templates/component/Component.component.tsx.txt'),
                'component.test': path.resolve(__dirname, './templates/component/Component.component.test.tsx.txt'),
                'styles': path.resolve(__dirname, './templates/component/Component.styles.css.txt'),
                'mock': path.resolve(__dirname, './templates/component/MockComponent.component.tsx.txt'),
            },
        });

        componentWriter.write();
    }

    writeContainer (targetPath) {
        const containerWriter = new ContainerWriter({
            path: targetPath,
            name: this.componentName + 'Container',
            isDry: this.isDry,
            namespacePath: this.namespacePath,
            content: {
                'qa': path.resolve(__dirname, './templates/container/Container.qa.ts.txt'),
                'component': path.resolve(__dirname, './templates/container/Container.component.tsx.txt'),
                'component.test': path.resolve(__dirname, './templates/container/Container.component.test.tsx.txt'),
                'mock': path.resolve(__dirname, './templates/container/MockContainer.component.tsx.txt'),
            },
        });

        containerWriter.write();
    }

    writePresenter (targetPath) {
        const presenterWriter = new PresenterWriter({
            path: targetPath,
            name: this.componentName,
            isDry: this.isDry,
            namespacePath: this.namespacePath,
            content: {
                '': path.resolve(__dirname, './templates/presenter/Presenter.ts.txt'),
                'test': path.resolve(__dirname, './templates/presenter/Presenter.test.ts.txt'),
            },
        });

        presenterWriter.write();
    }
}

module.exports = {
    ComponentGenerator: ComponentGenerator,
};
