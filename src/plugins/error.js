function errorHandler(notify) {
    return (err) => {
        console.log(err)
        notify({
            group: "main",
            type: 'error',
            title: "Ошибка",
            message: err.message
        })
    }
}
export default {
    install(Vue, notify) {
        Vue.prototype.$error = errorHandler(notify)
    }
}