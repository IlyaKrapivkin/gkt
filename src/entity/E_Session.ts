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
  name: 'session',
})
export default class E_Role extends E_Base {
  @Column({
    type: 'integer',
    name: 'person_id',
  })
  personId: number;

  @Column({
    type: 'varchar',
    length: 128,
  })
  token: string;

  @ManyToOne(() => E_Person, person => person.sessions)
  @JoinColumn({
    name: 'person_id',
    referencedColumnName: 'id',
  })
  person: E_Person;
}
