/* eslint camelcase: 0 */
import { Account } from '@/infrastructure/network/<%= appName %>/schema'
import { IAccountProps } from '@/entities/Account'

export const toAccountSeed = (props: IAccountProps): Account => {
  const { username, password } = props
  return {
    username,
    password
  }
}
