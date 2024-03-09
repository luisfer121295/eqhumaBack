const readline = require('readline');
const fs = require('fs');
class CodesListService {
    async readData(idcode) {
        console.log('Entro al servicio con idcode:', idcode);
        const rl = readline.createInterface({
            input: fs.createReadStream('datos.jsonl'),
            crlfDelay: Infinity,
        });
        let block = [];
        let lineNumber = 0;
        try {
            for await (const line of rl) {
                const data = JSON.parse(line);
                block.push(data);
                lineNumber++;
                if (lineNumber === 500) {
                    await this.processBlock(idcode, block);
                    block = [];
                    lineNumber = 0;
                }
            }
            if (block.length > 0) {
                await this.processBlock(idcode, block);
            }
            return lineNumber;
        }
        catch (error) {
            console.error('Error al leer el archivo:', error);
            throw error;
        }
    }
    async processBlock(idcode, block) {
        console.log('Bloque leído:', block);
        const matchingElement = block.find((data) => data.id === idcode);
        if (matchingElement) {
            console.log('Elemento encontrado con idcode:', matchingElement);
        }
    }
}
module.exports = CodesListService;
//# sourceMappingURL=servicio.js.map