export interface ICsvProps {
  field: string | null
  name: string | null
}

export default class CsvtEntity {
  private _props: ICsvProps

  constructor(props: ICsvProps) {
    this._props = props
  }

  get props(): ICsvProps {
    return this._props
  }

  get clone(): ICsvProps {
    return JSON.parse(JSON.stringify(this._props))
  }

  get field(): string | null {
    return this._props.field
  }

  get name(): string | null {
    return this._props.name
  }
}

export const headers = [
  { text: 'フィールド名', value: 'field' },
  { text: 'カラム名', value: 'name' }
]

export const EmptyCsvPropsFactory = (props?: Partial<ICsvProps> | null): ICsvProps => ({
  field: null,
  name: null,
  ...props
})
