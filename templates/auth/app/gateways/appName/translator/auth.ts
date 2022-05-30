/* eslint camelcase: 0 */
import { Auth } from '@/infrastructure/network/<%= appName %>/schema'
import { IAuthProps } from '@/entities/Auth'

export const toAuthProps = (props: Auth): IAuthProps => {
  const { access_token, token_type, expired } = props
  return {
    accessToken: access_token,
    tokenType: token_type,
    expired
  }
}
