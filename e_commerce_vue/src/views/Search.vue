<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Search</h1>

                <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
            </div>

            <ProductBox 
                v-for="product in products"
                v-bind:key="product.id"
                v-bind:product="product" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue'
export default {
    name: 'Search',
    components: {
        ProductBox
    },
    data() {
        return {
            products: [],
            query: ''
        }
    },
    mounted() {
        document.title = 'Search | Djackets'
        // (window.location.search.substring(1)) will return ===   ?query=string(value) ,  ?query=jacket
        // The window.location object can be used to get the current page address (URL) 
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        console.log(params)
        if (params.get('query')) {
            // this query will return only value that u put in serach 
            // then u update query in data
            this.query = params.get('query')
            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)
            await axios
                // here you are sending post to server,you updating server and then pulling back data
                // {'query': this.query} === this is how you send data along with url
                .post('/api/v1/products/search/', {'query': this.query})
                .then(response => {
                    this.products = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>