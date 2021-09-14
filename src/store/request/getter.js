export default {
    requests(state, _, _2, rootGetters){
        const yourRequest = state.requests.filter(request => request.coachId === rootGetters.userId)
        return yourRequest
    },
    hasRequests(_, getters){
        return getters.requests.length > 0
    }
}