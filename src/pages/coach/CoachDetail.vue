<template>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>{{ rate }}</h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <h2>Interested? Reach out now!</h2>
            <base-button isLink :dest="coachContactLink">Contact</base-button>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in selectedCoach.areas" :key="area" :title="area" :type="area"></base-badge>
            <p>{{ selectedCoach.description }}</p>
        </base-card>
    </section>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return {
            selectedCoach: null
        }
    },
    computed: {
        fullName(){
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
        },
        rate(){
            return `$${this.selectedCoach.hourlyRate}/hour`
        },
        coachContactLink(){
            return `/coaches/${this.id}/contact`
        }
    },
    created() {
        this.selectedCoach = this.$store.getters['coach/coaches'].find(coach => coach.id === this.id)
    }
}
</script>