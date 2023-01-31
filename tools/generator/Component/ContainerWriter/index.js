const { ComponentWriter } = require('../ComponentWriter');

class ContainerWriter extends ComponentWriter {
    getContentTokens () {
        const tokens = ComponentWriter.prototype.getContentTokens.apply(this, []);

        return {
            ...tokens,
            componentName: this.name.replace(/Container$/, ''),
            containerName: this.name,
        }
    }
}

module.exports = {
    ContainerWriter: ContainerWriter,
}
