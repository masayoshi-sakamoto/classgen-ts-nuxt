export interface IAuthProps {
  accessToken: string | null
  tokenType: string | null
  expired: string | null
}

export default class AuthEntity {
  private _props: IAuthProps

  constructor(props: IAuthProps) {
    this._props = props
  }

  get props(): IAuthProps {
    return this._props
  }

  get clone(): IAuthProps {
    return JSON.parse(JSON.stringify(this._props))
  }

  get accessToken(): string | null {
    return this._props.accessToken
  }

  get tokenType(): string | null {
    return this._props.tokenType
  }

  get expired(): string | null {
    return this._props.expired
  }
}

export const headers = [{ text: 'ID', value: 'id' }]

export const EmptyAuthPropsFactory = (props?: Partial<IAuthProps> | null): IAuthProps => ({
  accessToken: null,
  tokenType: null,
  expired: null,
  ...props
})
