export interface IDataState {
  loading: boolean
  saving: boolean | null
  removing: boolean | null
  dialog: boolean | null
  errors: any
}

export const state = (props?: Partial<IDataState>): IDataState => ({
  loading: false,
  saving: false,
  removing: false,
  dialog: false,
  errors: {},
  ...props
})

export default state
