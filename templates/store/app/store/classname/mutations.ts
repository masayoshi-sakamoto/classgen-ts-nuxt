import { MutationTree } from 'vuex'
import { I<%= className %>State, state as init } from '@/store/<%= classname %>'
import { Types, Store, Fetched, Query, Options, Loading, Current } from '@/store/<%= classname %>/types'

const mutations: MutationTree<I<%= className %>State> = {
  [Types.store]: (state, action: Store) => {
    for (const prop of action.payload) {
      if (prop.id) {
        state.byIds = {
          ...state.byIds,
          [prop.id]: prop
        }
      }
    }
  },
  [Types.fetched]: (state, action: Fetched) => {
    state.fetched = action.payload
  },
  [Types.query]: (state, action: Query) => {
    state.query = action.payload
  },
  [Types.options]: (state, action: Options) => {
    state.options = action.payload
  },
  [Types.loading]: (state, action: Loading) => {
    state.loading = action.payload
  },
  [Types.current]: (state, action: Current) => {
    state.current = action.payload
  }}

export default mutations
