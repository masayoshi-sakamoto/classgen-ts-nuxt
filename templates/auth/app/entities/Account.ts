export interface IAccountProps {
  username: string | null
  password: string | null
}

export default class AccountEntity {
  private _props: IAccountProps

  constructor(props: IAccountProps) {
    this._props = props
  }

  get props(): IAccountProps {
    return this._props
  }

  get clone(): AccountEntity {
    return new AccountEntity({ ...this._props })
  }

  get username(): string | null {
    return this._props.username
  }

  get password(): string | null {
    return this._props.password
  }
}

export const EmptyAccountPropsFactory = (props?: Partial<IAccountProps>): IAccountProps => ({
  username: null,
  password: null,
  ...props
})

export const EmptyAccountEntityFactory = (props?: Partial<IAccountProps>): AccountEntity => {
  return new AccountEntity(EmptyAccountPropsFactory(props))
}
