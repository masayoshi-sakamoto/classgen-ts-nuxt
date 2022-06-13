import { MutationTree } from 'vuex'
import { IDataState } from '@/store/data'
import { Types, Loading, Saving, Removing, Dialog, Errors } from '@/store/data/types'

const mutations: MutationTree<IDataState> = {
  [Types.loading]: (state, action: Loading) => {
    state.loading = action.payload
  },

  [Types.saving]: (state, action: Saving) => {
    state.saving = action.payload
  },

  [Types.removing]: (state, action: Removing) => {
    state.removing = action.payload
  },

  [Types.dialog]: (state, action: Dialog) => {
    state.dialog = action.payload
  },

  [Types.errors]: (state, action: Errors) => {
    state.errors = action.payload === null ? {} : action.payload
  }
}

export default mutations