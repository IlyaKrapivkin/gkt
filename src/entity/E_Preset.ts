import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Base from './E_Base'
import E_Setup from './E_Setup'
import E_AccountSetup from './E_AccountSetup'

@Entity({
  schema: 'public',
  name: 'preset',
})
export default class E_Preset extends E_Base {
  @Column({
    type: 'integer',
    name: 'setup_id',
  })
  setupId: number;

  @Column({
    type: 'varchar',
    length: 256,
  })
  value: string;
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @ManyToOne(() => E_Setup, setup => setup.presets)
  @JoinColumn({
    name: 'setup_id',
    referencedColumnName: 'id',
  })
  setup: E_Setup;

  @OneToMany(() => E_AccountSetup, accountSetup => accountSetup.preset)
  accountSetups: E_AccountSetup[];
}
