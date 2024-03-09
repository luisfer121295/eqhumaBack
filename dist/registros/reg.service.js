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
exports.registerservice = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const reg_entity_1 = require("./entity/reg.entity");
let registerservice = class registerservice {
    constructor(setinforeg) {
        this.setinforeg = setinforeg;
    }
    async CodeInfo(code) {
        console.log('valor ingresado: ');
        console.log(code);
        const datosbase1 = await this.setinforeg.find({
            where: {
                id_rclient: code,
            },
        });
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<info reg>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(datosbase1);
        return datosbase1;
    }
    async insertreg(regtype) {
        const inserttablePointInteres = this.setinforeg.create({
            registros1: regtype.registros1,
            sectiontype: regtype.sectiontype,
        });
        await inserttablePointInteres.save();
        return inserttablePointInteres;
    }
};
exports.registerservice = registerservice;
exports.registerservice = registerservice = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(reg_entity_1.entitiregs)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], registerservice);
//# sourceMappingURL=reg.service.js.map