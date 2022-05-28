export interface IOptionsProps {
  page?: number
  itemsPerPage?: number
  sortBy?: string[]
  sortDesc?: boolean[]
  groupBy?: string[]
  groupDesc?: boolean[]
  multiSort?: boolean
  mustSort?: boolean
  word?: string | null
  query?: any
}

export const EmptyOptionsPropsFactory = (props?: Partial<IOptionsProps>): IOptionsProps => ({
  ...props
})
