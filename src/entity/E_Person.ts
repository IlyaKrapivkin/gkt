import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Base from './E_Base'
import E_Role from './E_Role'
import E_Code from './E_Code'

@Entity({
  schema: 'public',
  name: 'person'
})
export default class E_Person extends E_Base {
  @Column({
    type: 'integer',
    name: 'role_id'
  })
  roleId: number;

  @Column({
    type: 'varchar',
    length: 64
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true
  })
  reserve: string | null;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true
  })
  hash: string | null;

  @Column({
    type: 'bool',
    default: () => 'FALSE'
  })
  valid: boolean;

  @ManyToOne(() => E_Role, role => role.persons)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id'
  })
  role: E_Role;

  @OneToMany(() => E_Code, code => code.person)
  codes: E_Code[];
}
