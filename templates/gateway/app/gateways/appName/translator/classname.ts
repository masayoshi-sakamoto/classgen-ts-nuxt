/* eslint camelcase: 0 */
<%_ if (Object.values(schemas).find((prop) => (prop.format === 'date'))) { _%>
import moment from 'moment'
<%_ } _%>
<%_ for (const ref of refs) { _%>
import { to<%= ref.name %>Props } from './<%= toUnderscoreCase(ref.name) %>'
<%_ } _%>
import { <%= className %>, <%= className %>Seed } from '@/infrastructure/network/<%= appName %>/schema'
import { I<%= className %>Props, Empty<%= className %>PropsFactory } from '@/entities/<%= className %>'

export const to<%= className %>Props = (props: <%= className %> | null): I<%= className %>Props => {
  if (!props) {
    return Empty<%= className %>PropsFactory()
  }

  const { <%= Object.values(schemas).map((prop) => prop.key).join(', ') %> } = props
  return {
    <%- Object.values(schemas).map((prop) => {
      const camel = toCamelCase(prop.key, false)
      const model = toCamelCase(prop.key)
      let src = prop.key
      if (prop.ref) {
        src = `to${model}Props(${prop.key})`
      } else if (prop.format === 'json') {
        src = `${prop.key} ? JSON.parse(${prop.key}).${prop.key} : {}`
      } else if (prop.format === 'date') {
        src = `${prop.key} ? moment(${prop.key}).format('YYYY-MM-DD') : null`
      }
      return camel === src ? camel : camel + ': ' + src
    }).join(',\n    ') %>
  }
}

export const to<%= className %>Seed = (props: I<%= className %>Props): <%= className %>Seed => {
  const { <%= Object.values(seed).map((prop) => toCamelCase(prop.key, false)).join(', ') %> } = props
  return {
    <%= Object.values(seed).map((prop) => {
      const camel = toCamelCase(prop.key, false)
      const src = prop.key
      return camel === src ? src : src + ': ' + camel
    }).join(',\n    ') %>
  }
}
