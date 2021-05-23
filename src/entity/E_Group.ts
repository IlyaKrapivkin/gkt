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

@Entity({
  schema: 'public',
  name: 'group',
})
export default class E_Group extends E_Base {
  @Column({
    type: 'integer',
    name: 'account_id',
  })
  accountId: number;

  @Column({
    type: 'integer',
    name: 'category_id',
  })
  categoryId: number;

  @Column({
    type: 'varchar',
    length: 128,
  })
  name: string;

  @ManyToOne(() => E_Account, account => account.groups)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id'
  })
  account: E_Account;

  @ManyToOne(() => E_Category, category => category.groups)
  @JoinColumn({
    name: 'color_id',
    referencedColumnName: 'id'
  })
  category: E_Category;
}
