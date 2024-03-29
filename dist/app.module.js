"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nuitee_module_1 = require("./nuitee/nuitee.module");
const reg_module_1 = require("./registros/reg.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [nuitee_module_1.InfoNuiteeModule, reg_module_1.InfoRegModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'bdpostgrest.postgres.database.azure.com',
                port: 5432,
                username: 'apiuser',
                password: 'elS3n0R3S!*a',
                database: 'mibdaz',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                ssl: true,
                extra: {
                    ssl: {
                        rejectUnauthorized: false,
                    },
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map