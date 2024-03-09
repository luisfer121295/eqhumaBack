import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'mach_infohotels',
})
export class entitiMachInfoHotels extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_machinfo: number;

    @Column({ nullable: true })
    nuitee_hotelid: number;
@Column({ nullable: true })
nuitee_name:  string;
@Column({ nullable: true })
nuitee_address1:  string;
@Column({ nullable: true })
nuitee_address2:  string;
@Column({ nullable: true })
nuitee_city:  string;
@Column({ nullable: true })
nuitee_citycode:  number;
@Column({ nullable: true })
nuitee_stateprovince:  string;
@Column({ nullable: true })
nuitee_latitude:   string;
@Column({ nullable: true })
nuitee_longitude:  string;
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

}





























