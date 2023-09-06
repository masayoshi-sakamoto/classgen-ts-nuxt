export interface IDataState {
  observer: any
  loading: boolean
  saving: boolean | null
  removing: boolean | null
  finished: boolean | null
  none: boolean | null
  errors: any
  dialog: boolean | null
}

export const state = (props?: Partial<IDataState>): IDataState => ({
  observer: null,
  loading: false,
  saving: false,
  removing: false,
  finished: false,
  none: false,
  errors: {},
  dialog: false,
  ...props
})

export default state
