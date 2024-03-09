import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'continent',
})
export class entiticontinent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_continent: number;

    @Column({ nullable: true })
    id_country : string;

    @Column({ nullable: true })
    id: string;

    @Column({ nullable: true })
    type: string;
    
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


