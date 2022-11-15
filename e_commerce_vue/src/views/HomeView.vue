<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
        <div class="hero-body has-text-centered">
            <p class="title mb-6">
                Welcome to Djacket
            </p>
            <p class="subtitle">
                The best jacket store online
            </p>
        </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

<!--       <ProductBox 
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product" /> -->
    </div>
  </div>

  <div v-for="product in latestProducts" :key="product.id">
    <br>
    <h3>{{product.name}}</h3>
    <h3>{{product.description}}</h3>
    <h3>{{product.get_absolute_url}}</h3>
    <img :src="product.get_thumbnail">
    <!-- v-bind:to and :to same thing -->
    <!-- :to="product.get_absolute_url"  this will return /Winter/winter-jacket/ somehing like that as string-->
    <!-- it will automaticly go to router  and match path: '/:category_slug_vue/:product_slug_vue', i think it matches coz: i specified 2 values /:category_slug_vue/:product_slug_vue' then i return 2 values /Winter/winter-jacket/  with product.get_absolute_url"-->
    <router-link :to="product.get_absolute_url" class="button is-dark mt-4">view details</router-link>
    <br>
  </div>
</template>

<!-- product is alredy retured -->




<script>
import axios from 'axios'
// import ProductBox from '@/components/ProductBox'
export default {
  name: 'HomeView',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    // ProductBox
  },
  mounted() {
    this.getLatestProducts()
    // document.title = 'Home | Djackets'
  },
  methods: {
   async getLatestProducts(){
    // this is for to show loading arrows while we wait for data
    this.$store.commit('setIsLoading', true)

    // axios.defaults.baseURL = 'http://127.0.0.1:8000/' + api/v1/latest-products/
    await axios.get('api/v1/latest-products/').then(response => {this.latestProducts = response.data}).catch(error => {console.log(error)})
    this.$store.commit('setIsLoading', false)
   }
  }
}
</script>








