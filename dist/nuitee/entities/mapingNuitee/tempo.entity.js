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
Object.defineProperty(exports, "__esModule", { value: true });
exports.entititemp = void 0;
const typeorm_1 = require("typeorm");
let entititemp = class entititemp extends typeorm_1.BaseEntity {
};
exports.entititemp = entititemp;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], entititemp.prototype, "id_tem", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], entititemp.prototype, "property_ids_expanded", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: () => "true" }),
    __metadata("design:type", Boolean)
], entititemp.prototype, "available", void 0);
exports.entititemp = entititemp = __decorate([
    (0, typeorm_1.Entity)({
        name: "tem_registros",
    })
], entititemp);
//# sourceMappingURL=tempo.entity.js.map