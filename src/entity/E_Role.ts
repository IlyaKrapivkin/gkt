import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Base from './E_Base'
import E_Person from './E_Person'

@Entity({
  schema: 'public',
  name: 'role',
})
export default class E_Role extends E_Base {
  @Column({
    type: 'varchar',
    length: 16,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  about: string | null;
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @OneToMany(() => E_Person, person => person.role)
  persons: E_Person[];
}
