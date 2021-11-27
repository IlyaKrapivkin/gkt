import {
  Resolver,
  Query,
  Mutation,
  Authorized,
} from 'type-graphql'
import { USER_ROLE } from '../types'

@Resolver()
export default class Test {

  @Query(() => String)
  async ping() {
    return 'pong'
  }

  @Authorized()
  @Query(() => String)
  async t1_okStr() {
    return 'default ok'
  }

  @Authorized()
  @Query(() => String)
  async t2_throwError() {
    throw new Error('throw error')
  }

  @Authorized()
  @Query(() => String)
  async t3_codeError() {
    const abc = undefined
    const cba = abc.def
    return 'code error'
  }

  @Authorized([
    USER_ROLE.admin,
    USER_ROLE.guest,
    USER_ROLE.user,
  ])
  @Query(() => String)
  async t4_rolesAll() {
    return 'default ok'
  }

  @Authorized([
    USER_ROLE.guest,
  ])
  @Query(() => String)
  async t4_roleGuest() {
    return 'default ok'
  }

  @Authorized([
    USER_ROLE.admin,
  ])
  @Query(() => String)
  async t4_roleAdmin() {
    return 'default ok'
  }

  @Authorized([
    USER_ROLE.guest,
  ])
  @Query(() => String)
  async t5_test() {
    const regLat = /^[a-zA-Z0-9<>(){}!?.,:;+=~_"^*@#$%|-]{5,}$/g
    const abc = ['12345','123456','1234567','12345678','123456789','123450']
    abc.forEach(str=> {
      console.log(str.length)
      console.log(regLat.test(str))
    })
    return 'default ok'
  }

}
