import { IOptions } from './options'
import Base from './base'
import { app, components } from './types'
import { snake, upperCamel } from './common'

export default class Component extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }
}
