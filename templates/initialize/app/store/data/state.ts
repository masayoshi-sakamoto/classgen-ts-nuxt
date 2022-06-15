export interface IDataState {
  loading: boolean
  saving: boolean | null
  removing: boolean | null
  finished: boolean | null
  errors: any
  dialog: boolean | null
}

export const state = (props?: Partial<IDataState>): IDataState => ({
  loading: false,
  saving: false,
  removing: false,
  finished: false,
  errors: {},
  dialog: false,
  ...props
})

export default state
