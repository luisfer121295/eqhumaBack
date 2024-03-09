import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'all_info_nuitee',
})
export class infojsonNuitee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_code: number;

    @Column({ nullable: true })
    codename : string;

    @Column({ nullable: true })
    idcreador: number;

    @Column({ type: 'boolean', default: () => 'true' })
    available: boolean;

    @Column({ nullable: true })
    idpromotion: number;

    @Column({ nullable: true })
    typediscount: number;

    @Column({ nullable: true })
    amount: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true })
    idusuariocanje: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechacanje: Date;
    
    @BeforeUpdate()
    updateTimestamps() {
      this.fechacanje = new Date();
    }
}


