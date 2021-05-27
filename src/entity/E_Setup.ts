import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import E_Base from './E_Base'
import E_Preset from './E_Preset';

@Entity({
  schema: 'public',
  name: 'setup',
})
export default class E_Setup extends E_Base {
  @Column({
    type: 'varchar',
    length: 128,
    unique: true,
  })
  key: string;
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  @OneToMany(() => E_Preset, preset => preset.setup)
  presets: E_Preset[];
}

