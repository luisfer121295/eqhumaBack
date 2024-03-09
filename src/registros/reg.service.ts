import axios from "axios";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { entitiregs } from './entity/reg.entity';
import { regtype } from './reg_types';


@Injectable()
export class registerservice {
  constructor(
    @InjectRepository(entitiregs)
    private readonly setinforeg: Repository<entitiregs>,
   

  ) {}

  async CodeInfo(code) {

    console.log('valor ingresado: ')
    console.log(code);
    const datosbase1 = await this.setinforeg.find({
      where: {
        id_rclient: code,
      },
    });
    console.log(
      "<<<<<<<<<<<<<<<<<<<<<<<<<<<<info reg>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    console.log(datosbase1);

    return datosbase1;
  }


  async insertreg(regtype: regtype) {
      const inserttablePointInteres = this.setinforeg.create({

        registros1: regtype.registros1,
        sectiontype: regtype.sectiontype,
      });
      await inserttablePointInteres.save();

      return inserttablePointInteres
   
  }

}
