import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    BeforeUpdate,
  } from "typeorm";
  
  @Entity({
    name: "reg_client",
  })
  export class entitiregs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_rclient: number;
    @Column({ nullable: true })
    registros1: string;

    @Column({ nullable: true })
    sectiontype: string;
  
    @Column({ type: "boolean", default: () => "true" })
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
  

