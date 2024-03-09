// CodesListService.js

const readline = require('readline');
const fs = require('fs');

class CodesListService {
  async readData(idcode) {
    console.log('Entro al servicio con idcode:', idcode);

    // Crea una interfaz para leer el archivo línea por línea
    const rl = readline.createInterface({
      input: fs.createReadStream('datos.jsonl'),
      crlfDelay: Infinity,
    });

    let block = [];
    let lineNumber = 0;

    try {
      // Itera sobre cada línea del archivo
      for await (const line of rl) {
        // Convierte la línea de JSON a objeto
        const data = JSON.parse(line);

        // Agrega el objeto al bloque actual
        block.push(data);

        // Incrementa el número de líneas leídas
        lineNumber++;

        // Si se llega a las 500 líneas, procesa el bloque y reinicia
        if (lineNumber === 500) {
          await this.processBlock(idcode, block);
          block = [];
          lineNumber = 0;
        }
      }

      // Procesa cualquier línea restante que no forme un bloque completo
      if (block.length > 0) {
        await this.processBlock(idcode, block);
      }

      // Devuelve el número total de líneas leídas
      return lineNumber;
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      throw error; // Puedes manejar el error de alguna manera
    }
  }

  async processBlock(idcode, block) {
    // Aquí puedes realizar alguna lógica con el bloque actual
    // Puedes personalizar esta función según tus necesidades
    console.log('Bloque leído:', block);

    // Ejemplo: Buscar el elemento con id igual a idcode
    const matchingElement = block.find((data) => data.id === idcode);
    if (matchingElement) {
      console.log('Elemento encontrado con idcode:', matchingElement);
    }
  }
}

module.exports = CodesListService;
