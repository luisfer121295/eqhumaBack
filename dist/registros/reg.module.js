"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRegModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reg_entity_1 = require("./entity/reg.entity");
const reg_service_1 = require("./reg.service");
const reg_controller_1 = require("./reg.controller");
let InfoRegModule = class InfoRegModule {
};
exports.InfoRegModule = InfoRegModule;
exports.InfoRegModule = InfoRegModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reg_entity_1.entitiregs
            ]),],
        providers: [reg_service_1.registerservice],
        exports: [reg_service_1.registerservice],
        controllers: [reg_controller_1.RegController],
    })
], InfoRegModule);
//# sourceMappingURL=reg.module.js.map