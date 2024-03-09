import axios from "axios";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { infojsonNuitee } from "./entities/general/nuitee1.entity";
import * as fs from "fs";
import * as readline from "readline";
import { CountryService } from "./lista";

import { entitiCountry } from "./entities/general/nuitee_country.entity";
import { entitiCoordinates } from "./entities/general/nuitee_coordinates.entity";
import { entitipoint_of_interest } from "./entities/general/nuitee_point_of_interest.entity";
import { entiticontinent } from "./entities/general/nuitee_continent.entity";
import { entitidescendants } from "./entities/general/nuitee_descendants.entity";
import { entitiproperty_ids_expanded } from "./entities/general/nuitee_property_ids_expanded.entity";
import { entitiproperty_ids } from "./entities/general/nuitee_property_ids.entity";
import { entiticategories } from "./entities/general/nuitee_categories.entity";
import { entititags } from "./entities/general/nuitee_tags.entity";
import { entitiSearchPR } from "./entities/mapingNuitee/nuitee_search";
import { entitiStatus } from "./entities/mapingNuitee/nuitee_search_status.entity";
import { entitiAtributes } from "./entities/mapingNuitee/search_attributeses.entity";
import { entitiHotelImages } from "./entities/mapingNuitee/search_hotelimages.entity";
import { entitiInfoRooms } from "./entities/general/search_rooms.entity";
import { entitiMachInfoHotels } from "./entities/general/mach_hotels.entity";
import { urlproviders } from "src/Utils/Urls";
import { tableSearchPR } from "./entities/mapingNuitee/table_searchNuitee.entity";
import { ResponseStatus, Response } from "./types/search.types";
import { entititemp } from "./entities/mapingNuitee/tempo.entity";

import * as path from "path";
import * as appRootPath from "app-root-path";
import { proces3type } from "./nuitee_types";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { response } from "express";

@Injectable()
export class NuiteeService {
  constructor(
    @InjectRepository(infojsonNuitee)
    private readonly setnuitee: Repository<infojsonNuitee>,
    @InjectRepository(entitiCountry)
    private readonly setentitiCountry: Repository<entitiCountry>,
    @InjectRepository(entitipoint_of_interest)
    private readonly setentitipoint_of_interest: Repository<entitipoint_of_interest>,
    @InjectRepository(entiticontinent)
    private readonly setentiticontinent: Repository<entiticontinent>,
    @InjectRepository(entitidescendants)
    private readonly setentitidescendants: Repository<entitidescendants>,
    @InjectRepository(entitiproperty_ids_expanded)
    private readonly setentitiproperty_ids_expanded: Repository<entitiproperty_ids_expanded>,
    @InjectRepository(entitiproperty_ids)
    private readonly setentitiproperty_ids: Repository<entitiproperty_ids>,
    @InjectRepository(entiticategories)
    private readonly setentiticategories: Repository<entiticategories>,
    @InjectRepository(entititags)
    private readonly setentititags: Repository<entititags>,

    @InjectRepository(entitiSearchPR)
    private readonly setentitiSearch: Repository<entitiSearchPR>,
    @InjectRepository(entitiStatus)
    private readonly setentitiStatus: Repository<entitiStatus>,
    @InjectRepository(entitiAtributes)
    private readonly setentitiAtributes: Repository<entitiAtributes>,
    @InjectRepository(entitiHotelImages)
    private readonly setentitiHotelImages: Repository<entitiHotelImages>,
    @InjectRepository(entitiInfoRooms)
    private readonly setentitiInfoRooms: Repository<entitiInfoRooms>,

    @InjectRepository(tableSearchPR)
    private readonly connecttableSearchPR: Repository<tableSearchPR>,

    @InjectRepository(entitiMachInfoHotels)
    private readonly setentitiMachInfoHotels: Repository<entitiMachInfoHotels>,

    @InjectRepository(entititemp)
    private readonly setentitiTemp: Repository<entititemp>

  ) {}

