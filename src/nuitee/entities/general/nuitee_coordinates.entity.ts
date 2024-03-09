import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'coordinates',
})
export class entitiCoordinates extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_coordinates: number;

    @Column({ nullable: true })
    id : string;

    @Column({ nullable: true })
    center_longitude: string;

    @Column({ nullable: true })
    center_latitude: string;
    
    @Column({ type: 'boolean', default: () => 'true' })
  availeable: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_at: Date;

  @BeforeUpdate()
  updateTimestamps() {
    this.update_at = new Date();
  }

}


