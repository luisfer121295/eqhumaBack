import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  BeforeUpdate,
} from "typeorm";

@Entity({
  name: "tem_registros",
})
export class entititemp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_tem: number;
  @Column({ nullable: true })
  property_ids_expanded: string;

  @Column({ type: "boolean", default: () => "true" })
  available: boolean;
}
