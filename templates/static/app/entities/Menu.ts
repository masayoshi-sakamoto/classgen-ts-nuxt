export interface IMenuProps {
  id: string | null
  title: string | null
  icon?: string
  to?: any
  exact?: boolean
  href?: string
  target?: string
  group?: string
  children?: IMenuProps[]
  external?: IMenuProps[]
  callback?: any
  disabled: boolean
  sortable: boolean
  route?: any
}

export default class MenuEntity {
  private _props: IMenuProps
  private _current: MenuEntity | null

  constructor(props: IMenuProps) {
    this._props = props
    this._current = null
  }

  get props(): IMenuProps {
    return this._props
  }

  get clone(): MenuEntity {
    return new MenuEntity(JSON.parse(JSON.stringify(this._props)))
  }

  get id(): string | null {
    return this._props.id
  }

  get title(): string | null {
    return this._props.title
  }

  get icon(): string | undefined {
    return this._props.icon
  }

  get native(): any | undefined {
    if (this._props.disabled || this._props.href) {
      return undefined
    }
    return this._props.to || { name: this._props.id }
  }

  get href(): string | undefined {
    return this._props.href
  }

  get group(): string | undefined {
    return this._props.group
  }

  get sortable(): boolean {
    return this._props.sortable
  }

  get children(): MenuEntity[] | undefined {
    return this._props.children ? this._props.children.map((prop) => new MenuEntity(prop)) : undefined
  }

  set children(value: MenuEntity[] | undefined) {
    this._props.children = value ? value.map((prop) => prop._props) : undefined
  }

  get external(): MenuEntity[] | undefined {
    return this._props.external ? this._props.external.map((prop) => new MenuEntity(prop)) : undefined
  }

  get first(): MenuEntity | undefined {
    return this._props.disabled && this._props.children && this._props.children[0]
      ? new MenuEntity(this._props.children[0])
      : this._props.external && this._props.external[0]
      ? new MenuEntity(this._props.external[0])
      : undefined
  }

  get to(): any | undefined {
    this._current = this._current || this.findTo(this)
    return this._current.native
  }

  get pageTitle(): string | null | undefined {
    return this.findCurrent(this)?.title
  }

  get parent() {
    return { name: this._props.route.slice(0, this._props.route.lastIndexOf('-')) }
  }

  test(value: string | null | undefined): boolean {
    return value ? RegExp(`^${this._props.id}`).test(value) : false
  }

  private findTo(value: MenuEntity): MenuEntity {
    if (value.first) {
      return this.findTo(value.first)
    }
    return value
  }

  private findCurrent(value: MenuEntity): MenuEntity | undefined {
    if (RegExp(`^${value._props.id}`).test(this._props.route) && !value.props.disabled) {
      return value
    }
    let check: MenuEntity | undefined
    for (const child of value.children || []) {
      if ((check = this.findCurrent(child)) !== undefined) {
        return check
      }
    }
    return undefined
  }

  set route(value: any) {
    this._props.route = value
  }

  get route(): any {
    return this._props.route
  }
}

export const EmptyMenuPropsFactory = (props?: Partial<IMenuProps>): IMenuProps => ({
  id: null,
  title: null,
  disabled: false,
  sortable: false,
  ...props
})
