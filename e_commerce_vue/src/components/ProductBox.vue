<template>
    <!-- a iam accsesing objects from Product.vue -->
    <div class="column is-3">
        <div class="box">
            <figure class="image mb-4">
                <img v-bind:src="product.get_thumbnail">
            </figure>

            <h3 class="is-size-4">{{ product.name }}</h3>
            <p class="is-size-6 has-text-grey">${{ product.price }}</p>

            <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View details</router-link>
        </div>
    </div>
</template>

            <!-- 2 ways of dealing with props  -->
<!--            <div v-for="product in category.products" :key="product.id">
                    <h3 class="is-size-4">{{ product.name }}</h3>
                    <p class="is-size-6 has-text-grey">${{ product.price }}</p>
                 </div> 
 -->


<style scoped>
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
</style>



<script>
export default {
    // notice this way is like an object
    name: 'ProductBox',
    props: {
        // accsessing objects from Category.vue
        product: Object
    },
    // notice this way is like an array
    // props: ['category']

}
</script>

