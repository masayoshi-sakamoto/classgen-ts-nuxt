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
      // swaggerのpathsをもとに
      const swagger = this.loadSwagger()
      if (swagger) {
        this.swagger = {
          models: swagger.models,
          paths: Object.entries(swagger.paths).reduce((paths, [key, value]) => {
            if (!this.configs!.menu!.excludes!.includes(key)) {
              paths = {
                ...paths,
                [key]: value
              }
            }
            return paths
          }, {})
        }
        this.parameter.model = name
        this.generator('components', './app/assets/menus')

        for (const pagename of Object.keys(this.swagger.paths)) {
          this.parameter.model = pagename
          this.generator('components', './app/pages')
        }
      }
    }
  }
}
