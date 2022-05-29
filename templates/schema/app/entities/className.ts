export interface I<%= className %>Props {
}

export default class <%= className %>Entity {
  private _props: I<%= className %>Props

  constructor(props: I<%= className %>Props) {
    this._props = props
  }

  get props(): I<%= className %>Props {
    return this._props
  }

  get clone(): I<%= className %>Props {
    return JSON.parse(JSON.stringify(this._props)) as I<%= className %>Props
  }
}

export const headers = [
]

export const Empty<%= className %>PropsFactory = (props?: Partial<I<%= className %>Props> | null): I<%= className %>Props => ({
  ...props
})