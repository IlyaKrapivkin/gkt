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
import E_Preset from './E_Preset'
import E_Account from './E_Account'

@Entity({
  schema: 'public',
  name: 'account_setup',
})
export default class E_AccountSetup extends E_Base {
  @Column({
    type: 'integer',
    name: 'account_id',
  })
  accountId: number;

  @Column({
    type: 'integer',
    name: 'preset_id',
  })
  presetId: number;

  @ManyToOne(() => E_Account, account => account.accountSetups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id'
  })
  account: E_Account;

  @ManyToOne(() => E_Preset, preset => preset.accountSetups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'preset_id',
    referencedColumnName: 'id',
  })
  preset: E_Preset;
}
