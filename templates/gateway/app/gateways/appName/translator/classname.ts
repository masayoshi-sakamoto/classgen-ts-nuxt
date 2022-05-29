/* eslint camelcase: 0 */
import { <%= className %>, <%= className %>Seed } from '@/infrastructure/network/<%= appName %>/schema'
import { I<%= className %>Props, Empty<%= className %>PropsFactory } from '@/entities/<%= className %>'

export const to<%= className %>Props = (props: <%= className %> | null | undefined): I<%= className %>Props => {
  if (!props) {
    return Empty<%= className %>PropsFactory()
  }

  const { id, title } = props
  return {
    id,
    title
  }
}

export const to<%= className %>Seed = (props: I<%= className %>Props): <%= className %>Seed => {
  const { id, title } = props
  return {
    id,
    title
  }
}
