import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Base from './E_Base'
import E_Exchange from './E_Exchange';
import E_Minus from './E_Minus';
import E_Plus from './E_Plus';
import E_Transfer from './E_Transfer';
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
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @OneToMany(() => E_Wallet, wallet => wallet.currency)
  wallets: E_Wallet[];

  @OneToMany(() => E_Transfer, transfer => transfer.currency)
  transfers: E_Transfer[];

  @OneToMany(() => E_Exchange, exchange => exchange.currency)
  exchanges: E_Exchange[];

  @OneToMany(() => E_Minus, minus => minus.currency)
  minuses: E_Minus[];

  @OneToMany(() => E_Plus, plus => plus.currency)
  pluses: E_Plus[];
}
