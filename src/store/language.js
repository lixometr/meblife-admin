import api from "@/plugins/api"
export const namespaced = true
export const state = () => ({
    languages: ['ru']
})
export const getters = {
    languages(state) {
        return state.languages
    },
    getLanguage(state) {
        return (id) => {
            return state.languages.find(lang => lang._id === id) || {}
        }
    }
}
export const mutations = {
    setLanguages(state, languages) {
        state.languages = languages
    }
}
export const actions = {
    async fetch({ commit }) {
        const {data: languages} = await api.get('languages')
        commit('setLanguages', languages)
    }
}