"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoNuiteeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nuitee_service_1 = require("./nuitee.service");
const nuitee_controller_1 = require("./nuitee.controller");
const nuitee1_entity_1 = require("./entities/general/nuitee1.entity");
const nuitee_country_entity_1 = require("./entities/general/nuitee_country.entity");
const nuitee_coordinates_entity_1 = require("./entities/general/nuitee_coordinates.entity");
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
const table_searchNuitee_entity_1 = require("./entities/mapingNuitee/table_searchNuitee.entity");
const tempo_entity_1 = require("./entities/mapingNuitee/tempo.entity");
let InfoNuiteeModule = class InfoNuiteeModule {
};
exports.InfoNuiteeModule = InfoNuiteeModule;
exports.InfoNuiteeModule = InfoNuiteeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                nuitee1_entity_1.infojsonNuitee, nuitee_country_entity_1.entitiCountry, nuitee_coordinates_entity_1.entitiCoordinates, nuitee_point_of_interest_entity_1.entitipoint_of_interest, nuitee_continent_entity_1.entiticontinent, nuitee_descendants_entity_1.entitidescendants,
                nuitee_property_ids_expanded_entity_1.entitiproperty_ids_expanded, nuitee_property_ids_entity_1.entitiproperty_ids, nuitee_categories_entity_1.entiticategories, nuitee_tags_entity_1.entititags,
                nuitee_search_1.entitiSearchPR, nuitee_search_status_entity_1.entitiStatus, search_attributeses_entity_1.entitiAtributes, search_hotelimages_entity_1.entitiHotelImages, search_rooms_entity_1.entitiInfoRooms, mach_hotels_entity_1.entitiMachInfoHotels, table_searchNuitee_entity_1.tableSearchPR, tempo_entity_1.entititemp
            ]),],
        providers: [nuitee_service_1.NuiteeService],
        exports: [nuitee_service_1.NuiteeService],
        controllers: [nuitee_controller_1.NuiteeController],
    })
], InfoNuiteeModule);
//# sourceMappingURL=nuitee.module.js.map