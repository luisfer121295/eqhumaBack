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
exports.entitiproperty_ids = void 0;
const typeorm_1 = require("typeorm");
let entitiproperty_ids = class entitiproperty_ids extends typeorm_1.BaseEntity {
    updateTimestamps() {
        this.updated_at = new Date();
    }
};
exports.entitiproperty_ids = entitiproperty_ids;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], entitiproperty_ids.prototype, "id_property_ids", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], entitiproperty_ids.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], entitiproperty_ids.prototype, "property_ids", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: () => 'true' }),
    __metadata("design:type", Boolean)
], entitiproperty_ids.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], entitiproperty_ids.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], entitiproperty_ids.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], entitiproperty_ids.prototype, "updateTimestamps", null);
exports.entitiproperty_ids = entitiproperty_ids = __decorate([
    (0, typeorm_1.Entity)({
        name: 'property_ids',
    })
], entitiproperty_ids);
//# sourceMappingURL=nuitee_property_ids.entity.js.map