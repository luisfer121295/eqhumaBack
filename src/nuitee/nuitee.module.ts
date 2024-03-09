import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NuiteeService } from './nuitee.service';
import { NuiteeController } from './nuitee.controller';
import { infojsonNuitee } from './entities/general/nuitee1.entity';
import { entitiCountry } from './entities/general/nuitee_country.entity';
import { entitiCoordinates } from './entities/general/nuitee_coordinates.entity';
import { entitipoint_of_interest } from './entities/general/nuitee_point_of_interest.entity';
import { entiticontinent } from './entities/general/nuitee_continent.entity';
import { entitidescendants } from './entities/general/nuitee_descendants.entity';
import { entitiproperty_ids_expanded } from './entities/general/nuitee_property_ids_expanded.entity';
import { entitiproperty_ids } from './entities/general/nuitee_property_ids.entity';
import { entiticategories } from './entities/general/nuitee_categories.entity';
import { entititags } from './entities/general/nuitee_tags.entity';
import { entitiSearchPR } from './entities/mapingNuitee/nuitee_search';
import { entitiStatus } from './entities/mapingNuitee/nuitee_search_status.entity';
import { entitiAtributes } from './entities/mapingNuitee/search_attributeses.entity';
import { entitiHotelImages } from './entities/mapingNuitee/search_hotelimages.entity';
import { entitiInfoRooms } from './entities/general/search_rooms.entity';
import { entitiMachInfoHotels } from './entities/general/mach_hotels.entity';
import { tableSearchPR } from "./entities/mapingNuitee/table_searchNuitee.entity"
import { entititemp } from "./entities/mapingNuitee/tempo.entity";



@Module({
  imports: [ TypeOrmModule.forFeature([
    infojsonNuitee, entitiCountry, entitiCoordinates, entitipoint_of_interest, entiticontinent, entitidescendants, 
    entitiproperty_ids_expanded,entitiproperty_ids,entiticategories, entititags, 
    entitiSearchPR, entitiStatus, entitiAtributes, entitiHotelImages, entitiInfoRooms, entitiMachInfoHotels, tableSearchPR, entititemp
  ]),],
  providers: [NuiteeService],
  exports: [NuiteeService],
  controllers: [NuiteeController],
})
export class InfoNuiteeModule {}
