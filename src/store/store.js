import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  loading: false
}
const getters = {
  isLoading(state) {
    return state.loading
  },
  horizontal() {
    return  { input: "col-lg-8", label: "col-lg-4 text-right pr-4" }
  }
}
const mutations = {
  startLoading(state) {
    state.loading = true
  },
  stopLoading(state) {
    state.loading = false
  },
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  }
}

const actions = {
  async init({commit}) {
    commit('user/initToken')
    const resolvers = [
      async () => {
        await this.dispatch('language/fetch')
        await this.dispatch('currency/fetch')
      }
    ].map(async func => await func())
    await Promise.all(resolvers)
  }
}
import * as language from "./language"
import * as currency from "./currency"
import * as user from "./user"

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    language,
    user,
    currency,
  }
})