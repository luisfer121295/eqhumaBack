import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'search_pr',
})
export class tableSearchPR extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_searchhotel : number;
   @Column({ nullable: true })
  hotelid : number;
   @Column({ nullable: true })
  name: string;
   @Column({ nullable: true })
  address1: string;
   @Column({ nullable: true })
  address2: string;
   @Column({ nullable: true })
  city: string;
   @Column({ nullable: true })
  stateprovince: string;
   @Column({ nullable: true })
  postalcode: string;
   @Column({ nullable: true })
  country: string;
   @Column({ nullable: true })
  latitude: string;
   @Column({ nullable: true })
  longitude: string;
   @Column({ nullable: true })
  airportcode: string;
   @Column({ nullable: true })
  propertycategory: Number;
   @Column({ nullable: true })
  propertycurrency: string;
   @Column({ nullable: true })
  propertycategoryname: string;
   @Column({ nullable: true })
  starrating: string;
   @Column({ nullable: true })
  confidence: number;
   @Column({ nullable: true })
  suppliertype: string;
   @Column({ nullable: true })
  location: string;
   @Column({ nullable: true })
  chaincodeid: string;
   @Column({ nullable: true })
  highrate: string;
   @Column({ nullable: true })
  lowrate: string;
   @Column({ nullable: true })
  checkintime: string;
   @Column({ nullable: true })
  checkouttime: string;
   @Column({ nullable: true })
  citycode: number;
   @Column({ nullable: true })
  hoteldescription: string;
   @Column({ nullable: true })
  hoteldiningdescription: string;
   @Column({ nullable: true })
  hotelattraction: string;
   @Column({ nullable: true })
  hotellocationdescription: string;
   @Column({ nullable: true })
  hotelfeatures: string;
   @Column({ nullable: true })
  hotelamenitiesdescription: string;
   @Column({ nullable: true })
  roominfos: string;
   
    @Column({ type: 'boolean', default: () => 'true' })
    available: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeUpdate()
     updateTimestamps() {
       this.updated_at = new Date();
     }

     @Column({ nullable: true })
markcorps_hotelid:  number;
@Column({ nullable: true })
markcorps_name:   string;
@Column({ nullable: true })
markcorps_address1:   string;
@Column({ nullable: true })
markcorps_city:  string;
@Column({ nullable: true })
markcorps_citycode:  number;
@Column({ nullable: true })
markcorps_latitude:   string;
@Column({ nullable: true })
markcorps_longitude:  string;
@Column({ nullable: true})
flag_type: number;
@Column({ nullable: true})
flag_name: number;
@Column({ nullable: true})
flag_addresasc: number;
@Column({ nullable: true})
flag_addresdesc: number;
@Column({ nullable: true})
flag_coords: number;
@Column({ type: 'boolean', default: () => 'true' })
availablemarkcoprs: boolean;
@Column({ type: 'boolean', default: () => 'true' })
nomach: boolean;


}


