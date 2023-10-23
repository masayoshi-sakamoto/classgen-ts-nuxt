import { Module } from 'vuex'
import { RootState } from '@/store'
import mutations from '@/store/data/mutations'
import { path } from '@/store/data/types'
import { mutation } from '@/utils/mutation'
import state, { IDataState } from '@/store/data/state'

export * from '@/store/data/state'

export const store: Module<IDataState, RootState> = {
  state,
  mutations: mutation(mutations, path)
}
