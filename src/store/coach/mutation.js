export default {
    register(state, payload){
        state.coaches.push(payload)
    },
    setCoach(state, payload){
        state.coaches = payload
    }
}