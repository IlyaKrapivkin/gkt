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
  name: 'balance',
})
export default class E_Balance extends E_Base {
  @Column({
    type: 'integer',
    name: 'wallet_id',
  })
  walletId: number;

  @Column({
    type: 'integer'
  })
  amount: number;

  @Column({
    type: 'integer'
  })
  income: number;

  @Column({
    type: 'integer'
  })
  expense: number;
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @ManyToOne(() => E_Wallet, wallet => wallet.balances)
  @JoinColumn({
    name: 'wallet_id',
    referencedColumnName: 'id'
  })
  wallet: E_Wallet;
}
