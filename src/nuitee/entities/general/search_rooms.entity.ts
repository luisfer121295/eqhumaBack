import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'search_inforooms',
})
export class entitiInfoRooms extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_inforooms: number;

    @Column({ nullable: true })
    hotelid : number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    address1 : string;

    @Column({ nullable: true })
    address2: string;

    @Column({ nullable: true })
    city : string;

    @Column({ nullable: true })
    roomcode: string;

    @Column({ nullable: true })
    roomname : string;

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


