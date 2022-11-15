<template>
  <div id="wrapper">
    <nav class="navbar is-dark" ref="name" @click="handle">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>Djackets</strong></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
       <!-- v-bind:class="{'is-active': showMobileMenu }"  is-active is bulma or css property , so basicly here you say is-active = showMobileMenu can be (false or true), so that makes class is active true or false   -->
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
        <div class="navbar-start">
          <div class="navbar-item">

           <!-- action send you to the router automaticly -and looking for path: '/searchh',-->
            <form method="get" action="/searchh">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="What are you looking for?" name="query">
                </div>

                <div class="control">
                  <button class="button is-success">
                      <span class="icon">
                      <i class="fas fa-search"></i>
                      </span>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>

        <div class="navbar-end">
          <!-- polazna tocka za vidjet kategoriju
          <!- <router-link :to="{ name: 'Category' , params: {id: post.id}}"> -->
            <!-- check watch in Category.vue -->
          <router-link :to="{ name: 'Category' ,  params: {category_slug: 'summer'}}" class="navbar-item">sumerrr</router-link>
          <router-link :to="{ name: 'Category' ,  params: {category_slug: 'winter'}}" class="navbar-item">winterrr</router-link>

          <router-link to="/summer" class="navbar-item">Summer</router-link>
          <router-link to="/winter" class="navbar-item">Winter</router-link>

          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <!-- <router-link to="/my-account" class="button is-light">My account</router-link> -->
              </template>

              <template v-else>
                <!-- <router-link to="/log-in" class="button is-light">Log in</router-link> -->
              </template>

              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart ({{ cartTotalLength }})</span>
              </router-link>

            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- is-loading this is atribute of bulma.. @import '../node_modules/bulma'; -->
    <!-- here you accsessing   $store.state.isLoading-->
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <!-- accsesing router view, automaticlyit will show component based on url -->
    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>

</template>





<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}

</style>



<script>
import axios from 'axios'
export default {
  data(){
    return{
      // @click="showMobileMenu = !showMobileMenu"
      showMobileMenu: false,
      // ovo je zaduzeno za cart , provjeri computed and mounted 
      cart: {
        items: []
      }

    }
  },
  methods: {
    handle(){
      // console.log(this.$refs.name.classList[1])
    }
  },
  mounted() {
    this.cart = this.$store.state.local_storage_cart
    // console.log('mounted')
  },
  beforeMount(){
    // console.log('befireMount')
  },
  beforeCreate() {
    // commit 
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  // computed will be executed by itself, we use it when we need to dos something with data that depends about other data
 computed: {
      cartTotalLength() {
          let totalLength = 0
          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }
          return totalLength
      }
  }
}
</script>