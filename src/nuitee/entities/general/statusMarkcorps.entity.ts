import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'status_markcorps',
})
export class entitiMachInfoHotels extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_markcorpsstatus: number;

    @Column({ nullable: true })
    id_machinfo : number;

    @Column({ nullable: true })
    namehotelsearch : string;

    @Column({ nullable: true })
    statusCode: string;

    @Column({ nullable: true })
    requestAt : string;

    @Column({ nullable: true })
    responseAt: string;

    @Column({ nullable: true })
    statusMessage : string;


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





























