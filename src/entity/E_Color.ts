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
import E_Category from './E_Category'
import E_AccountSetup from './E_AccountSetup'

@Entity({
  schema: 'public',
  name: 'color',
})
export default class E_Color extends E_Base {
  @Column({
    type: 'integer',
    name: 'account_id',
  })
  accountId: number;

  @Column({
    type: 'varchar',
    length: 256,
  })
  sign: string;

  @ManyToOne(() => E_Account, account => account.colors)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id'
  })
  account: E_Account;

  @OneToMany(() => E_Category, category => category.color)
  categories: E_Category[];
}
