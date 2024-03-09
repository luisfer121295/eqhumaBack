import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'search_hotelimages',
})
export class entitiHotelImages extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_hotelimages: number;

    @Column({ nullable: true })
    hotelid : number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    url: string;   

    @Column({ nullable: true })
    thumbnailurl: string;  

    @Column({ nullable: true })
    caption: string;  

    @Column({ nullable: true })
    ordern: string;  

    @Column({ nullable: true })
    defaultimage: string;  

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

}


