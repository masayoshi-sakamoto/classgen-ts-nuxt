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

  get clone(): IAccountProps {
    return JSON.parse(JSON.stringify(this._props))
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
