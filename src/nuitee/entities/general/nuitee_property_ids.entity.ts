import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'property_ids',
})
export class entitiproperty_ids extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_property_ids: number;

    @Column({ nullable: true })
    id : string;

    @Column({ nullable: true })
    property_ids: string;
    
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


