import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'search_status',
})
export class entitiStatus extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_searchstatus: number;

    @Column({ nullable: true })
    hotelid : number;

    @Column({ nullable: true })
    statuscode: string;
a
    @Column({ nullable: true })
    requestat : string;

    @Column({ nullable: true })
    responseat: string;

    @Column({ nullable: true })
    statusmessage : string;

    @Column({ nullable: true })
    flag_provider: number;
    
    @Column({ nullable: true })
    urlapi: string;

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


