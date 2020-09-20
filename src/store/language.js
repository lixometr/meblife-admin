import api from "@/plugins/api"
export const namespaced = true
export const state = () => ({
    languages: [],
    activeLangIds: []
})
export const getters = {
    languages(state) {
        return state.languages
    },
    activeLanguages(state, getters) {
        return getters.languages.filter(lang =>state.activeLangIds.includes(lang._id))
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
        this.commit('language/setActiveLanguages', [languages[0]._id])
    },
    setActiveLanguages(state, arr) {
        state.activeLangIds = arr
    }
}
export const actions = {
    async fetch({ commit }) {
        const { data: languages } = await api.get('languages')
        commit('setLanguages', languages)
    }
}