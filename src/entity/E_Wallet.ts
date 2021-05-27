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
import E_Account from './E_Account'
import E_Currency from './E_Currency'
import E_AccountSetup from './E_AccountSetup'
import E_Transfer from './E_Transfer'
import E_Exchange from './E_Exchange'
import E_Minus from './E_Minus'
import E_Plus from './E_Plus'
import E_Balance from './E_Balance'

@Entity({
  schema: 'public',
  name: 'wallet',
})
export default class E_Wallet extends E_Base {
  @Column({
    type: 'integer',
    name: 'account_id',
  })
  accountId: number;

  @Column({
    type: 'integer',
    name: 'currency_id',
  })
  currencyId: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  alias: string | null;

  @Column({
    type: 'bool',
    default: () => 'FALSE',
  })
  main: boolean;
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @ManyToOne(() => E_Account, account => account.wallets)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id'
  })
  account: E_Account;

  @ManyToOne(() => E_Currency, currency => currency.wallets)
  @JoinColumn({
    name: 'currency_id',
    referencedColumnName: 'id'
  })
  currency: E_Currency;

  @OneToMany(() => E_Transfer, transfer => transfer.wallet)
  transfers: E_Transfer[];

  @OneToMany(() => E_Exchange, exchange => exchange.wallet)
  exchanges: E_Exchange[];

  @OneToMany(() => E_Minus, minus => minus.wallet)
  minuses: E_Minus[];

  @OneToMany(() => E_Plus, plus => plus.wallet)
  pluses: E_Plus[];

  @OneToMany(() => E_Balance, balance => balance.wallet)
  balances: E_Balance[];
}
