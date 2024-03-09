import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'search_roomsinfo',
})
export class entitiroomsinfo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_roomsinfohotel: number;

    @Column({ nullable: true })
    hotelid : number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    roomcode: string;   

    @Column({ nullable: true })
    roomname: string;  

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


