export default {
    async register(context, payload){
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: payload.firstname,
            lastName: payload.lastname,
            areas: payload.areas,
            description: payload.description,
            hourlyRate: payload.rate
        }

        const response = await fetch(`https://coach-finder-c96ea-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        })

        // const responseData = await response.json()

        if(!response.ok){
            // ... todo
        }

        context.commit('register', {
            ...coachData,
            userId: userId
        })
    },
    async loadCoaches(context){
        const response = await fetch(`https://coach-finder-c96ea-default-rtdb.firebaseio.com/coaches.json`)

        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to fetch data!")
            throw error;
        }

        const coaches = []
        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate
            }
            coaches.push(coach)
        }
        context.commit('setCoach', coaches)
    }
}