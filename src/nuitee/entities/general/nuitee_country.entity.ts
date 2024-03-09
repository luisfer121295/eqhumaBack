import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity({
  name: 'country',
})
export class entitiCountry extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_country: number;

    @Column({ nullable: true })
    id : string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    name_full: string;

    @Column({ nullable: true })
    country_code: string;

    @Column({ nullable: true })
    coordinates: string;

    @Column({ nullable: true })
    associations: string;

    @Column({ nullable: true })
    ancestors: string;

    @Column({ nullable: true })
    descendants: string;

    @Column({ nullable: true })
    property_ids_expanded: string;

    @Column({ nullable: true })
    property_ids: string;

    @Column({ nullable: true })
    categories: string;

    @Column({ nullable: true })
    tags: string;
    
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


