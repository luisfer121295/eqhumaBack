import * as fs from 'fs';

interface Coordinates {
  center_longitude: number;
  center_latitude: number;
}

interface Associations {
  point_of_interest: string[];
}

interface Ancestor {
  id: string;
  type: string;
}

interface Descendants {
  province_state: string[];
}

export interface Country {
  id: string;
  type: string;
  name: string;
  name_full: string;
  country_code: string;
  coordinates: Coordinates;
  associations: Associations;
  ancestors: Ancestor[];
  descendants: Descendants;
  property_ids_expanded: string[];
  property_ids: string[];
  categories: string[];
  tags: string[];
}

export class CountryService {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private readLargeFile(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileStream = fs.createReadStream(this.filePath, { encoding: 'utf8' });
      let content = '';

      fileStream.on('data', (chunk) => {
        content += chunk;

        // Procesa o almacena la parte del contenido según sea necesario

        // Puedes hacer alguna lógica aquí si es necesario procesar parte por parte
      });

      fileStream.on('end', () => {
        resolve(content);
      });

      fileStream.on('error', (error) => {
        reject(error);
      });
    });
  }

  private parseJsonLines(jsonLines: string): Country[] {
    const lines = jsonLines.split('\n');
    return lines.map((line) => JSON.parse(line.trim()));
  }

  async getCountOfElements(): Promise<any> {
    try {
      const fileContent = await this.readLargeFile();
      const countries = this.parseJsonLines(fileContent);
      return countries.length;
    } catch (error) {
      console.error('Error reading or parsing the file:', error);
      return -1;
    }
  }
}