  async CodeInfo(code) {
    try {
      const result = await this.setnuitee.find({
        where: {
          codename: code,
        },
      });
      if (result.length != 0) {
        return result;
      } else {
        return [{ error: "No se encontraron resultados" }];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async CodeUpdate(idcode, iduser) {
    try {
      const datosbase1 = await this.setnuitee.update(
        { id_code: idcode },
        {
          idusuariocanje: iduser,
          fechacanje: () => "CURRENT_TIMESTAMP",
        }
      );

      if (datosbase1.affected > 0) {
        return [{ data: "redeem code update" }];
      } else {
        return [{ error: "No se encontraron resultados" }];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readdata(idcode) {
    console.log("entro a servicio ");
    console.log(idcode);
    try {
      const countryService = new CountryService(
        "C:/Proyectos/ENKI/enki_back/src/nuitee/nuitee_regions.jsonl"
      );
      const count = countryService.getCountOfElements();

      if ((await count) >= 0) {
        return [{ data: `redeem code update. Total elements: ${count}` }];
      } else {
        return [{ error: "Error reading or parsing the file" }];
      }
    } catch (error) {
      console.log(error);
      return [{ error: "Internal Server Error" }];
    }
  }

  ///////////////////////////

  async readData(idcode: string): Promise<{ totalLines: number }> {
    console.log("Entro al servicio con idcode:", idcode);

    // Crea una interfaz para leer el archivo línea por línea
    // const rl = readline.createInterface({
    //   input: fs.createReadStream('C:/Proyectos/ENKI/enki_back/src/nuitee/prueba2.jsonl'),
    //   crlfDelay: Infinity,
    // });

    const filePath = path.join(
      appRootPath.toString(),
      "./src/nuitee/prueba2.jsonl"
    );

    // Crea una interfaz para leer el archivo línea por línea
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    let block = [];
    let lineNumber = 0;
    let totalLines = 0; // Contador global
    let coordinatesArray = [];
    let pointOfInterestArray = [];
    let ancestorsArray = [];
    let descendantsArray = [];
    let property_ids_expandedArray = [];
    let property_idsArray = [];
    let categoriesArray = [];
    let tagsArray = [];

    try {
      // Itera sobre cada línea del archivo
      for await (const line of rl) {
        try {
          // Convierte la línea de JSON a objeto
          const data = JSON.parse(line);

          console.log(
            "valor para insertar de linea <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
          );
          console.log();
          // console.log(data)

          pointOfInterestArray =
            data["associations"]["point_of_interest"] || [];
          ancestorsArray = data["ancestors"] || [];
          descendantsArray = data["descendants"]?.["province_state"] || [];
          property_ids_expandedArray = data["property_ids_expanded"] || [];
          property_idsArray = data["property_ids"] || [];
          categoriesArray = data["categories"] || [];
          tagsArray = data["tags"] || [];

          console.log(
            "center_longitude",
            data["coordinates"]["center_longitude"]
          );
          console.log(
            "center_latitude",
            data["coordinates"]["center_latitude"]
          );
          console.log("pointOfInterestArray", pointOfInterestArray.length || 0);
          console.log("ancestorsArray", ancestorsArray.length || 0);
          console.log("descendantsArray", descendantsArray.length || 0);
          console.log(
            "property_ids_expandedArray",
            property_ids_expandedArray.length || "0"
          );
          console.log("property_idsArray", property_idsArray.length || 0);
          console.log("categoriesArray", categoriesArray.length || 0);
          console.log("tagsArray", tagsArray.length || 0);

          // console.log(data.coordinates.center_longitude);
          // console.log(data['associations']['point_of_interest']);

          //insertar  tabla registros

          const inserttable1 = this.setentitiCountry.create({
            id: data["id"],
            type: data["type"],
            name: data["name_full"], // Asumiendo que 'name_full' es el campo correcto
            name_full: data["name_full"],
            country_code: data["country_code"],
            coordinates: `${data["coordinates"]["center_longitude"]}, ${data["coordinates"]["center_latitude"]}`,
            associations: String(pointOfInterestArray.length),
            ancestors: String(ancestorsArray.length),
            descendants: String(descendantsArray.length),
            property_ids_expanded: String(property_ids_expandedArray.length),
            property_ids: String(property_idsArray.length),
            categories: String(categoriesArray.length),
            tags: String(tagsArray.length),
            available: true,
          });
          await inserttable1.save();

          for (const pointOfInteres of pointOfInterestArray) {
            const inserttablePointInteres =
              this.setentitipoint_of_interest.create({
                id: data["id"],
                name: pointOfInteres,
                available: true,
              });
            await inserttablePointInteres.save();
          }

          for (const ancestors of ancestorsArray) {
            const inserttableContinent = this.setentiticontinent.create({
              id_country: ancestors["id"],
              id: data["id"],
              type: ancestors["type"],
              available: true,
            });
            await inserttableContinent.save();
          }

          for (const descendants of descendantsArray) {
            const inserttableDescendats = this.setentitidescendants.create({
              id: data["id"],
              province_state: descendants,
              available: true,
            });
            await inserttableDescendats.save();
          }

          for (const property_ids_expanded of property_ids_expandedArray) {
            const inserttablepropertyext =
              this.setentitiproperty_ids_expanded.create({
                id: data["id"],
                property_ids_expanded: property_ids_expanded,
                available: true,
              });
            await inserttablepropertyext.save();
          }

          for (const property_ids of property_idsArray) {
            const inserttablepropertyID = this.setentitiproperty_ids.create({
              id: data["id"],
              property_ids: property_ids,
              available: true,
            });
            await inserttablepropertyID.save();
          }

          for (const categories of categoriesArray) {
            const inserttableCategories = this.setentiticategories.create({
              id: data["id"],
              categories: categories,
              available: true,
            });
            await inserttableCategories.save();
          }

          for (const tags of tagsArray) {
            const inserttableTags = this.setentititags.create({
              id: data["id"],
              tags: tags,
              available: true,
            });
            await inserttableTags.save();
          }

          // Agrega el objeto al bloque actual
          block.push(data);

          // Incrementa el número de líneas leídas
          lineNumber++;
          totalLines++;
          console.log("linea procesada ");
          console.log(lineNumber);
          // Si se llega a las 500 líneas, procesa el bloque y reinicia
          if (lineNumber === 500) {
            await this.processBlock(idcode, block);
            block = [];
            lineNumber = 0;
          }
        } catch (jsonError) {
          console.error(`Error parsing JSON at line ${lineNumber}:`, jsonError);
          // Puedes manejar este error de alguna manera, por ejemplo, ignorar la línea o registrarla
        }
      }

      // Procesa cualquier línea restante que no forme un bloque completo
      if (block.length > 0) {
        await this.processBlock(idcode, block);
      }

      // Devuelve el número total de líneas leídas
      return { totalLines };
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      throw error; // Puedes manejar el error de alguna manera
    }
  }

  async processBlock(idcode: string, block: any[]): Promise<void> {
    // console.log('Bloque leído:', block);
    // Ejemplo: Buscar el elemento con id igual a idcode
    // const matchingElement = block.find((data) => data.id === idcode);
    // if (matchingElement) {
    //   console.log('Elemento encontrado con idcode:', matchingElement);
    // }
  }

  ///////////// funciones originales para leer archivo
  async readDataNew(
    idcode: number
  ): Promise<{ totalLines: number; arrayData: any[] }> {
    console.log("Entro al servicio con idcode:", idcode);

    const filePath = path.join(
      appRootPath.toString(),
      "./src/nuitee/listenmissing2.jsonl"
    );
    const startLine = 5; // Define el número de línea desde el que deseas empezar a leer
    const linesPerSection = 100; // Define la cantidad de líneas por sección

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    let currentLine = 1;
    let arrayData = [];

    const readSection = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        rl.on("line", (line) => {
          if (currentLine >= idcode) {
            // Intentar analizar la línea como un array JSON
            try {
              const jsonArray = JSON.parse(line);

              // Agregar el array JSON a arrayData
              arrayData.push(jsonArray);
            } catch (error) {
              console.error("Invalid JSON!");
              console.error(`Error: ${error.message}`);
            }
          }

          // Incrementar el contador de líneas
          currentLine++;

          // Verificar si hemos leído suficientes líneas para esta sección
          if (arrayData.length >= linesPerSection) {
            rl.removeAllListeners(); // Detener la lectura para esta sección
            resolve();
          }
        });

        rl.on("close", () => {
          // El código dentro de este bloque se ejecutará cuando se haya leído todo el archivo
          console.log("Lectura del archivo completada.");
          // console.log('Array de datos:', arrayData);
          resolve();
        });
      });
    };

    await readSection(); // Esperar a que se lea la primera sección

    // await this.saveDataToDatabase( arrayData);

    return { totalLines: currentLine, arrayData };
  }

  async saveDataToDatabase(data) {
    let totalItemsProcessed = 0;

    for (const item of data.arrayData) {
      const insertTable1 = this.setentitiCountry.create({
        id: item.id,
        type: item.type,
        name: item.name_full,
        name_full: item.name_full,
        country_code: item.country_code,
        coordinates: `${item.coordinates.center_longitude}, ${item.coordinates.center_latitude}`,
        associations: String(item.associations.point_of_interest.length),
        ancestors: String(item.ancestors.length),
        descendants: String((item.descendants?.province_state || []).length),
        property_ids_expanded: String(item.property_ids_expanded.length),
        property_ids: String(item.property_ids.length),
        categories: String(item.categories.length),
        tags: String(item.tags.length),
        available: true,
      });

      if (item.associations.point_of_interest.length > 0) {
        // for (const point_of_interest of item.associations.point_of_interest){
        //   const inserttablePointInteres = this.setentitipoint_of_interest.create({
        //     id : item.id,
        //     name: point_of_interest,
        //     available: true,
        // });
        // await inserttablePointInteres.save();
        // }

        await this.inserttablePointInteres(
          item.id,
          item.associations.point_of_interest
        );
      }

      if (item.ancestors.length > 0) {
        // for (const ancestors of item.ancestors){
        //   const inserttableContinent = this.setentiticontinent.create({
        //     id_country: ancestors.id,
        //     id : item.id,
        //     type: ancestors.type,
        //     available: true,
        // });
        // await inserttableContinent.save();
        // }

        await this.inserttableContinent(item.id, item.ancestors);
      }

      if (item.property_ids_expanded.length > 0) {
        // for (const property_ids_expanded of item.property_ids_expanded){
        //   const inserttablepropertyext = this.setentitiproperty_ids_expanded.create({
        //     id : item.id,
        //     property_ids_expanded: property_ids_expanded,
        //     available: true,
        // });
        // await inserttablepropertyext.save();
        // }

        await this.inserttablepropertyext(item.id, item.property_ids_expanded);
      }

      if (item.property_ids.length > 0) {
        // for (const property_ids of item.property_ids){
        //   const inserttablepropertyID = this.setentitiproperty_ids.create({
        //     id : item.id,
        //     property_ids: property_ids,
        //     available: true,
        // });
        // await inserttablepropertyID.save();
        // }

        await this.inserttablepropertyID(item.id, item.property_ids);
      }

      if (item.categories.length > 0) {
        //     for (const categories of item.categories){
        //       const inserttableCategories = this.setentiticategories.create({
        //         id : item.id,
        // categories: categories,
        // available: true,
        //     });
        //     await inserttableCategories.save();
        //     }

        await this.inserttableCategories(item.id, item.categories);
      }

      if (item.tags.length > 0) {
        // for (const tags of item.tags){
        //   const inserttableTags = this.setentititags.create({
        //     id : item.id,
        //     tags: tags,
        //     available: true,
        // });
        // await inserttableTags.save();
        // }
        await this.inserttableTags(item.id, item.tags);
      }

      await insertTable1.save();
      totalItemsProcessed++;
      console.log("totalItemsProcessed <<<<<<<<<<<<<<<<<<<<<<<<<<<");
      console.log(totalItemsProcessed);
    }

    return { totalItemsProcessed };
  }

  async inserttablePointInteres(idpr, data) {
    for (const point_of_interest of data) {
      const inserttablePointInteres = this.setentitipoint_of_interest.create({
        id: idpr,
        name: point_of_interest,
        available: true,
      });
      await inserttablePointInteres.save();
    }
  }

  async inserttableContinent(idpr, data) {
    for (const ancestors of data) {
      const inserttableContinent = this.setentiticontinent.create({
        id_country: ancestors.id,
        id: idpr,
        type: ancestors.type,
        available: true,
      });
      await inserttableContinent.save();
    }
  }

  async inserttablepropertyext(idpr, data) {
    for (const property_ids_expanded of data) {
      const inserttablepropertyext = this.setentitiproperty_ids_expanded.create(
        {
          id: idpr,
          property_ids_expanded: property_ids_expanded,
          available: true,
        }
      );
      await inserttablepropertyext.save();
    }
  }

  async inserttablepropertyID(idpr, data) {
    for (const property_ids of data) {
      const inserttablepropertyID = this.setentitiproperty_ids.create({
        id: idpr,
        property_ids: property_ids,
        available: true,
      });
      await inserttablepropertyID.save();
    }
  }

  async inserttableCategories(idpr, data) {
    for (const categories of data) {
      const inserttableCategories = this.setentiticategories.create({
        id: idpr,
        categories: categories,
        available: true,
      });
      await inserttableCategories.save();
    }
  }

  async inserttableTags(idpr, data) {
    for (const tags of data) {
      const inserttableTags = this.setentititags.create({
        id: idpr,
        tags: tags,
        available: true,
      });
      await inserttableTags.save();
    }
  }

  async inserttableDescendats(idpr, data) {
    for (const descendants of data) {
      const inserttableDescendats = this.setentitidescendants.create({
        id: idpr,
        province_state: descendants,
        available: true,
      });
      await inserttableDescendats.save();
    }
  }

  async saveDataToDatabase3(data) {
    let totalItemsProcessed = 0;
    const promises = [];

    for (const item of data.arrayData) {
      const insertTable1 = this.setentitiCountry.create({
        id: item.id,
        type: item.type,
        name: item.name_full,
        name_full: item.name_full,
        country_code: item.country_code,
        coordinates: `${item.coordinates.center_longitude}, ${item.coordinates.center_latitude}`,
        associations: String(
          (item.associations?.point_of_interest || []).length
        ),
        ancestors: String((item.ancestors || []).length),
        descendants: String((item.descendants?.province_state || []).length),
        property_ids_expanded: String(
          (item.property_ids_expanded || []).length
        ),
        property_ids: String((item.property_ids || []).length),
        categories: String((item.categories || []).length),
        tags: String((item.tags || []).length),
        available: true,
      });

      promises.push(insertTable1.save());

      if (
        item.associations &&
        item.associations.point_of_interest &&
        item.associations.point_of_interest.length > 0
      ) {
        promises.push(
          this.inserttablePointInteres(
            item.id,
            item.associations.point_of_interest
          )
        );
      }

      if (item.ancestors && item.ancestors.length > 0) {
        promises.push(this.inserttableContinent(item.id, item.ancestors));
      }

      if (
        item.descendants &&
        item.descendants.province_state &&
        item.descendants.province_state.length > 0
      ) {
        promises.push(
          this.inserttableDescendats(item.id, item.descendants.province_state)
        );
      }

      if (item.property_ids_expanded && item.property_ids_expanded.length > 0) {
        promises.push(
          this.inserttablepropertyext(item.id, item.property_ids_expanded)
        );
      }

      if (item.property_ids && item.property_ids.length > 0) {
        promises.push(this.inserttablepropertyID(item.id, item.property_ids));
      }

      if (item.categories && item.categories.length > 0) {
        promises.push(this.inserttableCategories(item.id, item.categories));
      }

      if (item.tags && item.tags.length > 0) {
        promises.push(this.inserttableTags(item.id, item.tags));
      }

      totalItemsProcessed++;
      console.log("totalItemsProcessed <<<<<<<<<<<<<<<<<<<<<<<<<<<");
      console.log(totalItemsProcessed);
    }

    await Promise.all(promises);

    return { totalItemsProcessed };
  }

  // dividir archivo original

  async splitAndCreateFiles() {
    const filePath = path.join(
      appRootPath.toString(),
      "./src/nuitee/nuitee_regions.jsonl"
    );
    const linesPerFile = 200000;

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    let currentLine = 1;
    let sectionCount = 1;

    const createNewFile = () => {
      return fs.createWriteStream(`registros${sectionCount}.jsonl`, {
        flags: "a",
      });
    };

    let outputStream = createNewFile();

    rl.on("line", (line) => {
      if (currentLine > 5) {
        // Skips the first 5 lines
        outputStream.write(`${line}\n`);

        if (currentLine % linesPerFile === 0) {
          outputStream.end();
          sectionCount++;
          outputStream = createNewFile();
        }
      }

      currentLine++;
    });

    rl.on("close", () => {
      // The code inside this block will be executed when the entire file has been read
      console.log("File split completed.");
      outputStream.end();
    });
  }

  // async validIDData(idcode: string): Promise<{ totalLines: number }> {
  //   console.log('Entro al servicio con idcode:', idcode);

  //   const filePath = path.join(appRootPath.toString(), './src/nuitee/prueba2.jsonl');

  //   // Crea una interfaz para leer el archivo línea por línea
  //   const rl = readline.createInterface({
  //       input: fs.createReadStream(filePath),
  //       crlfDelay: Infinity,
  //   });

  //   let block = [];
  //   let lineNumber = 0;
  //   let totalLines = 0; // Contador global
  //   let idsmissing = [];

  //   try {
  //     // Itera sobre cada línea del archivo
  //     for await (const line of rl) {
  //       try {
  //         // Convierte la línea de JSON a objeto
  //         const data = JSON.parse(line);

  //         console.log('valor para validar de linea <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  //         console.log()

  //         //valida id  tabla registros

  //         const datosbase1 = await this.setentitiCountry.findOne({
  //           where: {
  //             id: data.id,
  //           },
  //         });

  //         if (datosbase1) {
  //           // Si se encuentra la entidad, devuelve true

  //         } else {
  //           // Si no se encuentra la entidad, devuelve false

  //         }

  //         // Incrementa el número de líneas leídas
  //         lineNumber++;
  //         totalLines++;
  //         console.log('linea procesada ');
  //         console.log(lineNumber);

  //       } catch (jsonError) {
  //         console.error(`Error parsing JSON at line ${lineNumber}:`, jsonError);
  //         // Puedes manejar este error de alguna manera, por ejemplo, ignorar la línea o registrarla
  //       }
  //     }

  //     // Devuelve el número total de líneas leídas
  //     return { totalLines };
  //   } catch (error) {
  //     console.error('Error al leer el archivo:', error);
  //     throw error; // Puedes manejar el error de alguna manera
  //   }
  // }

  async validIDData(idcode: string): Promise<{ totalLines: number }> {
    console.log("Entro al servicio con idcode:", idcode);

    const filePath = path.join(
      appRootPath.toString(),
      "./src/nuitee/nuevo.jsonl"
    );

    // Crea una interfaz para leer el archivo línea por línea
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    let lineNumber = 0;
    let totalLines = 0; // Contador global
    let idsmissing = [];

    // Agrega esta función para escribir la línea en el archivo listenmissing.jsonl
    function writeMissingLine(line: string) {
      fs.appendFileSync("./listenmissing.jsonl", `${line}\n`);
    }

    try {
      // Itera sobre cada línea del archivo
      for await (const line of rl) {
        try {
          // Convierte la línea de JSON a objeto
          const data = JSON.parse(line);

          //valida id tabla registros
          const datosbase1 = await this.setentitiCountry.findOne({
            where: {
              id: data.id,
            },
          });

          if (!datosbase1) {
            // Si no se encuentra la entidad, añade la línea al archivo listenmissing.jsonl
            writeMissingLine(line);

            // Incrementa el contador de IDs faltantes
            idsmissing.push(data.id);
          }

          // Incrementa el número de líneas leídas
          lineNumber++;
          totalLines++;
          console.log("linea procesada ");
          console.log(lineNumber);
        } catch (jsonError) {
          console.error(`Error parsing JSON at line ${lineNumber}:`, jsonError);
          // Puedes manejar este error de alguna manera, por ejemplo, ignorar la línea o registrarla
        }
      }

      // Devuelve el número total de líneas leídas
      return { totalLines };
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      throw error; // Puedes manejar el error de alguna manera
    }
  }

  //// select de id nuitee

  async readnuitee(idNuitee) {
    console.log("valor ingresado para busqueda de nuitee");
    console.log(idNuitee);
    const datosbase1 = await this.setentitiCountry.find({
      where: {
        name: "Tampa, Florida, United States of America",
      },
    });
    console.log(
      "<<<<<<<<<<<<<<<<<<<<<<<<<<<<info location>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    console.log(datosbase1);

    return datosbase1;
  }

  async readnuiteePropertyIdsExp(idNuitee) {
    console.log("valor ingresado para busqueda de nuitee");
    console.log(idNuitee);
    const promises = [];

    const datosbase2 = await this.setentitiproperty_ids_expanded.find({
      where: {
        id: idNuitee,
      },
    });
    console.log("<<<<<<<<<<<<<<<<<id properti expandes >>>>>>>>>>>>>>>>>>>>>");
    console.log(datosbase2.length);

    if (datosbase2.length != 0) {
      promises.push(this.setNuiteeSearch(datosbase2));
    }
    return datosbase2.length;
  }

  async setinfoIDnuitee(hotelcode) {
    console.log(
      "<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos ingresados>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    const promises = [];
    try {
      const response = await axios.post(
        "http://ws.nuitee.com/nuitee/2.0/content/hotelInfo",
        {
          hotelId: 118922,
        },
        {
          headers: {
            Authorization:
              "signature=4492c8ae2cf8cd462df354f542a5323c34110a1231a6aff88e5109e36a3eddb06986cec8670f6899daff0faf821163bebd7a991f1233fdbb31af9750cb3ac211, timestamp=1707777231",
            "Content-Type": "application/json",
            ApiKey: "antoniogomez",
          },
        }
      );
      const result = response.data;

      console.log("información de busqueda. ");

      if (result["responseStatus"]["statusCode"] == 1000) {
        promises.push(
          this.insertableStatus(hotelcode, result["responseStatus"])
        );
      }

      return result;
    } catch (error) {
      console.log(" <<<<<<<<<<< Error en nuite Info" + error);
      return null;
    }
  }

  /// proces Search info hotels para tabla machinfo

  async setNuiteeSearch(hotelcode) {
    console.log(
      "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos ingresados>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );

    console.log("hotelcode.property_ids_expande");
    console.log(hotelcode[0].property_ids_expanded);

    const promises = [];

    for (const itemids of hotelcode) {
      // Crear una promesa para cada iteración del bucle
      const promise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            "http://ws.nuitee.com/nuitee/2.0/content/hotelInfo",
            {
              hotelId: itemids.property_ids_expanded,
            },
            {
              headers: {
                Authorization:
                  "signature=4492c8ae2cf8cd462df354f542a5323c34110a1231a6aff88e5109e36a3eddb06986cec8670f6899daff0faf821163bebd7a991f1233fdbb31af9750cb3ac211, timestamp=1707777231",
                "Content-Type": "application/json",
                ApiKey: "antoniogomez",
              },
            }
          );
          const result = response.data;

          // console.log("información de busqueda. ");

          if (result["responseStatus"]["statusCode"] == 1000) {
            await this.insertTabMatch(result);
          }
          resolve(result);
        } catch (error) {
          console.log(" <<<<<<<<<<< Error en nuite Info" + error);
          reject(error);
          await this.insertTabMatchFailed(itemids.property_ids_expanded);

          // resolve(null);
        }
      });

      // Agregar la promesa al array de promesas
      promises.push(promise);
    }

    // Ejecutar todas las promesas y esperar que se resuelvan
    await Promise.all(promises);

    console.log("termino<<<<<<<<<<<", hotelcode.length);

    // const results = await Promise.allSettled(promises);

    // // Iterar sobre los resultados para manejar errores
    // results.forEach(async (result, index) => {
    //   if (result.status === 'rejected') {
    //     console.error(`La promesa ${index} fue rechazada para itemid ${hotelcode[index].property_ids_expanded} con el error:`, result.reason);

    //   }
    // });

    console.log("termino<<<<<<<<<<<", hotelcode.length);
  }

  async insertableStatus(hotelID, ResponseStatus: ResponseStatus) {
    console.log("datos de ResponseStatus");
    console.log(ResponseStatus.requestAt);
    console.log(ResponseStatus.responseAt);
    console.log(ResponseStatus.statusCode);
    console.log(ResponseStatus.statusMessage);

    //   const inserttableStatusSearch = this.setentitiStatus.create({
    //     hotelId: hotelID,
    //     statusCode : ResponseStatus.requestAt,
    //     requestAt: ResponseStatus.requestAt,
    //     responseAt: ResponseStatus.responseAt,
    //     statusMessage: ResponseStatus.statusMessage,
    // });
    // await inserttableStatusSearch.save();
  }


  async validinfoTabMatch(Response: Response) {
    const inserttableStatusSearch = this.setentitiMachInfoHotels.findOne({
      where: {
        nuitee_hotelid: Response.hotelId,
      },
    });

    console.log("se valida si id existe en la tabla machinfo Nuitee >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(validexistence)

    return !!inserttableStatusSearch; // Convertir a booleano, devuelve true si existe un registro, false si no existe
  }

  async insertTabMatch(Response: Response) {
    const inserttableStatusSearch = this.setentitiMachInfoHotels.create({
      nuitee_hotelid: Response.hotelId,
      nuitee_name: Response.name,
      nuitee_address1: Response.address1,
      nuitee_address2: Response.address2,
      nuitee_city: Response.city,
      nuitee_citycode: Response.cityCode,
      nuitee_stateprovince: Response.stateProvince,
      nuitee_latitude: Response.latitude,
      nuitee_longitude: Response.longitude,
    });
    await inserttableStatusSearch.save();
  }

  async insertTabMatchFailed(hotelcode) {
    console.log("entro a insert error hotel ");

    const inserttableStatusSearch = this.setentitiMachInfoHotels.create({
      nuitee_hotelid: hotelcode,
      nuitee_name: "0",
      nuitee_address1: "0",
      nuitee_address2: "0",
      nuitee_city: "0",
      nuitee_citycode: 0,
      nuitee_stateprovince: "0",
      nuitee_latitude: "0",
      nuitee_longitude: "0",
    });
    await inserttableStatusSearch.save();
  }

  ////////// Marckcorps

  async selectinfmach(amount) {
    const promises = [];

    const datosbasemach = await this.setentitiMachInfoHotels.find({
      where: {
        // available: true,
        id_machinfo: 6400,
      },
      // take: 3,
      order: {
        id_machinfo: "ASC",
      },
    });
    console.log("<<<<<<<<cantidad de registros en select >>>>>>>>>>>");
    console.log(datosbasemach.length);

    let procesdata = await this.readtableTempo(amount);

    console.log('información de tabla temporal <<<<<<<<<<<<<<<')
    console.log(procesdata)




    // for (const item of datosbasemach) {
    //   console.log("datosbasemach.length");
    //   console.log(item.id_machinfo);
    //   console.log(item.nuitee_name);
    //   this.procesarDatos(item);
    // }
    // return datosbasemach.length;

  }

  async procesarDatos(infobase: any) {
    // Aquí puedes realizar cualquier operación con los datos recibidos
    console.log("nombre de Nuitee a buscar ---");
    console.log(infobase.name);
    let nombreLimpio = infobase.name.replace(/[\/?$()*,]/g, " ");


    let rule1 = 0;
    let rule2 = 0;
    let rule3 = 0;
    let rule4 = 0;
    let rulesMatched = 0;

    let urlarm = `https://api.makcorps.com/mapping?api_key=65a775f34bdc1a8110980186&name=${nombreLimpio}`

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: urlarm,
      headers: {},
    };

    axios
      .request(config)
      .then(async (response) => {
        const statuspetition = response.status;
        console.log("<<<<<<<<<<<<<<<<<<<<statuspetition>>>>>>>>>>>>>>>>>>>>");


        this.inserttable_status_Markcorps(infobase.hotelid, urlarm, response);

        console.log("<<<<<<<<<<<<<<<<<<<< se guarda status de petición >>>>>>>>>>>>>>>>>>>>");


       

        const responseJson = response.data;

        /// regla 1
        let index = 0;
        for (const item of responseJson) {
          console.log(
            "                                                                        "
          );
          console.log("comparación regla ");

          let name_a_buscar = infobase.name;
          let name_en_donde_busca = item.name;
          let name_a_buscar_lower = name_a_buscar.toLowerCase();
          let name_en_donde_busca_lower = name_en_donde_busca.toLowerCase();

          let addresnuitee = infobase.address1;

          let addresMarkcorps = item.details.address
            ? item.details.address
            : "0000 0000";
          let splitNuitee = addresnuitee.split(" ");
          let splitMarkcorps = addresMarkcorps.split(" ");

          let coordinates = item.coords ? item.coords : "0000, 0000";
          let coords = coordinates.split(",");

          let latitudMarkcorps = parseFloat(coords[0]);
          let longitudMarkcorps = parseFloat(coords[1]);
          let latitudMarkcorps2 = coords[0];
          let longitudMarkcorps2 = coords[1];

          // Reiniciar el contador de reglas coincidentes para esta iteración
          rulesMatched = 0;

          console.log("-----------------------------------------------");

          console.log("comparación regla 1 ");
          console.log(infobase.name);
          console.log(item.name);
          console.log("-----------------------------------------------");
  
          console.log("----------------------------------------------------------------");

          console.log("valores regla dos ");
          console.log(splitNuitee[0]);
          console.log(splitMarkcorps[0]);
          console.log(item.details.address);
          console.log("----------------------------------------------------------------");

          console.log("--------------------------------------------------------------------------------");
          console.log("valores regla 3 ");
          console.log(splitNuitee[0]);
          console.log(splitMarkcorps[splitMarkcorps.length - 1]);
          console.log("--------------------------------------------------------------------------------");

          console.log("------------------------------------------------------------------------------------------");

          console.log("coordenadas nuitee");
          console.log(infobase.latitude);
          console.log(infobase.longitude);

          console.log("coordenadas markcorps");
          console.log(latitudMarkcorps);
          console.log(longitudMarkcorps);
          console.log("------------------------------------------------------------------------------------------");


          let nuiteeLatitud = infobase.latitude.substring(0, 5);
          let nuiteeLongitud = infobase.longitude.substring(0, 6);
          let markcorpslatitud = coords[0].substring(0, 5);
          let markcorpslongitud = coords[1].substring(0, 6);

          //primera regla

          if (name_en_donde_busca_lower.includes(name_a_buscar_lower)) {
            rule1 = 1;

            console.log("verdadero primera regla");
            // await this.updateTabMatch(infobase.id_machinfo, item, 1);
          } else {
            console.log("falso en primera regla");
          }
          //primera regla

          //segunda regla
          if (splitNuitee[0] == splitMarkcorps[0]) {
            rule2 = 1;
            //await this.updateTabMatch(infobase.id_machinfo, item, 2);

            console.log("verdadero segunda regla");
          } else {
            console.log("falso segunda regla");
          }
          //segunda regla

          //tercera regla
          if (splitNuitee[0] == splitMarkcorps[splitMarkcorps.length - 1]) {
            rule3 = 1;
            //await this.updateTabMatch(infobase.id_machinfo, item, 3);

            console.log("verdadero tercera rega");
          } else {
            console.log("falso tercera regla");
          }
          //tercera regla

          //cuarta regla
          if (
            nuiteeLatitud == markcorpslatitud &&
            nuiteeLongitud == markcorpslongitud
          ) {
            console.log("verdadero en cuarta regla");

            rule4 = 1;
            // await this.updateTabMatch(infobase.id_machinfo, item, 4);
          } else {
            console.log("falso cuarta regla");
          }

          //cuarta regla

          console.log("rulesMatched");
          console.log(rulesMatched);

          rulesMatched = rule1 + rule2 + rule3 + rule4;
          // Si se cumple más de una regla, imprimir el mensaje
          if (rulesMatched >= 2) {
            console.log("Más de dos reglas coinciden");
            console.log(`Reglas coincidentes en esta iteración: ${rulesMatched}`);
            index++;
            console.log("<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>> " +index);
            
            await this.updateflagsSearch_pr(
              infobase.id_searchhotel,
              item,
              rule1,
              rule2,
              rule3,
              rule4
            );

            break;
          } else {
            console.log(
              "<<<<<<<<<<<<<<<<<<<<<<< error >>>>>>>>>>>>>>>>>>>>>>> "
            );
            console.log(
              `Reglas coincidentes en esta iteración: ${rulesMatched}`
            );
            index++;
            console.log(
              "<<<<<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>>>>> " +
                index
            );

            // Actualización sin coincidencias en markcorps
            await this.updateFailedMarkCoprsSearch_pr(
              infobase.id_searchhotel,
              item,
              rule1,
              rule2,
              rule3,
              rule4
            );


          }
        }
      })
      .catch((error) => {
        console.log(
          "error en busqueda con nombre de hotel",
          infobase.name,
          infobase.id_searchhotel
        );
        console.log("id tabla infomach", infobase.id_searchhotel);

        // console.log(error);

        // this.inserttable_status_Markcorps(infobase.hotelid, urlarm, response);

      });

      
  }

  async updateTabMatch(idtable, Response, flag1, flag2, flag3, flag4) {
    // console.log(' datos a insertar ')

    console.log(idtable);
    // console.log(Response)
    let coords = Response.coords;
    const parts = coords.split(",");
    const datosbase1 = await this.setentitiMachInfoHotels.update(
      { id_machinfo: idtable },
      {
        markcorps_hotelid: Response.document_id,
        markcorps_name: Response.name,
        markcorps_address1: Response.details.address,
        markcorps_city: Response.details.geo_name,
        markcorps_citycode: Response.details.grandparent_id,
        markcorps_latitude: parts[0],
        markcorps_longitude: parts[1],
        available: false,

        flag_name: flag1,
        flag_addresasc: flag2,
        flag_addresdesc: flag3,
        flag_coords: flag4,
      }
    );
  }

  async validarCoordenadas(coordenada1, coordenada2) {
    // Convertir las coordenadas a cadena y dividirlas por el punto decimal
    let coordenadas1 = coordenada1.toString().split(".");
    let coordenadas2 = coordenada2.toString().split(".");

    // Verificar si tienen el mismo número de partes y si tienen al menos 2 partes
    if (coordenadas1.length !== 2 || coordenadas2.length !== 2) {
      return false;
    }

    // Verificar los dos primeros dígitos después del punto decimal
    if (coordenadas1[1].slice(0, 2) !== coordenadas2[1].slice(0, 2)) {
      return false;
    }

    // Verificar si el tercer dígito está dentro del rango del 3 al 9
    let tercerDigito1 = parseInt(coordenadas1[1].charAt(2));
    let tercerDigito2 = parseInt(coordenadas2[1].charAt(2));
    if (
      tercerDigito1 < 3 ||
      tercerDigito1 > 9 ||
      tercerDigito2 < 3 ||
      tercerDigito2 > 9
    ) {
      return false;
    }

    // Si pasa todas las validaciones, las coordenadas son válidas
    return true;
  }
  /// maping info hotls nuitee.
  async searchHotels(amount) {
    //busqueda de ids hoteles en tabla property_ids_expanded
    const datosbasemach = await this.readInfopropertys(amount);

    // busqueda de hoteles por idhotel
    for (const idhotel of datosbasemach) {
      // valida existencia de hotel en tabla principal
      const validaexistenceID = await this.validexistenceID(
        idhotel.property_ids_expanded
      );
      // si no existe se genera busqueda en api de nuitee
      if (validaexistenceID == false) {
        const infohotel = await this.searchApiNuitee(idhotel.property_ids_expanded);

        // console.log("valores de infohotel<<<<<<<<<<<<<<<<<<<<<<<<<<");
        // console.log(infohotel);
        this.inserttable_search_pr(idhotel.property_ids_expanded, infohotel);
      } else {
        console.log("registro exsitente, se salta id ", idhotel.property_ids_expanded);
      }
      // console.log('información de search a api nuitee')
      // console.log(infohotel)
    }
  }

  // consulta de tabla property ids expanded
  async readInfopropertys(amount) {
    const datosbasemach = await this.setentitiproperty_ids_expanded.find({
      where: {
        available: true,
      },
      take: amount,
      order: {
        id_property_ids_expanded: "ASC",
      },
    });
    return datosbasemach;
  }

  // consulta de tabla temporal para distinct

  async readtableTempo(amount) {
    const datosbasemach = await this.setentitiTemp.find({
      where: {
        available: true,
      },
      take: amount,
      order: {
        id_tem: "ASC",
      },
    });
    return datosbasemach;
  }

  // valida existencia de hotel en tabla principal.
  async validexistenceID(idhotel) {
    const validexistence = await this.connecttableSearchPR.findOne({
      where: {
        hotelid: idhotel,
      },
    });

    console.log("se valida si id existe en la tabla search_pr >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", idhotel);
    // console.log(validexistence)

    return !!validexistence; // Convertir a booleano, devuelve true si existe un registro, false si no existe
  }

  async searchApiNuitee(idhotel) {
    // console.log('idhotel ----------- en función de busqueda')
    // console.log(idhotel)

    var url = urlproviders(0);
    try {
      const response = await axios.post(
        url,
        {
          hotelId: idhotel,
        },
        {
          headers: {
            Authorization:
              "signature=4492c8ae2cf8cd462df354f542a5323c34110a1231a6aff88e5109e36a3eddb06986cec8670f6899daff0faf821163bebd7a991f1233fdbb31af9750cb3ac211, timestamp=1707777231",
            "Content-Type": "application/json",
            ApiKey: "antoniogomez",
          },
        }
      );
      const result = response.data;

      // console.log("información de busqueda. ");

      this.inserttable_search_status(idhotel, url, result.responseStatus);

      if (result["responseStatus"]["statusCode"] == 1000) {
        return result;
      }
    } catch (error) {
      console.log(" <<<<<<<<<<< Error en nuite Info" + error);
      // resolve(null);
    }
  }

  async inserttable_search_status(idhotel, url, resultStatus) {
    console.log("resultStatus<<<<<<<<<<<<<<<<<<<");

    // console.log(resultStatus)

    const inserttableStatusSearch = this.setentitiStatus.create({
      hotelid: idhotel,
      statuscode: resultStatus.statusCode,
      requestat: resultStatus.requestAt,
      responseat: resultStatus.responseAt,
      statusmessage: resultStatus.statusMessage,
      flag_provider: 0,
      urlapi: url,
    });
    await inserttableStatusSearch.save();
  }

  async inserttable_status_Markcorps(idhotel, url, resultStatus) {

    // console.log(resultStatus)
    const fechaHoraActual = new Date();
  
    const fecha = fechaHoraActual.toISOString().split('T')[0];


    const inserttableStatusSearch = this.setentitiStatus.create({
      hotelid: idhotel,
      statuscode: resultStatus.status,
      requestat: fecha,
      responseat: fecha,
      statusmessage: resultStatus.statusText,
      flag_provider: 1,
      urlapi: url,
    });
    await inserttableStatusSearch.save();
  }

  async inserttable_search_pr(hoteli, datasearch) {
    let roomsinfo = datasearch.roomInfos;
    let hotelimages = datasearch.hotelImages;
    
    console.log('entro a función principal para insertar.');
    // console.log(datasearch)
  
    const inserttableStatusSearch = this.connecttableSearchPR.create({
      hotelid: hoteli,
      name: datasearch.name,
      address1: datasearch.address1,
      address2: datasearch.address2,
      city: datasearch.city,
      stateprovince: datasearch.stateProvince,
      postalcode: datasearch.postalCode,
      country: datasearch.country,
      latitude: datasearch.latitude,
      longitude: datasearch.longitude,
      airportcode: datasearch.airportCode,
      propertycategory: datasearch.propertyCategory,
      propertycurrency: datasearch.propertyCurrency,
      propertycategoryname: datasearch.propertyCategoryName,
      starrating: datasearch.starRating,
      confidence: datasearch.confidence,
      suppliertype: datasearch.supplierType,
      location: datasearch.location,
      chaincodeid: datasearch.chainCodeId,
      highrate: datasearch.highRate,
      lowrate: datasearch.lowRate,
      checkintime: datasearch.checkInTime,
      checkouttime: datasearch.checkOutTime,
      citycode: datasearch.cityCode,
      hoteldescription: datasearch.hotelDescription,
      hoteldiningdescription: datasearch.hotelDiningDescription,
      hotelattraction: datasearch.hotelAttraction,
      hotellocationdescription: datasearch.hotelLocationDescription,
      hotelfeatures: datasearch.hotelFeatures,
      hotelamenitiesdescription: datasearch.hotelAmenitiesDescription,
      roominfos: roomsinfo.length,
    });

// insertar registros de rooms e  imagenes por hotel. 
const promisesRooms = [];
const promisesImages = [];

console.log("Procesando rooms")
for (const datarooms of roomsinfo){
    promisesRooms.push(this.inserttable_search_roomsinfo(hoteli, datasearch, datarooms));
}
// console.log("Terminó la inserción de registros en la tabla rooms ");


console.log("Procesando imagenes")
for (const dataimageshotel of hotelimages){
    promisesImages.push(this.inserttable_search_hotelimages(hoteli, datasearch, dataimageshotel));
}
// console.log("Terminó la inserción de registros en la tabla hotelimagenes ");


await Promise.all([...promisesRooms, ...promisesImages]);
// console.log("Todas las inserciones han sido completadas.");

await inserttableStatusSearch.save();
// console.log("El estado de la búsqueda ha sido guardado en la base de datos.");


// await this.updatestatus_ids_expanded(hoteli);

await this.updatestatus_table_temporal(hoteli);

return inserttableStatusSearch;
}

  async inserttable_search_roomsinfo(idhotel, datasearch, roomsinfo) {
    const inserttableStatusSearch = this.setentitiInfoRooms.create({

    hotelid : idhotel,
    name: datasearch.name,
    address1 : datasearch.address1,
    address2: datasearch.address2,
    city : datasearch.city,
    roomcode: roomsinfo.roomCode,
    roomname : roomsinfo.roomName
      
    });
    await inserttableStatusSearch.save();
  }

  async inserttable_search_hotelimages(idhotel, datasearch, hotelimages) {
    const inserttableStatusSearch = this.setentitiHotelImages.create({

      hotelid : idhotel,
      name: datasearch.name,
      url: hotelimages.url,  
      thumbnailurl: hotelimages.thumbnailUrl,
      caption: hotelimages.caption,
      ordern: hotelimages.order,
      defaultimage: hotelimages.defaultImage
    });
    await inserttableStatusSearch.save();
  }

  /// actualiza bandera available a false sobre tabla con registros duplicados
  async updatestatus_ids_expanded (idhotel ){
    console.log('entro a actualizar banderas de id´s duplicados..................')
    const datosbase1 = await this.setentitiproperty_ids_expanded.update(
      { property_ids_expanded: idhotel },
      {
        available: false,
      }
      
    );
    console.log(`Registros guardados con éxito para el hotel ${idhotel}`, ': cantidad duplicada', datosbase1.affected);

  }

  //// se actualiza bandera en tabla temporarl

  async updatestatus_table_temporal (idhotel ){
    console.log('entro a actualizar banderas de id´s duplicados..................')
    const datosbase1 = await this.setentitiTemp.update(
      { property_ids_expanded: idhotel },
      {
        available: false,
      }
      
    );


    console.log(`Registros guardados con éxito para el hotel ${idhotel}`, ': cantidad duplicada', datosbase1.affected);

  }

  async processHotelsRecursively(amount) {
    const datosbasemach = await this.readInfopropertys(amount);
  
    // Procesar los hoteles obtenidos
    await Promise.all(datosbasemach.map(async (idhotel) => {
      const validaexistenceID = await this.validexistenceID(idhotel.property_ids_expanded);
      if (!validaexistenceID) {
        const infohotel = await this.searchApiNuitee(idhotel.property_ids_expanded);
        this.inserttable_search_pr(idhotel.property_ids_expanded, infohotel);
      } else {
        console.log("Registro existente, se salta id ", idhotel.property_ids_expanded);
      }
    }));
  
    // Verificar si hay más datos por procesar y realizar una llamada recursiva
    const remainingAmount = amount - datosbasemach.length;
    if (remainingAmount > 0) {
      await this.processHotelsRecursively.call(this, remainingAmount);
    }
  }



  // async searchHotels2(amount) {
  //   //busqueda de ids hoteles en tabla property_ids_expanded
  //   const datosbasemach = await this.readInfopropertys(amount);
  //   let idexitosos = 0;
  //   let idfail = 0;

  //   // busqueda de hoteles por idhotel
  //   for (const idhotel of datosbasemach) {
  //     // valida existencia de hotel en tabla principal
  //     const validaexistenceID = await this.validexistenceID(
  //       idhotel.property_ids_expanded
  //     );
  //     // si no existe se genera busqueda en api de nuitee
  //     if (validaexistenceID == false) {
  //       const infohotel = await this.searchApiNuitee(idhotel.property_ids_expanded);
  //       idexitosos ++
  //       // console.log("valores de infohotel<<<<<<<<<<<<<<<<<<<<<<<<<<");
  //       // console.log(infohotel);
  //      const resultinserttables = await this.inserttable_search_pr(idhotel.property_ids_expanded, infohotel);

  //      console.log('resultinserttables<<<<<<<<<<<<<<<<<<<')
  //      console.log(resultinserttables)

  //     } else {
  //       console.log("registro exsitente, se salta id ", idhotel.property_ids_expanded);
  //       idfail ++
  //     }

  //     return {idexitosos, idfail}

  //     // console.log('información de search a api nuitee')
  //     // console.log(infohotel)
  //   }
  // }
  
  async  searchHotels2(amount) {
    let idexitosos = 0;
    let idfail = 0;
    let registroActual = 0;
    const errores = []; // Array para almacenar los IDs erróneos

    try {
        // const datosbasemach = await this.readInfopropertys(amount);
        const datosbasemach = await this.readtableTempo(amount);


        for (const idhotel of datosbasemach) {
            registroActual++;
            console.log(`Procesando registro ${registroActual} de ${datosbasemach.length}`);

            try {
                const validaexistenceID = await this.validexistenceID(idhotel.property_ids_expanded);

                if (!validaexistenceID) {
                    const infohotel = await this.searchApiNuitee(idhotel.property_ids_expanded);
                    idexitosos++;

                    const resultinserttables = await this.inserttable_search_pr(idhotel.property_ids_expanded, infohotel);
                    // console.log('Resultado de la inserción:');
                } else {
                    console.log(`Registro existente, se salta ID: ${idhotel.property_ids_expanded}`);

                    console.log('se actualiza estatus en tabla temporal para reducir busqueda ')
                    await this.updatestatus_table_temporal(idhotel.property_ids_expanded);

                    idfail++;
                }
            } catch (error) {
                console.error(`Error en el registro ${registroActual}: ${error.message}`);
                errores.push(idhotel.property_ids_expanded); // Guardar el ID erróneo en el array
            }
        }

        console.log(`Proceso completado. Registros exitosos: ${idexitosos}, Registros duplicados: ${idfail}`);

        // Guardar los IDs erróneos en un archivo
        fs.writeFileSync('errores.txt', errores.join('\n'));

        return { idexitosos, idfail };
    } catch (error) {
        console.error('Error durante la ejecución:', error);
        throw error;
    }
}


// servicio para mapeo de markcoprs con tabla search_pr de nuitee.

async mapingmarkcoprs ( procestype: proces3type){
  const data = ['1111111asf', 'asdf111111111']
return data
}


async searchtextsearchtablePR(procestype: proces3type) {
  const validexistence = await this.connecttableSearchPR.find({
    where: {
      stateprovince: procestype.textsearch,
      availablemarkcoprs: false,
    },
    order: {
      id_searchhotel: "ASC",
    },
    take: procestype.quantity
    
  });
  console.log("se genera array de hoteles buscados por statename >>>>>>>>>>>>>>>>>>");
  return validexistence; 
}

async searchTAKEblePR(procestype: proces3type) {
  const validexistence = await this.connecttableSearchPR.find({
    where: {
      stateprovince: procestype.textsearch,
      availablemarkcoprs: false,
    },
    order: {
      id_searchhotel: "ASC",
    },
    take: procestype.quantity
    
  });
  console.log("se genera array de hoteles por bloques de ", procestype.quantity," >>>>>>>>>>>>>>>>>>");
  return validexistence; 
}

async validprocesmarkcorpsID(datahotel) {
  const validexistence = await this.connecttableSearchPR.findOne({
    where: {
      hotelid: datahotel.hotelid,
      availablemarkcoprs: false,
    },
  });

  console.log("se valida si id existe en la tabla search_pr >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", datahotel.hotelid);
  // console.log(validexistence)

  return !!validexistence; // Convertir a booleano, devuelve true si existe un registro, false si no existe
}


async updateflagsSearch_pr(idtable, Response, flag1, flag2, flag3, flag4) {
  // console.log(' datos a insertar ')

  console.log(idtable);
  // console.log(Response)
  let coords = Response.coords;
  const parts = coords.split(",");
  const datosbase1 = await this.connecttableSearchPR.update(
    { id_searchhotel: idtable },
    {
      markcorps_hotelid: Response.document_id,
      markcorps_name: Response.name,
      markcorps_address1: Response.details.address,
      markcorps_city: Response.details.geo_name,
      markcorps_citycode: Response.details.grandparent_id,
      markcorps_latitude: parts[0],
      markcorps_longitude: parts[1],
      availablemarkcoprs: true,

      flag_name: flag1,
      flag_addresasc: flag2,
      flag_addresdesc: flag3,
      flag_coords: flag4,
      nomach: true,

    }
  );
}

async updateFailedMarkCoprsSearch_pr(idtable, Response, flag1, flag2, flag3, flag4) {
  // console.log(' datos a insertar ')

  console.log(idtable);
  // console.log(Response)
  // let coords = Response.coords;
  // const parts = coords.split(",");
  const datosbase1 = await this.connecttableSearchPR.update(
    { id_searchhotel: idtable },
    {
      markcorps_hotelid: 0,
      markcorps_name: 'undefined',
      markcorps_address1: 'undefined',
      markcorps_city: 'undefined',
      markcorps_citycode: 0,
      markcorps_latitude: 'undefined',
      markcorps_longitude: 'undefined',
      availablemarkcoprs: true,

      flag_name: flag1,
      flag_addresasc: flag2,
      flag_addresdesc: flag3,
      flag_coords: flag4,
      nomach: false,
    }
  );
}

async searchAPIMarkCorps(infobase) {
  try {
    var url = urlproviders(1);
    console.log('<<<<<<<<<<<<<<<<<<<<<<<url>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(url);
    console.log(url + infobase.name);

    let urlname = url + infobase.name;
    const response = await axios.get(urlname);
    console.log("Respuesta obtenida:");

    const result = response.data;

    console.log('ssssssssssssssssssssssssssstatusssssssssssssssssssssssssssssssssssssssssssssssssssssss')

    console.log(response.status)

    // Insertar en la tabla independientemente del estado de la respuesta
    this.inserttable_status_Markcorps(infobase.hotelid, urlname, response);

    // Retornar el resultado si la respuesta tiene estado 200
    if (response.status == 200) {
      return result;
    } else if (response.status == 400 ) {
      // Manejar otros códigos de estado aquí
      console.log("Error: La respuesta tiene un estado diferente de 200");
      this.inserttable_status_Markcorps(infobase.hotelid, urlname, response);

      return null; // Otra acción según sea necesario
    }
  } catch (error) {
    console.log(" <<<<<<<<<<< Error en nuite Info", );
    return null; // Otra acción según sea necesario
  }
}




async procesarDatos2(infobase: any) {
  // Aquí puedes realizar cualquier operación con los datos recibidos
const test = 1

if (test == 1 ){

  let resultsearch = await this.searchAPIMarkCorps(infobase)
}else {







  console.log("nombre de Nuitee a buscar ---");
  console.log(infobase.name);
  let nombreLimpio = infobase.name.replace(/[\/?$()*,]/g, " ");


  let rule1 = 0;
  let rule2 = 0;
  let rule3 = 0;
  let rule4 = 0;
  let rulesMatched = 0;

  let urlarm = `https://api.makcorps.com/mapping?api_key=65a775f34bdc1a8110980186&name=${nombreLimpio}`

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: urlarm,
    headers: {},
  };

  axios
    .request(config)
    .then(async (response) => {
      const statuspetition = response.status;
      console.log("<<<<<<<<<<<<<<<<<<<<statuspetition>>>>>>>>>>>>>>>>>>>>");


      this.inserttable_status_Markcorps(infobase.hotelid, urlarm, response);

      console.log("<<<<<<<<<<<<<<<<<<<< se guarda status de petición >>>>>>>>>>>>>>>>>>>>");


     

      const responseJson = response.data;

      /// regla 1
      let index = 0;
      for (const item of responseJson) {
        console.log(
          "                                                                        "
        );
        console.log("comparación regla ");

        let name_a_buscar = infobase.name;
        let name_en_donde_busca = item.name;
        let name_a_buscar_lower = name_a_buscar.toLowerCase();
        let name_en_donde_busca_lower = name_en_donde_busca.toLowerCase();

        let addresnuitee = infobase.address1;

        let addresMarkcorps = item.details.address
          ? item.details.address
          : "0000 0000";
        let splitNuitee = addresnuitee.split(" ");
        let splitMarkcorps = addresMarkcorps.split(" ");

        let coordinates = item.coords ? item.coords : "0000, 0000";
        let coords = coordinates.split(",");

        let latitudMarkcorps = parseFloat(coords[0]);
        let longitudMarkcorps = parseFloat(coords[1]);
        let latitudMarkcorps2 = coords[0];
        let longitudMarkcorps2 = coords[1];

        // Reiniciar el contador de reglas coincidentes para esta iteración
        rulesMatched = 0;

        console.log("-----------------------------------------------");

        console.log("comparación regla 1 ");
        console.log(infobase.name);
        console.log(item.name);
        console.log("-----------------------------------------------");

        console.log("----------------------------------------------------------------");

        console.log("valores regla dos ");
        console.log(splitNuitee[0]);
        console.log(splitMarkcorps[0]);
        console.log(item.details.address);
        console.log("----------------------------------------------------------------");

        console.log("--------------------------------------------------------------------------------");
        console.log("valores regla 3 ");
        console.log(splitNuitee[0]);
        console.log(splitMarkcorps[splitMarkcorps.length - 1]);
        console.log("--------------------------------------------------------------------------------");

        console.log("------------------------------------------------------------------------------------------");

        console.log("coordenadas nuitee");
        console.log(infobase.latitude);
        console.log(infobase.longitude);

        console.log("coordenadas markcorps");
        console.log(latitudMarkcorps);
        console.log(longitudMarkcorps);
        console.log("------------------------------------------------------------------------------------------");


        let nuiteeLatitud = infobase.latitude.substring(0, 5);
        let nuiteeLongitud = infobase.longitude.substring(0, 6);
        let markcorpslatitud = coords[0].substring(0, 5);
        let markcorpslongitud = coords[1].substring(0, 6);

        //primera regla

        if (name_en_donde_busca_lower.includes(name_a_buscar_lower)) {
          rule1 = 1;

          console.log("verdadero primera regla");
          // await this.updateTabMatch(infobase.id_machinfo, item, 1);
        } else {
          console.log("falso en primera regla");
        }
        //primera regla

        //segunda regla
        if (splitNuitee[0] == splitMarkcorps[0]) {
          rule2 = 1;
          //await this.updateTabMatch(infobase.id_machinfo, item, 2);

          console.log("verdadero segunda regla");
        } else {
          console.log("falso segunda regla");
        }
        //segunda regla

        //tercera regla
        if (splitNuitee[0] == splitMarkcorps[splitMarkcorps.length - 1]) {
          rule3 = 1;
          //await this.updateTabMatch(infobase.id_machinfo, item, 3);

          console.log("verdadero tercera rega");
        } else {
          console.log("falso tercera regla");
        }
        //tercera regla

        //cuarta regla
        if (
          nuiteeLatitud == markcorpslatitud &&
          nuiteeLongitud == markcorpslongitud
        ) {
          console.log("verdadero en cuarta regla");

          rule4 = 1;
          // await this.updateTabMatch(infobase.id_machinfo, item, 4);
        } else {
          console.log("falso cuarta regla");
        }

        //cuarta regla

        console.log("rulesMatched");
        console.log(rulesMatched);

        rulesMatched = rule1 + rule2 + rule3 + rule4;
        // Si se cumple más de una regla, imprimir el mensaje
        if (rulesMatched >= 2) {
          console.log("Más de dos reglas coinciden");
          console.log(`Reglas coincidentes en esta iteración: ${rulesMatched}`);
          index++;
          console.log("<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>> " +index);
          
          await this.updateflagsSearch_pr(
            infobase.id_searchhotel,
            item,
            rule1,
            rule2,
            rule3,
            rule4
          );

          break;
        } else {
          console.log(
            "<<<<<<<<<<<<<<<<<<<<<<< error >>>>>>>>>>>>>>>>>>>>>>> "
          );
          console.log(
            `Reglas coincidentes en esta iteración: ${rulesMatched}`
          );
          index++;
          console.log(
            "<<<<<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>>>>> " +
              index
          );

          // Actualización sin coincidencias en markcorps
          await this.updateFailedMarkCoprsSearch_pr(
            infobase.id_searchhotel,
            item,
            rule1,
            rule2,
            rule3,
            rule4
          );


        }
      }
    })
    .catch((error) => {
      console.log(
        "error en busqueda con nombre de hotel",
        infobase.name,
        infobase.id_searchhotel
      );
      console.log("id tabla infomach", infobase.id_searchhotel);

      // console.log(error);

      // this.inserttable_status_Markcorps(infobase.hotelid, urlarm, response);

    });

  }
}


}
