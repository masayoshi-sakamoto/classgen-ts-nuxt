import { Empty<%= className %>PropsFactory, I<%= className %>Props } from '@/entities/<%= className %>'
import { IOptionsProps } from '@/entities/Options'
import { EmptyQueryPropsFactory, IQueryProps } from '@/entities/Query'

export interface I<%= className %>State {
  byIds: {
    [id: string]: I<%= className %>Props
  }
  fetched: I<%= className %>Props[]
  query: IQueryProps
  options: IOptionsProps
  loading: boolean
  current: I<%= className %>Props
}

export const state = (): I<%= className %>State => ({
  byIds: {},
  fetched: [],
  query: EmptyQueryPropsFactory(),
  options: {},
  loading: false,
  current: Empty<%= className %>PropsFactory()
})

export default state
