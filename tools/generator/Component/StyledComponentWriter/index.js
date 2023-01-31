const { ComponentWriter } = require('../ComponentWriter');

class StyledComponentWriter extends ComponentWriter {
    write () {
        ComponentWriter.prototype.write.apply(this, []);

        const stylesFilePath = this.getFileName('styles', 'css');

        console.log(`Creating component styles file at: ${stylesFilePath}`);
        this.createFile(stylesFilePath, this.getContent('styles'));
    }
}

module.exports = {
    StyledComponentWriter: StyledComponentWriter,
};
