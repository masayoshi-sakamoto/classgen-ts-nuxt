import { I<%= className %>Props } from '@/entities/<%= className %>'
import { IOptionsProps } from '@/entities/Options'
import { IQueryProps } from '@/entities/Query'

export const Types = {
  store: 'store',
  fetched: 'fetched',
  query: 'query',
  options: 'options',
  loading: 'loading',
  current: 'current'
}

export const path = '<%= classname %>/'

export class Store implements FluxStandardAction<I<%= className %>Props[]> {
  type = path + Types.store
  constructor(public payload: I<%= className %>Props[]) {}
}

export class Fetched implements FluxStandardAction<I<%= className %>Props[]> {
  type = path + Types.fetched
  constructor(public payload: I<%= className %>Props[]) {}
}

export class Query implements FluxStandardAction<IQueryProps> {
  type = path + Types.query
  constructor(public payload: IQueryProps) {}
}

export class Options implements FluxStandardAction<IOptionsProps> {
  type = path + Types.options
  constructor(public payload: IOptionsProps) {}
}

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Current implements FluxStandardAction<I<%= className %>Props> {
  type = path + Types.current
  constructor(public payload: I<%= className %>Props) {}
}
