<template>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">{{error}}</base-dialog>
    <section>
        <base-card>
            <header>
                <h2>Requests Recieved</h2>
            </header>
            <base-spinner v-if="loading"></base-spinner>
            <ul v-else-if="hasRequest">
                <request-item
                    v-for="request in recievedRequest"
                    :key="request.id"
                    :email="request.email"
                    :message="request.message"
                >
                </request-item>
            </ul>
            <h3 v-else>You haven't recieved any requests yet</h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from '../../components/request/RequestItem.vue'

export default {
    components: {
        RequestItem
    },
    data(){
        return {
            error: null,
            loading: false
        }
    },
    computed: {
        recievedRequest(){
            return this.$store.getters['request/requests']
        },
        hasRequest(){
            return this.$store.getters['request/hasRequests']
        }
    },
    created(){
        return this.fetchRequests()
    },
    methods: {
        async fetchRequests(){
            this.loading = true
            try{
                const response = await this.$store.dispatch('request/fetchRequest')
                this.loading = false
                return response
            }catch(err){
                this.error = err.message || 'Something went wrong'
            }
        },
        handleError() {
            this.error = null;
        },
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>