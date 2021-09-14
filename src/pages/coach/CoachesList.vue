<template>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <coach-filter @filter-coach="setFilter"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button :isLink="false" mode="outline" @click="loadCoach">Refresh</base-button>
                <base-button v-if="!isCoach" isLink dest="/register">Register as coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoach">
                <coach-item v-for="coach in filteredCoaches" 
                    :key="coach.id"
                    :id="coach.id"
                    :first-name="coach.firstName"
                    :last-name="coach.lastName"
                    :areas="coach.areas"
                    :hourly-rate="coach.hourlyRate">
                </coach-item>
            </ul>
            <h3 v-else>No coach found!</h3>
        </base-card>
    </section>
</template>


<script>
import CoachItem from '../../components/coach/CoachItem.vue'
import CoachFilter from '../../components/coach/CoachFilter.vue'
import BaseButton from '../../components/ui/BaseButton.vue'

export default {
    components: {
        CoachItem,
        BaseButton,
        CoachFilter
    },
    data(){
        return {
            options: {
                frontend: true,
                backend: true,
                career: true
            },
            isLoading: false,
            error: null
        }
    },
    computed: {
        hasCoach(){
            return this.$store.getters['coach/hasCoach']
        },
        filteredCoaches(){
            const filteredCoaches =  this.$store.getters['coach/coaches']
            return filteredCoaches.filter(coach => {
                if(this.options.frontend && coach.areas.includes('frontend')){
                    return true
                }
                if(this.options.backend && coach.areas.includes('backend')){
                    return true
                }
                if(this.options.career && coach.areas.includes('career')){
                    return true
                }
                return false
            })
        },
        isCoach(){
            return !this.isLoading && this.$store.getters['coach/isCoach']
        }
    },
    created(){
        return this.loadCoach()
    },
    methods: {
        setFilter(activeOption){
            this.options = activeOption
        },
        async loadCoach(){
            this.isLoading = true
            try{
                const coaches = await this.$store.dispatch('coach/loadCoaches')
                this.isLoading = false
                return coaches
            }catch(err){
                this.error = err.message || "Something went wrong!"
            }
        },
        handleError() {
            this.error = null;
        },
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>