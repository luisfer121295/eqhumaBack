"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
const fs = require("fs");
class CountryService {
    constructor(filePath) {
        this.filePath = filePath;
    }
    readLargeFile() {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(this.filePath, { encoding: 'utf8' });
            let content = '';
            fileStream.on('data', (chunk) => {
                content += chunk;
            });
            fileStream.on('end', () => {
                resolve(content);
            });
            fileStream.on('error', (error) => {
                reject(error);
            });
        });
    }
    parseJsonLines(jsonLines) {
        const lines = jsonLines.split('\n');
        return lines.map((line) => JSON.parse(line.trim()));
    }
    async getCountOfElements() {
        try {
            const fileContent = await this.readLargeFile();
            const countries = this.parseJsonLines(fileContent);
            return countries.length;
        }
        catch (error) {
            console.error('Error reading or parsing the file:', error);
            return -1;
        }
    }
}
exports.CountryService = CountryService;
//# sourceMappingURL=lista.js.map