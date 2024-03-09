import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'search_atributes',
})
export class entitiAtributes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_inforooms: number;

    @Column({ nullable: true })
    hotelId : number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    address1 : string;

    @Column({ nullable: true })
    address2: string;

    @Column({ nullable: true })
    city : string;

    @Column({ nullable: true })
    hotelAttributeses: string;

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


