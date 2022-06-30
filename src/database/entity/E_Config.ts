import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm'

@Entity({
  schema: 'public',
  name: 'config',
})
export default class E_Config {
  @PrimaryColumn({
    type: 'varchar',
    length: 256,
  })
  key: string;

  @Column({
    type: 'varchar',
    length: 256,
  })
  value: string;
}
