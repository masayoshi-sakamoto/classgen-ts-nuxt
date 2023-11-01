/* eslint camelcase: 0 */
import { Auth } from '@/infrastructure/network/<%= AppName %>/schema'
import { IAuthProps, EmptyAuthPropsFactory } from '@/entities/Auth'

export const toAuthProps = (props: Auth | null | undefined): IAuthProps => {
  if (!props) {
    return EmptyAuthPropsFactory()
  }

  const { access_token, token_type, expired } = props

  return {
    accessToken: access_token,
    tokenType: token_type,
    expired
  }
}
