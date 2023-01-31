const path = require('path');
const fs = require('fs');

class Writer {
    constructor (config) {
        this.path = config.path;
        this.isDry = config.isDry;
        this.name = config.name;
        this.namespacePath = config.namespacePath;
        this.content = config.content;
    }

    createDirectory (containerDir) {
        if (this.isDry) {
            return;
        }

        fs.mkdirSync(containerDir);
    }

    createFile (filePath, content) {
        if (this.isDry) {
            return;
        }

        fs.writeFileSync(filePath, content);
    }

    getDirectory () {
        return `${this.path}/${this.name}`;
    }

    getFileName (name, ext) {
        let fileName = `${this.getDirectory()}/${this.name}`;

        if (name) {
            fileName = `${fileName}.${name}`;
        }

        return `${fileName}.${ext}`;
    }

    getContentTokens () {
        return {
            componentName: this.name,
            namespacePath: path.relative(this.getDirectory(), this.namespacePath).replace(/\.ts$/, ''),
        }
    }

    getContent (name) {
        let content = fs.readFileSync(this.content[name], {
            encoding: 'utf8',
        });

        const tokens = this.getContentTokens();

        Object.keys(tokens).forEach((token) => {
            const tokenRegex = new RegExp('\\{% ' + token + ' %\\}', 'g');

            content = content.replace(tokenRegex, tokens[token]);
        });

        return content;
    }

    write () {}
}

module.exports = {
    Writer: Writer,
};
