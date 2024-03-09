import { Public } from "src/auth/auth.decorator";

import { Controller, Get, Query, Post, Body } from "@nestjs/common";
import { registerservice } from "./reg.service";
import { regtype } from "./reg_types";

@Controller("datesr")
export class RegController {
  constructor(private CodesListService: registerservice) {}

  @Get("/info")
  @Public()
  public async validreg(@Query("date") date): Promise<any[]> {
    console.log(date);
    
      const result = await this.CodesListService.CodeInfo(date);
      return result;
    
  }

  @Post("/insertreg")
  @Public()
  public async SearchHotels(
    @Body()
    
        regtype: regtype,
    
    @Query()
    query: {
      counter?: number;
    }
  ): Promise<any> {
    const counter = query?.counter || 1; 

    const result = await this.CodesListService.insertreg(regtype);

    console.log('información de registros <<<<<<<<')
    
    console.log(result)
   
  }



}
