import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'

@Entity({
  schema: "public",
  name: "role"
})
export class E_Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "timestamptz",
    name: "create_date",
    default: () => 'CURRENT_TIMESTAMP'
  })
  createDate: Date;

  @Column({
    type: "timestamptz",
    name: "update_date",
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateDate: Date;

  @Column({
    type: "varchar",
    length: 16
  })
  name: string;


  @Column({
    type: "varchar",
    length: 256,
    nullable: true
  })
  about: string;
}
