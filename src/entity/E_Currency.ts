import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Base from './E_Base'
import E_Wallet from './E_Wallet'

@Entity({
  schema: 'public',
  name: 'currency',
})
export default class E_Currency extends E_Base {
  @Column({
    type: 'varchar',
    length: 64,
  })
  sign: string;

  @Column({
    type: 'varchar',
    length: 64,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  country: string;

  @OneToMany(() => E_Wallet, wallet => wallet.currency)
  wallets: E_Wallet[];
}
