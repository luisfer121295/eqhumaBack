import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'point_of_interest',
})
export class entitipoint_of_interest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_point_of_interest: number;

    @Column({ nullable: true })
    id : string;

    @Column({ nullable: true })
    name: string;
    
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


