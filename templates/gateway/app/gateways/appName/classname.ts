import { BamboooGatewayBase } from './base'
import { to<%= className %>Props, to<%= className %>Seed } from './translator/<%= classname %>'
import { optionsToQuery, toQueryProps } from './translator/query'
import { toOptionsProps } from './translator/options'
import { Get<%= className %>, Fetch<%= className %>s, Post<%= className %>, Put<%= className %>, Delete<%= className %> } from '@/infrastructure/network/Bambooo/requests/<%= classname %>'
import { I<%= className %>Props, Empty<%= className %>PropsFactory } from '@/entities/<%= className %>'
import { IOptionsProps } from '@/entities/Options'

export default class <%= className %> extends BamboooGatewayBase {
  async Get<%= className %>(id: string): Promise<I<%= className %>Props> {
    const { <%= classname %> } = await this.apiClient.request(new Get<%= className %>(id))
    return <%= classname %> ? to<%= className %>Props(<%= classname %>) : Empty<%= className %>PropsFactory()
  }

  async Fetch<%= className %>s(options?: IOptionsProps) {
    const response = await this.apiClient.request(new Fetch<%= className %>s(optionsToQuery(options)))
    return {
      items: response.<%= classname %>s.map((prop) => to<%= className %>Props(prop)),
      query: toQueryProps(response.query),
      options: toOptionsProps(response.query)
    }
  }

  async Save<%= className %>(props: I<%= className %>Props) {
    const data = props.id ? new Put<%= className %>(to<%= className %>Seed(props)) : new Post<%= className %>(to<%= className %>Seed(props))
    await this.apiClient.request(data)
  }

  async Delete<%= className %>(props: I<%= className %>Props) {
    if (props.id) {
      await this.apiClient.request(new Delete<%= className %>(props.id))
    }
  }
}