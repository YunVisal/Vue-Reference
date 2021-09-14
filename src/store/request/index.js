import mutation from "./mutation"
import action from "./action"
import getter from "./getter"

const requestModule = {
    namespaced: true,
    state(){
        return {
            requests: []
        }
    },
    mutations: mutation,
    actions: action,
    getters: getter
}

export default requestModule