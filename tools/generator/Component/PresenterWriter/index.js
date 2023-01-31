const { ComponentWriter } = require('../ComponentWriter');
const { Writer } = require('../Writer');

class PresenterWriter extends Writer {
    constructor (config) {
        super({
            ...config,
            name: config.name + 'Presenter',
        });
    }

    getContentTokens () {
        const tokens = ComponentWriter.prototype.getContentTokens.apply(this, []);

        return {
            ...tokens,
            componentName: this.name.replace(/Presenter$/, ''),
            presenterName: this.name,
        }
    }

    write () {
        console.log(`Creating presenter directory at: ${this.getDirectory()}`);
        this.createDirectory(this.getDirectory());

        const presenterFilePath = this.getFileName('', 'ts');

        console.log(`Creating presenter at: ${presenterFilePath}`);
        this.createFile(presenterFilePath, this.getContent(''));

        const testFilePath = this.getFileName('test', 'ts');

        console.log(`Creating presenter test at: ${testFilePath}`);
        this.createFile(testFilePath, this.getContent('test'));
    }
}

module.exports = {
    PresenterWriter: PresenterWriter,
}
