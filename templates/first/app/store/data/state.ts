export interface IDataState {
  loading: boolean
  saving: boolean | null
  removing: boolean | null
  finished: boolean | string | null
  errors: any
  dialog: boolean | null
  none: boolean | null
}

export const state = (props?: Partial<IDataState>): IDataState => ({
  loading: false,
  saving: false,
  removing: false,
  finished: false,
  errors: {},
  dialog: false,
  none: false,
  ...props
})

export default state
