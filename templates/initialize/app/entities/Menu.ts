export interface IMenuProps {
  id?: string
  title: string | null
  icon: string | null
  to: any | null
  href: string | null
  group: string | null
  children: MenuEntity[] | null
}

export default class MenuEntity {
  private _props: IMenuProps

  constructor(props: IMenuProps) {
    this._props = props
  }

  get props(): IMenuProps {
    return this._props
  }

  get clone(): MenuEntity {
    return new MenuEntity(JSON.parse(JSON.stringify(this._props)))
  }

  get id(): string | undefined {
    return this._props.id
  }

  get title(): string | null {
    return this._props.title
  }

  get icon(): string | null {
    return this._props.icon
  }

  get to(): any | null {
    return this._props.to
  }

  get href(): string | null {
    return this._props.href
  }

  get group(): string | null {
    return this._props.group
  }

  get children(): MenuEntity[] | null {
    return this._props.children
  }

  set children(value: MenuEntity[] | null) {
    this._props.children = value
  }

  get order(): number {
    return Number(this._props.id)
  }

  set order(value: number) {
    this._props.id = String(value)
  }
}

export const EmptyMenuPropsFactory = (props?: Partial<IMenuProps>): IMenuProps => ({
  title: null,
  icon: null,
  to: null,
  href: null,
  group: null,
  children: null,
  ...props
})

export const EmptyMenuEntityFactory = (props?: Partial<IMenuProps>): MenuEntity => {
  return new MenuEntity(EmptyMenuPropsFactory(props))
}

export const menus: MenuEntity[] = [
  EmptyMenuEntityFactory({
    id: 'product',
    title: '製品',
    to: { name: 'product' }
  }),
  EmptyMenuEntityFactory({
    id: 'solution',
    title: 'ソリューション',
    to: { name: 'solution' }
  }),
  EmptyMenuEntityFactory({
    id: 'price',
    title: '価格',
    to: { name: 'price' }
  }),
  EmptyMenuEntityFactory({
    id: 'contact',
    title: 'お問い合わせ',
    to: { name: 'contact' }
  })
]

export const admins: MenuEntity[] = []

export const subs: MenuEntity[] = [
  EmptyMenuEntityFactory({
    id: 'profile',
    title: 'プロフィール'
  })
]
