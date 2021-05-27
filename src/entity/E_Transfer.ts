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
import E_Group from './E_Group'

@Entity({
  schema: 'public',
  name: 'transfer',
})
export default class E_Transfer extends E_Base {
  @Column({
    type: 'integer',
    name: 'account_id',
  })
  accountId: number;

  @Column({
    type: 'integer',
    name: 'exwallet_id',
  })
  exwalletId: number;

  @Column({
    type: 'integer',
    name: 'wallet_id',
  })
  walletId: number;

  @Column({
    type: 'integer',
    name: 'currency_id',
  })
  currencyId: number;

  @Column({
    type: 'integer',
    name: 'category_id',
  })
  categoryId: number;

  @Column({
    type: 'integer',
    name: 'group_id',
  })
  groupId: number;

  @Column({
    type: 'integer'
  })
  amount: number;
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @ManyToOne(() => E_Account, account => account.transfers)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id'
  })
  account: E_Account;

  @ManyToOne(() => E_Wallet, wallet => wallet.transfers)
  @JoinColumn({
    name: 'exwallet_id',
    referencedColumnName: 'id'
  })
  exwallet: E_Wallet;

  @ManyToOne(() => E_Wallet, wallet => wallet.transfers)
  @JoinColumn({
    name: 'wallet_id',
    referencedColumnName: 'id'
  })
  wallet: E_Wallet;

  @ManyToOne(() => E_Currency, currency => currency.transfers)
  @JoinColumn({
    name: 'currency_id',
    referencedColumnName: 'id'
  })
  currency: E_Currency;

  @ManyToOne(() => E_Category, category => category.transfers)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id'
  })
  category: E_Category;

  @ManyToOne(() => E_Group, group => group.transfers)
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id'
  })
  group: E_Group;
}
