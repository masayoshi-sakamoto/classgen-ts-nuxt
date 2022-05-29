import { Module } from 'vuex'
import { RootState } from '@/store'
import mutations from '@/store/<%= className.toLowerCase() %>/mutations'
import { path } from '@/store/<%= className.toLowerCase() %>/types'
import { mutation } from '@/utils/mutation'
import state, { I<%= className %>State } from '@/store/<%= className.toLowerCase() %>/state'

export * from '@/store/<%= className.toLowerCase() %>/state'

export const store: Module<I<%= className %>State, RootState> = {
  state,
  mutations: mutation(mutations, path)
}
