import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Person from './E_Person'

@Entity({
  schema: 'public',
  name: 'code'
})
export default class E_Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'person_id'
  })
  personId: number;

  @Column({
    type: 'timestamptz',
    name: 'create_date',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createDate: Date;

  @Column({
    type: 'timestamptz',
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateDate: Date;

  @Column({
    type: 'timestamptz',
    name: 'expire_date'
  })
  expireDate: Date;

  @Column({
    type: 'timestamptz',
    name: 'accept_date',
    nullable: true
  })
  acceptDate: Date | null;

  @Column({
    type: 'varchar',
    length: 8
  })
  code: string;

  @Column({
    type: 'smallint',
    default: () => '0'
  })
  hit: string;

  @ManyToOne(() => E_Person, person => person.codes)
  @JoinColumn({
    name: 'person_id',
    referencedColumnName: 'id'
  })
  person: E_Person;
}
