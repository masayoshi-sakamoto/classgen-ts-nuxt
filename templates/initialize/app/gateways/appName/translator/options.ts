/* eslint camelcase: 0 */
import { Query } from '@/infrastructure/network/<%= appName %>/schema'
import { EmptyOptionsPropsFactory, IOptionsProps } from '@/entities/Options'

export const toOptionsProps = (props?: Query): IOptionsProps => {
  if (!props) {
    return EmptyOptionsPropsFactory()
  }
  const { page, take } = props
  return EmptyOptionsPropsFactory({
    page,
    itemsPerPage: take
  })
}
