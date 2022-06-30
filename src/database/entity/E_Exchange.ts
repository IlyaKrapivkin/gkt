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
import E_Color from './E_Color'
import E_AccountSetup from './E_AccountSetup'
import E_Category from './E_Category'
import E_Wallet from './E_Wallet'

@Entity({
  schema: 'public',
  name: 'exchange',
})
export default class E_Exchange extends E_Base {
  @Column({
    type: 'integer',
    name: 'account_id',
  })
  accountId: number;

  @Column({
    type: 'integer',
    name: 'wallet_id',
  })
  walletId: number;

  @Column({
    type: 'integer',
    name: 'excurrency_id',
  })
  excurrencyId: number;

  @Column({
    type: 'integer',
    name: 'currency_id',
  })
  currencyId: number;

  @Column({
    type: 'integer'
  })
  examount: number;

  @Column({
    type: 'integer'
  })
  amount: number;

  @Column({
    type: 'integer'
  })
  rate: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  bank: string | null;
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @ManyToOne(() => E_Account, account => account.exchanges)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id'
  })
  account: E_Account;

  @ManyToOne(() => E_Wallet, wallet => wallet.exchanges)
  @JoinColumn({
    name: 'wallet_id',
    referencedColumnName: 'id'
  })
  wallet: E_Wallet;

  @ManyToOne(() => E_Currency, currency => currency.exchanges)
  @JoinColumn({
    name: 'excurrency_id',
    referencedColumnName: 'id'
  })
  excurrency: E_Currency;

  @ManyToOne(() => E_Currency, currency => currency.exchanges)
  @JoinColumn({
    name: 'currency_id',
    referencedColumnName: 'id'
  })
  currency: E_Currency;
}
