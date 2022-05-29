<%_ for (const key of Object.keys(refs)) { _%>
import <%= refs[key].name %>Entity, { I<%= refs[key].name %>Props } from '@/entities/<%= refs[key].name %>'
<%_ } _%>
  
export interface I<%= className %>Props {
<%_ for (const key of Object.keys(schema)) { _%>
  <%= schema[key].required && schema[key].key !== 'id' ? toCamelCase(schema[key].key, false) : toCamelCase(schema[key].key, false)+'?' %>: <% if(schema[key].ref) { %>I<%= schema[key].tstype %>Props<% } else { %><%= schema[key].tstype %><% } %>
<%_ } _%>
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
    return JSON.parse(JSON.stringify(this._props))
  }
<%_ for (const key of Object.keys(schema)) { _%>
  
  get <%= toCamelCase(schema[key].key, false) %>(): <% if (schema[key].ref) { %><%= schema[key].tstype %>Entity<%} else { %><%= schema[key].tstype %><% } %> {
  <%_ if (schema[key].ref) { _%>
    return new <%= schema[key].tstype %>Entity(this._props.<%= toCamelCase(schema[key].key, false) %>)
  <%_} else { _%>
    return this._props.<%= toCamelCase(schema[key].key, false) %>
  <%_ } _%>
  }
<%_ } _%>
}

export const headers = [
  { text: 'ID', value: 'id' },
<%_ for (const key of Object.keys(schema)) { _%>
  <%_ if (schema[key].title) { _%>
  { text: '<%= schema[key].title %>', value: '<%= toCamelCase(schema[key].key, false) %>' },
  <%_ } _%>
<%_ } _%>
]

export const Empty<%= className %>PropsFactory = (props?: Partial<I<%= className %>Props> | null): I<%= className %>Props => ({
<%_ for (const key of Object.keys(schema)) { _%>
  <%_ if (schema[key].required && schema[key].key !== 'id') {_%>
  <%= toCamelCase(schema[key].key, false) %>: <% if(schema[key].ref) { %>Empty<%= schema[key].tstype %>PropsFactory<% } else { %><%= schema[key].default %><% } %>,
  <%_ } _%>
<%_ } _%>
  ...props
})
