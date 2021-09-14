<template>
    <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @register="register"></coach-form>
    </base-card>
</template>

<script>
import CoachForm from '../../components/coach/CoachForm.vue'

export default {
    components: {
        CoachForm
    },
    methods: {
        register(data){
            this.$store.dispatch('coach/register', data)
            this.$router.replace('/')
        }
    }
}
</script>