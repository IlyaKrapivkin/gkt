import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Base from './E_Base'
import E_Person from './E_Person'
import E_Wallet from './E_Wallet'
import E_Color from './E_Color'
import E_Category from './E_Category'
import E_AccountSetup from './E_AccountSetup'
import E_Group from './E_Group'

@Entity({
  schema: 'public',
  name: 'account',
})
export default class E_Account extends E_Base {
  @Column({
    type: 'integer',
    name: 'person_id',
  })
  personId: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  alias: string | null;

  @ManyToOne(() => E_Person, person => person.accounts)
  @JoinColumn({
    name: 'person_id',
    referencedColumnName: 'id',
  })
  person: E_Person;

  @OneToMany(() => E_AccountSetup, accountSetup => accountSetup.account)
  accountSetups: E_AccountSetup[];

  @OneToMany(() => E_Wallet, wallet => wallet.account)
  wallets: E_Wallet[];

  @OneToMany(() => E_Color, color => color.account)
  colors: E_Color[];

  @OneToMany(() => E_Color, category => category.account)
  categories: E_Category[];

  @OneToMany(() => E_Group, group => group.account)
  groups: E_Group[];
}
