import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'descendants',
})
export class entitidescendants extends BaseEntity {
    @PrimaryGeneratedColumn()
    _province_state: number;

    @Column({ nullable: true })
    id : string;

    @Column({ nullable: true })
    province_state: string;
    
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


