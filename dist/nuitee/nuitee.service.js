"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NuiteeService = void 0;
const axios_1 = require("axios");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const nuitee1_entity_1 = require("./entities/general/nuitee1.entity");
const fs = require("fs");
const readline = require("readline");
const lista_1 = require("./lista");
const nuitee_country_entity_1 = require("./entities/general/nuitee_country.entity");
const nuitee_point_of_interest_entity_1 = require("./entities/general/nuitee_point_of_interest.entity");
const nuitee_continent_entity_1 = require("./entities/general/nuitee_continent.entity");
const nuitee_descendants_entity_1 = require("./entities/general/nuitee_descendants.entity");
const nuitee_property_ids_expanded_entity_1 = require("./entities/general/nuitee_property_ids_expanded.entity");
const nuitee_property_ids_entity_1 = require("./entities/general/nuitee_property_ids.entity");
const nuitee_categories_entity_1 = require("./entities/general/nuitee_categories.entity");
const nuitee_tags_entity_1 = require("./entities/general/nuitee_tags.entity");
const nuitee_search_1 = require("./entities/mapingNuitee/nuitee_search");
const nuitee_search_status_entity_1 = require("./entities/mapingNuitee/nuitee_search_status.entity");
const search_attributeses_entity_1 = require("./entities/mapingNuitee/search_attributeses.entity");
const search_hotelimages_entity_1 = require("./entities/mapingNuitee/search_hotelimages.entity");
const search_rooms_entity_1 = require("./entities/general/search_rooms.entity");
const mach_hotels_entity_1 = require("./entities/general/mach_hotels.entity");
const Urls_1 = require("../Utils/Urls");
const table_searchNuitee_entity_1 = require("./entities/mapingNuitee/table_searchNuitee.entity");
const tempo_entity_1 = require("./entities/mapingNuitee/tempo.entity");
const path = require("path");
const appRootPath = require("app-root-path");
let NuiteeService = class NuiteeService {
    constructor(setnuitee, setentitiCountry, setentitipoint_of_interest, setentiticontinent, setentitidescendants, setentitiproperty_ids_expanded, setentitiproperty_ids, setentiticategories, setentititags, setentitiSearch, setentitiStatus, setentitiAtributes, setentitiHotelImages, setentitiInfoRooms, connecttableSearchPR, setentitiMachInfoHotels, setentitiTemp) {
        this.setnuitee = setnuitee;
        this.setentitiCountry = setentitiCountry;
        this.setentitipoint_of_interest = setentitipoint_of_interest;
        this.setentiticontinent = setentiticontinent;
        this.setentitidescendants = setentitidescendants;
        this.setentitiproperty_ids_expanded = setentitiproperty_ids_expanded;
        this.setentitiproperty_ids = setentitiproperty_ids;
        this.setentiticategories = setentiticategories;
        this.setentititags = setentititags;
        this.setentitiSearch = setentitiSearch;
        this.setentitiStatus = setentitiStatus;
        this.setentitiAtributes = setentitiAtributes;
        this.setentitiHotelImages = setentitiHotelImages;
        this.setentitiInfoRooms = setentitiInfoRooms;
        this.connecttableSearchPR = connecttableSearchPR;
        this.setentitiMachInfoHotels = setentitiMachInfoHotels;
        this.setentitiTemp = setentitiTemp;
    }
    async CodeInfo(code) {
        try {
            const result = await this.setnuitee.find({
                where: {
                    codename: code,
                },
            });
            if (result.length != 0) {
                return result;
            }
            else {
                return [{ error: "No se encontraron resultados" }];
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async CodeUpdate(idcode, iduser) {
        try {
            const datosbase1 = await this.setnuitee.update({ id_code: idcode }, {
                idusuariocanje: iduser,
                fechacanje: () => "CURRENT_TIMESTAMP",
            });
            if (datosbase1.affected > 0) {
                return [{ data: "redeem code update" }];
            }
            else {
                return [{ error: "No se encontraron resultados" }];
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async readdata(idcode) {
        console.log("entro a servicio ");
        console.log(idcode);
        try {
            const countryService = new lista_1.CountryService("C:/Proyectos/ENKI/enki_back/src/nuitee/nuitee_regions.jsonl");
            const count = countryService.getCountOfElements();
            if ((await count) >= 0) {
                return [{ data: `redeem code update. Total elements: ${count}` }];
            }
            else {
                return [{ error: "Error reading or parsing the file" }];
            }
        }
        catch (error) {
            console.log(error);
            return [{ error: "Internal Server Error" }];
        }
    }
    async readData(idcode) {
        console.log("Entro al servicio con idcode:", idcode);
        const filePath = path.join(appRootPath.toString(), "./src/nuitee/prueba2.jsonl");
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity,
        });
        let block = [];
        let lineNumber = 0;
        let totalLines = 0;
        let coordinatesArray = [];
        let pointOfInterestArray = [];
        let ancestorsArray = [];
        let descendantsArray = [];
        let property_ids_expandedArray = [];
        let property_idsArray = [];
        let categoriesArray = [];
        let tagsArray = [];
        try {
            for await (const line of rl) {
                try {
                    const data = JSON.parse(line);
                    console.log("valor para insertar de linea <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    console.log();
                    pointOfInterestArray =
                        data["associations"]["point_of_interest"] || [];
                    ancestorsArray = data["ancestors"] || [];
                    descendantsArray = data["descendants"]?.["province_state"] || [];
                    property_ids_expandedArray = data["property_ids_expanded"] || [];
                    property_idsArray = data["property_ids"] || [];
                    categoriesArray = data["categories"] || [];
                    tagsArray = data["tags"] || [];
                    console.log("center_longitude", data["coordinates"]["center_longitude"]);
                    console.log("center_latitude", data["coordinates"]["center_latitude"]);
                    console.log("pointOfInterestArray", pointOfInterestArray.length || 0);
                    console.log("ancestorsArray", ancestorsArray.length || 0);
                    console.log("descendantsArray", descendantsArray.length || 0);
                    console.log("property_ids_expandedArray", property_ids_expandedArray.length || "0");
                    console.log("property_idsArray", property_idsArray.length || 0);
                    console.log("categoriesArray", categoriesArray.length || 0);
                    console.log("tagsArray", tagsArray.length || 0);
                    const inserttable1 = this.setentitiCountry.create({
                        id: data["id"],
                        type: data["type"],
                        name: data["name_full"],
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
                        const inserttablePointInteres = this.setentitipoint_of_interest.create({
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
                        const inserttablepropertyext = this.setentitiproperty_ids_expanded.create({
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
                    block.push(data);
                    lineNumber++;
                    totalLines++;
                    console.log("linea procesada ");
                    console.log(lineNumber);
                    if (lineNumber === 500) {
                        await this.processBlock(idcode, block);
                        block = [];
                        lineNumber = 0;
                    }
                }
                catch (jsonError) {
                    console.error(`Error parsing JSON at line ${lineNumber}:`, jsonError);
                }
            }
            if (block.length > 0) {
                await this.processBlock(idcode, block);
            }
            return { totalLines };
        }
        catch (error) {
            console.error("Error al leer el archivo:", error);
            throw error;
        }
    }
    async processBlock(idcode, block) {
    }
    async readDataNew(idcode) {
        console.log("Entro al servicio con idcode:", idcode);
        const filePath = path.join(appRootPath.toString(), "./src/nuitee/listenmissing2.jsonl");
        const startLine = 5;
        const linesPerSection = 100;
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity,
        });
        let currentLine = 1;
        let arrayData = [];
        const readSection = () => {
            return new Promise((resolve, reject) => {
                rl.on("line", (line) => {
                    if (currentLine >= idcode) {
                        try {
                            const jsonArray = JSON.parse(line);
                            arrayData.push(jsonArray);
                        }
                        catch (error) {
                            console.error("Invalid JSON!");
                            console.error(`Error: ${error.message}`);
                        }
                    }
                    currentLine++;
                    if (arrayData.length >= linesPerSection) {
                        rl.removeAllListeners();
                        resolve();
                    }
                });
                rl.on("close", () => {
                    console.log("Lectura del archivo completada.");
                    resolve();
                });
            });
        };
        await readSection();
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
                await this.inserttablePointInteres(item.id, item.associations.point_of_interest);
            }
            if (item.ancestors.length > 0) {
                await this.inserttableContinent(item.id, item.ancestors);
            }
            if (item.property_ids_expanded.length > 0) {
                await this.inserttablepropertyext(item.id, item.property_ids_expanded);
            }
            if (item.property_ids.length > 0) {
                await this.inserttablepropertyID(item.id, item.property_ids);
            }
            if (item.categories.length > 0) {
                await this.inserttableCategories(item.id, item.categories);
            }
            if (item.tags.length > 0) {
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
            const inserttablepropertyext = this.setentitiproperty_ids_expanded.create({
                id: idpr,
                property_ids_expanded: property_ids_expanded,
                available: true,
            });
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
                associations: String((item.associations?.point_of_interest || []).length),
                ancestors: String((item.ancestors || []).length),
                descendants: String((item.descendants?.province_state || []).length),
                property_ids_expanded: String((item.property_ids_expanded || []).length),
                property_ids: String((item.property_ids || []).length),
                categories: String((item.categories || []).length),
                tags: String((item.tags || []).length),
                available: true,
            });
            promises.push(insertTable1.save());
            if (item.associations &&
                item.associations.point_of_interest &&
                item.associations.point_of_interest.length > 0) {
                promises.push(this.inserttablePointInteres(item.id, item.associations.point_of_interest));
            }
            if (item.ancestors && item.ancestors.length > 0) {
                promises.push(this.inserttableContinent(item.id, item.ancestors));
            }
            if (item.descendants &&
                item.descendants.province_state &&
                item.descendants.province_state.length > 0) {
                promises.push(this.inserttableDescendats(item.id, item.descendants.province_state));
            }
            if (item.property_ids_expanded && item.property_ids_expanded.length > 0) {
                promises.push(this.inserttablepropertyext(item.id, item.property_ids_expanded));
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
    async splitAndCreateFiles() {
        const filePath = path.join(appRootPath.toString(), "./src/nuitee/nuitee_regions.jsonl");
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
            console.log("File split completed.");
            outputStream.end();
        });
    }
    async validIDData(idcode) {
        console.log("Entro al servicio con idcode:", idcode);
        const filePath = path.join(appRootPath.toString(), "./src/nuitee/nuevo.jsonl");
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity,
        });
        let lineNumber = 0;
        let totalLines = 0;
        let idsmissing = [];
        function writeMissingLine(line) {
            fs.appendFileSync("./listenmissing.jsonl", `${line}\n`);
        }
        try {
            for await (const line of rl) {
                try {
                    const data = JSON.parse(line);
                    const datosbase1 = await this.setentitiCountry.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (!datosbase1) {
                        writeMissingLine(line);
                        idsmissing.push(data.id);
                    }
                    lineNumber++;
                    totalLines++;
                    console.log("linea procesada ");
                    console.log(lineNumber);
                }
                catch (jsonError) {
                    console.error(`Error parsing JSON at line ${lineNumber}:`, jsonError);
                }
            }
            return { totalLines };
        }
        catch (error) {
            console.error("Error al leer el archivo:", error);
            throw error;
        }
    }
    async readnuitee(idNuitee) {
        console.log("valor ingresado para busqueda de nuitee");
        console.log(idNuitee);
        const datosbase1 = await this.setentitiCountry.find({
            where: {
                name: "Tampa, Florida, United States of America",
            },
        });
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<info location>>>>>>>>>>>>>>>>>>>>>>>>>");
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
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos ingresados>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        const promises = [];
        try {
            const response = await axios_1.default.post("http://ws.nuitee.com/nuitee/2.0/content/hotelInfo", {
                hotelId: 118922,
            }, {
                headers: {
                    Authorization: "signature=4492c8ae2cf8cd462df354f542a5323c34110a1231a6aff88e5109e36a3eddb06986cec8670f6899daff0faf821163bebd7a991f1233fdbb31af9750cb3ac211, timestamp=1707777231",
                    "Content-Type": "application/json",
                    ApiKey: "antoniogomez",
                },
            });
            const result = response.data;
            console.log("información de busqueda. ");
            if (result["responseStatus"]["statusCode"] == 1000) {
                promises.push(this.insertableStatus(hotelcode, result["responseStatus"]));
            }
            return result;
        }
        catch (error) {
            console.log(" <<<<<<<<<<< Error en nuite Info" + error);
            return null;
        }
    }
    async setNuiteeSearch(hotelcode) {
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos ingresados>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log("hotelcode.property_ids_expande");
        console.log(hotelcode[0].property_ids_expanded);
        const promises = [];
        for (const itemids of hotelcode) {
            const promise = new Promise(async (resolve, reject) => {
                try {
                    const response = await axios_1.default.post("http://ws.nuitee.com/nuitee/2.0/content/hotelInfo", {
                        hotelId: itemids.property_ids_expanded,
                    }, {
                        headers: {
                            Authorization: "signature=4492c8ae2cf8cd462df354f542a5323c34110a1231a6aff88e5109e36a3eddb06986cec8670f6899daff0faf821163bebd7a991f1233fdbb31af9750cb3ac211, timestamp=1707777231",
                            "Content-Type": "application/json",
                            ApiKey: "antoniogomez",
                        },
                    });
                    const result = response.data;
                    if (result["responseStatus"]["statusCode"] == 1000) {
                        await this.insertTabMatch(result);
                    }
                    resolve(result);
                }
                catch (error) {
                    console.log(" <<<<<<<<<<< Error en nuite Info" + error);
                    reject(error);
                    await this.insertTabMatchFailed(itemids.property_ids_expanded);
                }
            });
            promises.push(promise);
        }
        await Promise.all(promises);
        console.log("termino<<<<<<<<<<<", hotelcode.length);
        console.log("termino<<<<<<<<<<<", hotelcode.length);
    }
    async insertableStatus(hotelID, ResponseStatus) {
        console.log("datos de ResponseStatus");
        console.log(ResponseStatus.requestAt);
        console.log(ResponseStatus.responseAt);
        console.log(ResponseStatus.statusCode);
        console.log(ResponseStatus.statusMessage);
    }
    async validinfoTabMatch(Response) {
        const inserttableStatusSearch = this.setentitiMachInfoHotels.findOne({
            where: {
                nuitee_hotelid: Response.hotelId,
            },
        });
        console.log("se valida si id existe en la tabla machinfo Nuitee >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return !!inserttableStatusSearch;
    }
    async insertTabMatch(Response) {
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
    async selectinfmach(amount) {
        const promises = [];
        const datosbasemach = await this.setentitiMachInfoHotels.find({
            where: {
                id_machinfo: 6400,
            },
            order: {
                id_machinfo: "ASC",
            },
        });
        console.log("<<<<<<<<cantidad de registros en select >>>>>>>>>>>");
        console.log(datosbasemach.length);
        let procesdata = await this.readtableTempo(amount);
        console.log('información de tabla temporal <<<<<<<<<<<<<<<');
        console.log(procesdata);
    }
    async procesarDatos(infobase) {
        console.log("nombre de Nuitee a buscar ---");
        console.log(infobase.name);
        let nombreLimpio = infobase.name.replace(/[\/?$()*,]/g, " ");
        let rule1 = 0;
        let rule2 = 0;
        let rule3 = 0;
        let rule4 = 0;
        let rulesMatched = 0;
        let urlarm = `https://api.makcorps.com/mapping?api_key=65a775f34bdc1a8110980186&name=${nombreLimpio}`;
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: urlarm,
            headers: {},
        };
        axios_1.default
            .request(config)
            .then(async (response) => {
            const statuspetition = response.status;
            console.log("<<<<<<<<<<<<<<<<<<<<statuspetition>>>>>>>>>>>>>>>>>>>>");
            this.inserttable_status_Markcorps(infobase.hotelid, urlarm, response);
            console.log("<<<<<<<<<<<<<<<<<<<< se guarda status de petición >>>>>>>>>>>>>>>>>>>>");
            const responseJson = response.data;
            let index = 0;
            for (const item of responseJson) {
                console.log("                                                                        ");
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
                if (name_en_donde_busca_lower.includes(name_a_buscar_lower)) {
                    rule1 = 1;
                    console.log("verdadero primera regla");
                }
                else {
                    console.log("falso en primera regla");
                }
                if (splitNuitee[0] == splitMarkcorps[0]) {
                    rule2 = 1;
                    console.log("verdadero segunda regla");
                }
                else {
                    console.log("falso segunda regla");
                }
                if (splitNuitee[0] == splitMarkcorps[splitMarkcorps.length - 1]) {
                    rule3 = 1;
                    console.log("verdadero tercera rega");
                }
                else {
                    console.log("falso tercera regla");
                }
                if (nuiteeLatitud == markcorpslatitud &&
                    nuiteeLongitud == markcorpslongitud) {
                    console.log("verdadero en cuarta regla");
                    rule4 = 1;
                }
                else {
                    console.log("falso cuarta regla");
                }
                console.log("rulesMatched");
                console.log(rulesMatched);
                rulesMatched = rule1 + rule2 + rule3 + rule4;
                if (rulesMatched >= 2) {
                    console.log("Más de dos reglas coinciden");
                    console.log(`Reglas coincidentes en esta iteración: ${rulesMatched}`);
                    index++;
                    console.log("<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>> " + index);
                    await this.updateflagsSearch_pr(infobase.id_searchhotel, item, rule1, rule2, rule3, rule4);
                    break;
                }
                else {
                    console.log("<<<<<<<<<<<<<<<<<<<<<<< error >>>>>>>>>>>>>>>>>>>>>>> ");
                    console.log(`Reglas coincidentes en esta iteración: ${rulesMatched}`);
                    index++;
                    console.log("<<<<<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>>>>> " +
                        index);
                    await this.updateFailedMarkCoprsSearch_pr(infobase.id_searchhotel, item, rule1, rule2, rule3, rule4);
                }
            }
        })
            .catch((error) => {
            console.log("error en busqueda con nombre de hotel", infobase.name, infobase.id_searchhotel);
            console.log("id tabla infomach", infobase.id_searchhotel);
        });
    }
    async updateTabMatch(idtable, Response, flag1, flag2, flag3, flag4) {
        console.log(idtable);
        let coords = Response.coords;
        const parts = coords.split(",");
        const datosbase1 = await this.setentitiMachInfoHotels.update({ id_machinfo: idtable }, {
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
        });
    }
    async validarCoordenadas(coordenada1, coordenada2) {
        let coordenadas1 = coordenada1.toString().split(".");
        let coordenadas2 = coordenada2.toString().split(".");
        if (coordenadas1.length !== 2 || coordenadas2.length !== 2) {
            return false;
        }
        if (coordenadas1[1].slice(0, 2) !== coordenadas2[1].slice(0, 2)) {
            return false;
        }
        let tercerDigito1 = parseInt(coordenadas1[1].charAt(2));
        let tercerDigito2 = parseInt(coordenadas2[1].charAt(2));
        if (tercerDigito1 < 3 ||
            tercerDigito1 > 9 ||
            tercerDigito2 < 3 ||
            tercerDigito2 > 9) {
            return false;
        }
        return true;
    }
    async searchHotels(amount) {
        const datosbasemach = await this.readInfopropertys(amount);
        for (const idhotel of datosbasemach) {
            const validaexistenceID = await this.validexistenceID(idhotel.property_ids_expanded);
            if (validaexistenceID == false) {
                const infohotel = await this.searchApiNuitee(idhotel.property_ids_expanded);
                this.inserttable_search_pr(idhotel.property_ids_expanded, infohotel);
            }
            else {
                console.log("registro exsitente, se salta id ", idhotel.property_ids_expanded);
            }
        }
    }
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
    async validexistenceID(idhotel) {
        const validexistence = await this.connecttableSearchPR.findOne({
            where: {
                hotelid: idhotel,
            },
        });
        console.log("se valida si id existe en la tabla search_pr >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", idhotel);
        return !!validexistence;
    }
    async searchApiNuitee(idhotel) {
        var url = (0, Urls_1.urlproviders)(0);
        try {
            const response = await axios_1.default.post(url, {
                hotelId: idhotel,
            }, {
                headers: {
                    Authorization: "signature=4492c8ae2cf8cd462df354f542a5323c34110a1231a6aff88e5109e36a3eddb06986cec8670f6899daff0faf821163bebd7a991f1233fdbb31af9750cb3ac211, timestamp=1707777231",
                    "Content-Type": "application/json",
                    ApiKey: "antoniogomez",
                },
            });
            const result = response.data;
            this.inserttable_search_status(idhotel, url, result.responseStatus);
            if (result["responseStatus"]["statusCode"] == 1000) {
                return result;
            }
        }
        catch (error) {
            console.log(" <<<<<<<<<<< Error en nuite Info" + error);
        }
    }
    async inserttable_search_status(idhotel, url, resultStatus) {
        console.log("resultStatus<<<<<<<<<<<<<<<<<<<");
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
        const promisesRooms = [];
        const promisesImages = [];
        console.log("Procesando rooms");
        for (const datarooms of roomsinfo) {
            promisesRooms.push(this.inserttable_search_roomsinfo(hoteli, datasearch, datarooms));
        }
        console.log("Procesando imagenes");
        for (const dataimageshotel of hotelimages) {
            promisesImages.push(this.inserttable_search_hotelimages(hoteli, datasearch, dataimageshotel));
        }
        await Promise.all([...promisesRooms, ...promisesImages]);
        await inserttableStatusSearch.save();
        await this.updatestatus_table_temporal(hoteli);
        return inserttableStatusSearch;
    }
    async inserttable_search_roomsinfo(idhotel, datasearch, roomsinfo) {
        const inserttableStatusSearch = this.setentitiInfoRooms.create({
            hotelid: idhotel,
            name: datasearch.name,
            address1: datasearch.address1,
            address2: datasearch.address2,
            city: datasearch.city,
            roomcode: roomsinfo.roomCode,
            roomname: roomsinfo.roomName
        });
        await inserttableStatusSearch.save();
    }
    async inserttable_search_hotelimages(idhotel, datasearch, hotelimages) {
        const inserttableStatusSearch = this.setentitiHotelImages.create({
            hotelid: idhotel,
            name: datasearch.name,
            url: hotelimages.url,
            thumbnailurl: hotelimages.thumbnailUrl,
            caption: hotelimages.caption,
            ordern: hotelimages.order,
            defaultimage: hotelimages.defaultImage
        });
        await inserttableStatusSearch.save();
    }
    async updatestatus_ids_expanded(idhotel) {
        console.log('entro a actualizar banderas de id´s duplicados..................');
        const datosbase1 = await this.setentitiproperty_ids_expanded.update({ property_ids_expanded: idhotel }, {
            available: false,
        });
        console.log(`Registros guardados con éxito para el hotel ${idhotel}`, ': cantidad duplicada', datosbase1.affected);
    }
    async updatestatus_table_temporal(idhotel) {
        console.log('entro a actualizar banderas de id´s duplicados..................');
        const datosbase1 = await this.setentitiTemp.update({ property_ids_expanded: idhotel }, {
            available: false,
        });
        console.log(`Registros guardados con éxito para el hotel ${idhotel}`, ': cantidad duplicada', datosbase1.affected);
    }
    async processHotelsRecursively(amount) {
        const datosbasemach = await this.readInfopropertys(amount);
        await Promise.all(datosbasemach.map(async (idhotel) => {
            const validaexistenceID = await this.validexistenceID(idhotel.property_ids_expanded);
            if (!validaexistenceID) {
                const infohotel = await this.searchApiNuitee(idhotel.property_ids_expanded);
                this.inserttable_search_pr(idhotel.property_ids_expanded, infohotel);
            }
            else {
                console.log("Registro existente, se salta id ", idhotel.property_ids_expanded);
            }
        }));
        const remainingAmount = amount - datosbasemach.length;
        if (remainingAmount > 0) {
            await this.processHotelsRecursively.call(this, remainingAmount);
        }
    }
    async searchHotels2(amount) {
        let idexitosos = 0;
        let idfail = 0;
        let registroActual = 0;
        const errores = [];
        try {
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
                    }
                    else {
                        console.log(`Registro existente, se salta ID: ${idhotel.property_ids_expanded}`);
                        console.log('se actualiza estatus en tabla temporal para reducir busqueda ');
                        await this.updatestatus_table_temporal(idhotel.property_ids_expanded);
                        idfail++;
                    }
                }
                catch (error) {
                    console.error(`Error en el registro ${registroActual}: ${error.message}`);
                    errores.push(idhotel.property_ids_expanded);
                }
            }
            console.log(`Proceso completado. Registros exitosos: ${idexitosos}, Registros duplicados: ${idfail}`);
            fs.writeFileSync('errores.txt', errores.join('\n'));
            return { idexitosos, idfail };
        }
        catch (error) {
            console.error('Error durante la ejecución:', error);
            throw error;
        }
    }
    async mapingmarkcoprs(procestype) {
        const data = ['1111111asf', 'asdf111111111'];
        return data;
    }
    async searchtextsearchtablePR(procestype) {
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
    async searchTAKEblePR(procestype) {
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
        console.log("se genera array de hoteles por bloques de ", procestype.quantity, " >>>>>>>>>>>>>>>>>>");
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
        return !!validexistence;
    }
    async updateflagsSearch_pr(idtable, Response, flag1, flag2, flag3, flag4) {
        console.log(idtable);
        let coords = Response.coords;
        const parts = coords.split(",");
        const datosbase1 = await this.connecttableSearchPR.update({ id_searchhotel: idtable }, {
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
        });
    }
    async updateFailedMarkCoprsSearch_pr(idtable, Response, flag1, flag2, flag3, flag4) {
        console.log(idtable);
        const datosbase1 = await this.connecttableSearchPR.update({ id_searchhotel: idtable }, {
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
        });
    }
    async searchAPIMarkCorps(infobase) {
        try {
            var url = (0, Urls_1.urlproviders)(1);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<url>>>>>>>>>>>>>>>>>>>>>>>');
            console.log(url);
            console.log(url + infobase.name);
            let urlname = url + infobase.name;
            const response = await axios_1.default.get(urlname);
            console.log("Respuesta obtenida:");
            const result = response.data;
            console.log('ssssssssssssssssssssssssssstatusssssssssssssssssssssssssssssssssssssssssssssssssssssss');
            console.log(response.status);
            this.inserttable_status_Markcorps(infobase.hotelid, urlname, response);
            if (response.status == 200) {
                return result;
            }
            else if (response.status == 400) {
                console.log("Error: La respuesta tiene un estado diferente de 200");
                this.inserttable_status_Markcorps(infobase.hotelid, urlname, response);
                return null;
            }
        }
        catch (error) {
            console.log(" <<<<<<<<<<< Error en nuite Info");
            return null;
        }
    }
    async procesarDatos2(infobase) {
        const test = 1;
        if (test == 1) {
            let resultsearch = await this.searchAPIMarkCorps(infobase);
        }
        else {
            console.log("nombre de Nuitee a buscar ---");
            console.log(infobase.name);
            let nombreLimpio = infobase.name.replace(/[\/?$()*,]/g, " ");
            let rule1 = 0;
            let rule2 = 0;
            let rule3 = 0;
            let rule4 = 0;
            let rulesMatched = 0;
            let urlarm = `https://api.makcorps.com/mapping?api_key=65a775f34bdc1a8110980186&name=${nombreLimpio}`;
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: urlarm,
                headers: {},
            };
            axios_1.default
                .request(config)
                .then(async (response) => {
                const statuspetition = response.status;
                console.log("<<<<<<<<<<<<<<<<<<<<statuspetition>>>>>>>>>>>>>>>>>>>>");
                this.inserttable_status_Markcorps(infobase.hotelid, urlarm, response);
                console.log("<<<<<<<<<<<<<<<<<<<< se guarda status de petición >>>>>>>>>>>>>>>>>>>>");
                const responseJson = response.data;
                let index = 0;
                for (const item of responseJson) {
                    console.log("                                                                        ");
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
                    if (name_en_donde_busca_lower.includes(name_a_buscar_lower)) {
                        rule1 = 1;
                        console.log("verdadero primera regla");
                    }
                    else {
                        console.log("falso en primera regla");
                    }
                    if (splitNuitee[0] == splitMarkcorps[0]) {
                        rule2 = 1;
                        console.log("verdadero segunda regla");
                    }
                    else {
                        console.log("falso segunda regla");
                    }
                    if (splitNuitee[0] == splitMarkcorps[splitMarkcorps.length - 1]) {
                        rule3 = 1;
                        console.log("verdadero tercera rega");
                    }
                    else {
                        console.log("falso tercera regla");
                    }
                    if (nuiteeLatitud == markcorpslatitud &&
                        nuiteeLongitud == markcorpslongitud) {
                        console.log("verdadero en cuarta regla");
                        rule4 = 1;
                    }
                    else {
                        console.log("falso cuarta regla");
                    }
                    console.log("rulesMatched");
                    console.log(rulesMatched);
                    rulesMatched = rule1 + rule2 + rule3 + rule4;
                    if (rulesMatched >= 2) {
                        console.log("Más de dos reglas coinciden");
                        console.log(`Reglas coincidentes en esta iteración: ${rulesMatched}`);
                        index++;
                        console.log("<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>> " + index);
                        await this.updateflagsSearch_pr(infobase.id_searchhotel, item, rule1, rule2, rule3, rule4);
                        break;
                    }
                    else {
                        console.log("<<<<<<<<<<<<<<<<<<<<<<< error >>>>>>>>>>>>>>>>>>>>>>> ");
                        console.log(`Reglas coincidentes en esta iteración: ${rulesMatched}`);
                        index++;
                        console.log("<<<<<<<<<<<<<<<<<<<<<<< termino una interacion  >>>>>>>>>>>>>>>>>>>>>>> " +
                            index);
                        await this.updateFailedMarkCoprsSearch_pr(infobase.id_searchhotel, item, rule1, rule2, rule3, rule4);
                    }
                }
            })
                .catch((error) => {
                console.log("error en busqueda con nombre de hotel", infobase.name, infobase.id_searchhotel);
                console.log("id tabla infomach", infobase.id_searchhotel);
            });
        }
    }
};
exports.NuiteeService = NuiteeService;
exports.NuiteeService = NuiteeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(nuitee1_entity_1.infojsonNuitee)),
    __param(1, (0, typeorm_2.InjectRepository)(nuitee_country_entity_1.entitiCountry)),
    __param(2, (0, typeorm_2.InjectRepository)(nuitee_point_of_interest_entity_1.entitipoint_of_interest)),
    __param(3, (0, typeorm_2.InjectRepository)(nuitee_continent_entity_1.entiticontinent)),
    __param(4, (0, typeorm_2.InjectRepository)(nuitee_descendants_entity_1.entitidescendants)),
    __param(5, (0, typeorm_2.InjectRepository)(nuitee_property_ids_expanded_entity_1.entitiproperty_ids_expanded)),
    __param(6, (0, typeorm_2.InjectRepository)(nuitee_property_ids_entity_1.entitiproperty_ids)),
    __param(7, (0, typeorm_2.InjectRepository)(nuitee_categories_entity_1.entiticategories)),
    __param(8, (0, typeorm_2.InjectRepository)(nuitee_tags_entity_1.entititags)),
    __param(9, (0, typeorm_2.InjectRepository)(nuitee_search_1.entitiSearchPR)),
    __param(10, (0, typeorm_2.InjectRepository)(nuitee_search_status_entity_1.entitiStatus)),
    __param(11, (0, typeorm_2.InjectRepository)(search_attributeses_entity_1.entitiAtributes)),
    __param(12, (0, typeorm_2.InjectRepository)(search_hotelimages_entity_1.entitiHotelImages)),
    __param(13, (0, typeorm_2.InjectRepository)(search_rooms_entity_1.entitiInfoRooms)),
    __param(14, (0, typeorm_2.InjectRepository)(table_searchNuitee_entity_1.tableSearchPR)),
    __param(15, (0, typeorm_2.InjectRepository)(mach_hotels_entity_1.entitiMachInfoHotels)),
    __param(16, (0, typeorm_2.InjectRepository)(tempo_entity_1.entititemp)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], NuiteeService);
//# sourceMappingURL=nuitee.service.js.map