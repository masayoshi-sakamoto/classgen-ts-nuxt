import { Module } from 'vuex'
import { RootState } from '@/store'
import mutations from '@/store/<%= classname %>/mutations'
import { path } from '@/store/<%= classname %>/types'
import { mutation } from '@/utils/mutation'
import state, { I<%= className %>State } from '@/store/<%= classname %>/state'

export * from '@/store/<%= classname %>/state'

export const store: Module<I<%= className %>State, RootState> = {
  state,
  mutations: mutation(mutations, path)
}
