/* eslint camelcase: 0 */
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
    <%= Object.values(schemas).map((prop) => {
      const camel = toCamelCase(prop.key, false)
      const model = toCamelCase(prop.key)
      const src = prop.ref ? `to${model}Props(${prop.key})` : prop.key
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
