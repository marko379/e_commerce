<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image">
                </figure>

                <h1 class="title">{{ product.name }}</h1>

                <p>{{ product.description }}</p>
            </div>

            <div class="column is-3">
                <h2 class="subtitle">Information</h2>

                <p><strong>Price: </strong>${{ product.price }}</p>

                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>

                    <div class="control">
                        <a class="button is-dark" @click="addToCart()">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import { toast } from 'bulma-toast'
export default {
    name: 'Product',
    data() {
        return {
            product: {},
            quantity: 1
        }
    },
    mounted() {
        this.getProduct() 
    },
    methods: {
        //  when this page is mounted then this function will be executed 
        async getProduct(){
            // this is for to show loading arrows while we wait for data, check also app.vue
            this.$store.commit('setIsLoading', true)


            // i can accses values from url 
            const category_slug = this.$route.params.category_slug_vue
            const product_slug = this.$route.params.product_slug_vue

            // console.log(this.$route)

            //  get product based on category and product, check product.views in django 
            await axios.get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then(response => {
                    this.product = response.data
                    // document.title = this.product.name + ' | Djackets'
                })
                .catch(error => {
                    console.log(error)
        
                })

            this.$store.commit('setIsLoading', false)
        },
        addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }
            // here u are making new object item with all atributes and methods thats product has:
            //description: "this is winter-jacket" get_absolute_url: "/winter/winter-jacket/" get_image: "http://127.0.0.1:8000/media/uploads/winter3.jpg" get_thumbnail :  "http://127.0.0.1:8000/media/uploads/uploads/winter3.jpg" 
            // id : 2 name : "Winter Jacket" price:  "499.00")
            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.commit('addToCart', item)
            // toast({
            //     message: 'The product was added to the cart',
            //     type: 'is-success',
            //     dismissible: true,
            //     pauseOnHover: true,
            //     duration: 2000,
            //     position: 'bottom-right',
            // })
        }
    }
}
</script>