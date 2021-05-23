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
}
