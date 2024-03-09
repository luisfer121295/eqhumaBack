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
exports.RegController = void 0;
const auth_decorator_1 = require("../auth/auth.decorator");
const common_1 = require("@nestjs/common");
const reg_service_1 = require("./reg.service");
let RegController = class RegController {
    constructor(CodesListService) {
        this.CodesListService = CodesListService;
    }
    async validreg(date) {
        console.log(date);
        const result = await this.CodesListService.CodeInfo(date);
        return result;
    }
    async SearchHotels(regtype, query) {
        const counter = query?.counter || 1;
        const result = await this.CodesListService.insertreg(regtype);
        console.log('información de registros <<<<<<<<');
        console.log(result);
    }
};
exports.RegController = RegController;
__decorate([
    (0, common_1.Get)("/info"),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Query)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegController.prototype, "validreg", null);
__decorate([
    (0, common_1.Post)("/insertreg"),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RegController.prototype, "SearchHotels", null);
exports.RegController = RegController = __decorate([
    (0, common_1.Controller)("datesr"),
    __metadata("design:paramtypes", [reg_service_1.registerservice])
], RegController);
//# sourceMappingURL=reg.controller.js.map