import {
  Field,
  ObjectType,
} from 'type-graphql'

@ObjectType()
export class Role {// TODO
  @Field()
  id: number

  @Field()
  identifier: string

  @Field({ nullable: true })
  email?: string | null

  @Field({ nullable: true })
  phone?: string | null

  @Field({ nullable: true })
  name?: string | null

  @Field({ nullable: true })
  photo?: string | null

  @Field({ nullable: true })
  token?: string | null
}