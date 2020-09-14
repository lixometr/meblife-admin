import api from "@/plugins/api"
export const namespaced = true
export const state = () => ({
    currencies: []
})
export const getters = {
    currencies(state) {
        return state.currencies
    },
    getCurrency(state) {
        return (id) => {
            return state.currencies.find(cur => cur._id === id) || {}
        }
    }
}
export const mutations = {
    setcurrencies(state, currencies) {
        state.currencies = currencies
    }
}
export const actions = {
    async fetch({ commit }) {
        const {data: currencies} = await api.get('currencies')
        commit('setcurrencies', currencies)
    }
}