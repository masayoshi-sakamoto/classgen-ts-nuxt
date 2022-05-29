<%_ for (const ref of refs) { _%>
import <%= ref.name %>Entity, { I<%= ref.name %>Props } from '@/entities/<%= ref.name %>'
<%_ } _%>
  
export interface I<%= className %>Props {
<%_ for (const schema of Object.values(schemas)) { _%>
  <%= schema.required && schema.key !== 'id' ? toCamelCase(schema.key, false) : toCamelCase(schema.key, false)+'?' %>: <% if(schema.ref) { %>I<%= schema.tstype %>Props<% } else { %><%= schema.tstype %><% } %>
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
<%_ for (const schema of Object.values(schemas)) { _%>
  
  get <%= toCamelCase(schema.key, false) %>(): <% if (schema.ref) { %><%= schema.tstype %>Entity<%} else { %><%= schema.tstype %><% } %> {
  <%_ if (schema.ref) { _%>
    return new <%= schema.tstype %>Entity(this._props.<%= toCamelCase(schema.key, false) %>)
  <%_} else { _%>
    return this._props.<%= toCamelCase(schema.key, false) %>
  <%_ } _%>
  }
<%_ } _%>
}

export const headers = [
  { text: 'ID', value: 'id' },
<%_ for (const schema of Object.values(schemas)) { _%>
  <%_ if (schema.title) { _%>
  { text: '<%= schema.title %>', value: '<%= toCamelCase(schema.key, false) %>' },
  <%_ } _%>
<%_ } _%>
]

export const Empty<%= className %>PropsFactory = (props?: Partial<I<%= className %>Props> | null): I<%= className %>Props => ({
<%_ for (const schema of Object.values(schemas)) { _%>
  <%_ if (schema.required && schema.key !== 'id') {_%>
  <%= toCamelCase(schema.key, false) %>: <% if(schema.ref) { %>Empty<%= schema.tstype %>PropsFactory<% } else { %><%= schema.default %><% } %>,
  <%_ } _%>
<%_ } _%>
  ...props
})
