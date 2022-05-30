import MenuEntity, { menus } from '@/entities/Menu'

export interface IAppState {
  loading: boolean
  progress: number
  errors: any
  drawer: boolean | null
  menus: MenuEntity[] | null
}

export const state = (props?: Partial<IAppState>): IAppState => ({
  loading: false,
  progress: 0,
  errors: {},
  drawer: false,
  menus,
  ...props
})

export default state
