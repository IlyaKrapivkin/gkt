import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Arg,
} from 'type-graphql'
import { getConnection } from 'typeorm'

import { USER_ROLE } from '../types'
import E_Person from '../entity/E_Person'
import E_Role from '../entity/E_Role'
import { Email } from '../utility/Email'
import { Phone } from '../utility/Phone'
import { Password } from '../utility/Password'
import { HashGen } from '../utility/Crypt'

@Resolver()
export default class User {

  @Authorized([
    USER_ROLE.guest,
    USER_ROLE.user,
    USER_ROLE.admin,
  ])
  @Query(() => Boolean)
  async roles(): Promise<boolean> {
    const roles = await getConnection().getRepository(E_Role).find({
      where: {
        deleteDate: null,
      }
    })
    return true
  }


}
