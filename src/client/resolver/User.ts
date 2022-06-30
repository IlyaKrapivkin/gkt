import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Arg,
} from 'type-graphql'
import { getConnection } from 'typeorm'

import { USER_ROLE } from '../../type/storage'
import { CustomContext } from '../../type/abstract'

import E_Person from '../../database/entity/E_Person'
import E_Role from '../../database/entity/E_Role'

import Email from '../../tool/Email'
import Phone from '../../tool/Phone'
import Password from '../../tool/Pass'
import { HashGen } from '../../tool/Crypt'

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
