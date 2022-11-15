<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
            </div>
            <!-- you are passing data to this component  -->
            <ProductBox v-for="product in category.products" v-bind:key="product.id" v-bind:product="product" />

                <!-- i could use props like this too or like above  -->
                <!-- <ProductBox :category="category" /> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import { toast } from 'bulma-toast'
import ProductBox from '@/components/ProductBox'
export default {
    name: 'Category',
    components: {
        ProductBox
    },
    data() {
        return {
            // it looks like data will be passed to category and  products array even we did not specified exactly array, we just did this  this.category = response.data
            category: {
                products: []
            }
        }
    },
    mounted() {
        this.getCategory()
    },
    // we need this if we reusing same component with diferent urls
    // we are watching changes on routing
    // with "to" and "from" we return objects with many properties (to.name)
    watch: {
        $route(to, from) {
            console.log(to)
            if (to.name === 'Category') {
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug
            // console.log(categorySlug,'cccccccccccccccccccccccccc')
            this.$store.commit('setIsLoading', true)
            axios
                .get(`/api/v1/products/${categorySlug}/`)
                .then(response => {
                    // it looks like data will be passed to category and  products array even we did not specified exactly array, we just did this  this.category = response.data
                    this.category = response.data
                    document.title = this.category.name + ' | Djackets'
                })
                .catch(error => {
                    console.log(error)
                    // toast({
                    //     message: 'Something went wrong. Please try again.',
                    //     type: 'is-danger',
                    //     dismissible: true,
                    //     pauseOnHover: true,
                    //     duration: 2000,
                    //     position: 'bottom-right',
                    // })
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>