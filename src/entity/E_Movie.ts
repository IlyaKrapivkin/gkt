import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class R_Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('int', { default: 60 })
  minute: string
}
