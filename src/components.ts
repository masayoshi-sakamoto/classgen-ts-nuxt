import { IOptions } from './options'
import Base from './base'

export default class Component extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  pages(name: string, page?: string) {
    if (page) {
      this.parameter.model = page
      this.generator('components', './app/pages')
    } else {
      this.swagger = this.filtter()
      this.parameter.model = name
      this.generator('components', './app/assets/menus')

      for (const pagename of Object.keys(this.swagger.paths)) {
        this.parameter.model = pagename
        this.generator('components', './app/pages')
      }
    }
  }

  forms(name?: string) {
    if (name) {
    } else {
      this.swagger = this.filtter()
      for (const key of Object.keys(this.swagger.paths)) {
        this.parameter.model = key
        this.generator('components', './app/components/organisms/Form')
      }
    }
  }

  /**
   * menuに表示しないモデルは排除
   */
  private filtter() {
    const { models, paths } = this.loadSwagger()
    return {
      models,
      paths: Object.entries(paths).reduce((result, [key, value]) => (!this.configs!.menu!.excludes!.includes(key) ? { ...result, [key]: value } : result), {})
    }
  }
}
