import {
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'

export default abstract class E_Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamptz',
    name: 'create_date',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createDate: Date;

  @Column({
    type: 'timestamptz',
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateDate: Date;

  @Column({
    type: 'timestamptz',
    name: 'delete_date',
    nullable: true
  })
  deleteDate: Date;
}
