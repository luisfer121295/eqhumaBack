import { Repository } from "typeorm";
import { infojsonNuitee } from "./entities/general/nuitee1.entity";
import { entitiCountry } from "./entities/general/nuitee_country.entity";
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
import { tableSearchPR } from "./entities/mapingNuitee/table_searchNuitee.entity";
import { ResponseStatus, Response } from "./types/search.types";
import { entititemp } from "./entities/mapingNuitee/tempo.entity";
import { proces3type } from "./nuitee_types";
export declare class NuiteeService {
    private readonly setnuitee;
    private readonly setentitiCountry;
    private readonly setentitipoint_of_interest;
    private readonly setentiticontinent;
    private readonly setentitidescendants;
    private readonly setentitiproperty_ids_expanded;
    private readonly setentitiproperty_ids;
    private readonly setentiticategories;
    private readonly setentititags;
    private readonly setentitiSearch;
    private readonly setentitiStatus;
    private readonly setentitiAtributes;
    private readonly setentitiHotelImages;
    private readonly setentitiInfoRooms;
    private readonly connecttableSearchPR;
    private readonly setentitiMachInfoHotels;
    private readonly setentitiTemp;
    constructor(setnuitee: Repository<infojsonNuitee>, setentitiCountry: Repository<entitiCountry>, setentitipoint_of_interest: Repository<entitipoint_of_interest>, setentiticontinent: Repository<entiticontinent>, setentitidescendants: Repository<entitidescendants>, setentitiproperty_ids_expanded: Repository<entitiproperty_ids_expanded>, setentitiproperty_ids: Repository<entitiproperty_ids>, setentiticategories: Repository<entiticategories>, setentititags: Repository<entititags>, setentitiSearch: Repository<entitiSearchPR>, setentitiStatus: Repository<entitiStatus>, setentitiAtributes: Repository<entitiAtributes>, setentitiHotelImages: Repository<entitiHotelImages>, setentitiInfoRooms: Repository<entitiInfoRooms>, connecttableSearchPR: Repository<tableSearchPR>, setentitiMachInfoHotels: Repository<entitiMachInfoHotels>, setentitiTemp: Repository<entititemp>);
    CodeInfo(code: any): Promise<infojsonNuitee[] | {
        error: string;
    }[]>;
    CodeUpdate(idcode: any, iduser: any): Promise<{
        data: string;
    }[] | {
        error: string;
    }[]>;
    readdata(idcode: any): Promise<{
        data: string;
    }[] | {
        error: string;
    }[]>;
    readData(idcode: string): Promise<{
        totalLines: number;
    }>;
    processBlock(idcode: string, block: any[]): Promise<void>;
    readDataNew(idcode: number): Promise<{
        totalLines: number;
        arrayData: any[];
    }>;
    saveDataToDatabase(data: any): Promise<{
        totalItemsProcessed: number;
    }>;
    inserttablePointInteres(idpr: any, data: any): Promise<void>;
    inserttableContinent(idpr: any, data: any): Promise<void>;
    inserttablepropertyext(idpr: any, data: any): Promise<void>;
    inserttablepropertyID(idpr: any, data: any): Promise<void>;
    inserttableCategories(idpr: any, data: any): Promise<void>;
    inserttableTags(idpr: any, data: any): Promise<void>;
    inserttableDescendats(idpr: any, data: any): Promise<void>;
    saveDataToDatabase3(data: any): Promise<{
        totalItemsProcessed: number;
    }>;
    splitAndCreateFiles(): Promise<void>;
    validIDData(idcode: string): Promise<{
        totalLines: number;
    }>;
    readnuitee(idNuitee: any): Promise<entitiCountry[]>;
    readnuiteePropertyIdsExp(idNuitee: any): Promise<number>;
    setinfoIDnuitee(hotelcode: any): Promise<any>;
    setNuiteeSearch(hotelcode: any): Promise<void>;
    insertableStatus(hotelID: any, ResponseStatus: ResponseStatus): Promise<void>;
    validinfoTabMatch(Response: Response): Promise<boolean>;
    insertTabMatch(Response: Response): Promise<void>;
    insertTabMatchFailed(hotelcode: any): Promise<void>;
    selectinfmach(amount: any): Promise<void>;
    procesarDatos(infobase: any): Promise<void>;
    updateTabMatch(idtable: any, Response: any, flag1: any, flag2: any, flag3: any, flag4: any): Promise<void>;
    validarCoordenadas(coordenada1: any, coordenada2: any): Promise<boolean>;
    searchHotels(amount: any): Promise<void>;
    readInfopropertys(amount: any): Promise<entitiproperty_ids_expanded[]>;
    readtableTempo(amount: any): Promise<entititemp[]>;
    validexistenceID(idhotel: any): Promise<boolean>;
    searchApiNuitee(idhotel: any): Promise<any>;
    inserttable_search_status(idhotel: any, url: any, resultStatus: any): Promise<void>;
    inserttable_status_Markcorps(idhotel: any, url: any, resultStatus: any): Promise<void>;
    inserttable_search_pr(hoteli: any, datasearch: any): Promise<tableSearchPR>;
    inserttable_search_roomsinfo(idhotel: any, datasearch: any, roomsinfo: any): Promise<void>;
    inserttable_search_hotelimages(idhotel: any, datasearch: any, hotelimages: any): Promise<void>;
    updatestatus_ids_expanded(idhotel: any): Promise<void>;
    updatestatus_table_temporal(idhotel: any): Promise<void>;
    processHotelsRecursively(amount: any): Promise<void>;
    searchHotels2(amount: any): Promise<{
        idexitosos: number;
        idfail: number;
    }>;
    mapingmarkcoprs(procestype: proces3type): Promise<string[]>;
    searchtextsearchtablePR(procestype: proces3type): Promise<tableSearchPR[]>;
    searchTAKEblePR(procestype: proces3type): Promise<tableSearchPR[]>;
    validprocesmarkcorpsID(datahotel: any): Promise<boolean>;
    updateflagsSearch_pr(idtable: any, Response: any, flag1: any, flag2: any, flag3: any, flag4: any): Promise<void>;
    updateFailedMarkCoprsSearch_pr(idtable: any, Response: any, flag1: any, flag2: any, flag3: any, flag4: any): Promise<void>;
    searchAPIMarkCorps(infobase: any): Promise<any>;
    procesarDatos2(infobase: any): Promise<void>;
}
