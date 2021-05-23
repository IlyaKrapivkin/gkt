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
import E_Group from './E_Group'

@Entity({
  schema: 'public',
  name: 'category',
})
export default class E_Category extends E_Base {
  @Column({
    type: 'integer',
    name: 'account_id',
  })
  accountId: number;

  @Column({
    type: 'integer',
    name: 'color_id',
  })
  colorId: number;

  @Column({
    type: 'varchar',
    length: 128,
  })
  name: string;

  @ManyToOne(() => E_Account, account => account.categories)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id'
  })
  account: E_Account;

  @ManyToOne(() => E_Color, color => color.categories)
  @JoinColumn({
    name: 'color_id',
    referencedColumnName: 'id'
  })
  color: E_Color;

  @OneToMany(() => E_Group, group => group.category)
  groups: E_Group[];
}
