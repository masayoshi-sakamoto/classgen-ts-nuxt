/* eslint camelcase: 0 */
export interface IQueryProps {
  total: number
  page?: number
  skip?: number
  take?: number
  count?: number
  sort?: string | null
  desc?: number | null
  word?: string | null
  query?: string | null
}

export const EmptyQueryPropsFactory = (props?: Partial<IQueryProps>): IQueryProps => ({
  total: 1,
  ...props
})
