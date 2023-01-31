const { Writer } = require('../Writer');

class ComponentWriter extends Writer {
    write () {
        console.log(`Creating component directory at: ${this.getDirectory()}`);
        this.createDirectory(this.getDirectory());

        const qaFilePath = this.getFileName('qa', 'ts');

        console.log(`Creating component QA file at ${qaFilePath}`);
        this.createFile(qaFilePath, this.getContent('qa'));

        const componentFilePath = this.getFileName('component', 'tsx');

        console.log(`Creating component file at: ${componentFilePath}`);
        this.createFile(componentFilePath, this.getContent('component'));

        const testFilePath = this.getFileName('component.test', 'tsx');

        console.log(`Creating component test file at: ${testFilePath}`);
        this.createFile(testFilePath, this.getContent('component.test'));

        const mockDirectoryPath = this.getDirectory() + '/__mocks__';

        console.log(`Creating component mock directory at: ${mockDirectoryPath}`);
        this.createDirectory(mockDirectoryPath);

        const mockPath = `${this.getDirectory()}/__mocks__/${this.name}.component.tsx`;

        console.log(`Creating component mock at: ${mockPath}`);
        this.createFile(mockPath, this.getContent('mock'));
    }
}

module.exports = {
    ComponentWriter: ComponentWriter,
};
