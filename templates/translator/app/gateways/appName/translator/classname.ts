/* eslint camelcase: 0 */
import { toOrganizationProps } from './organization'
import { toShopProps } from './shop'
import { toRoleProps } from './role'
import { Admin, AdminSeed } from '@/infrastructure/network/Bambooo/schema'
import { IAdminProps, EmptyAdminPropsFactory } from '@/entities/Admin'

export const toAdminProps = (props: Admin | null): IAdminProps => {
  if (!props) {
    return EmptyAdminPropsFactory()
  }

  const { id, role, role_id, name, username, organization, shop } = props
  return {
<%_ for (const schema of Object.values(schemas)) { _%>
  <%= schema.required && schema.key !== 'id' ? toCamelCase(schema.key, false) : toCamelCase(schema.key, false)+'?' %>: <% if(schema.ref) { %>I<%= schema.tstype %>Props<% } else { %><%= schema.tstype %><% } %>
<%_ } _%>
  }
}

export const toAdminSeed = (props: IAdminProps): AdminSeed => {
  const { id, name, username, roleId } = props
  return {
    id,
    name,
    username,
    role_id: roleId
  }
}
