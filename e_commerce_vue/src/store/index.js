// this is imported from vuex , nothing that u made 
import { createStore } from 'vuex'

export default createStore({
  // state is js objects and has items as atribute
  state: {
    // cart is nested js objects and has items as atribute
    local_storage_cart: {
        items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {
      // if cart exists,and exists check else,  then state.local_storage_cart = JSON.parse(localStorage.getItem('cart'))
      // this will be called only when page is reloded 
      // this is to update cart when page is reloded,we use here beforeCreate hook , get items from cart from local 
      // storage when page is reloaded update local_storage_cart,  add them to local_storage_cart
      if (localStorage.getItem('cart')) {
        state.local_storage_cart = JSON.parse(localStorage.getItem('cart'))
        // console.log('items YES',state.cart)
      } else {
        // this is created when website is open very first time in firefox ,so only 1 time when u close down firefox and open again
        // we are setting creating local storage
        localStorage.setItem('cart', JSON.stringify(state.local_storage_cart))
        // console.log('items NOT', state.cart)
      }

      if (localStorage.getItem('token')) {
          state.token = localStorage.getItem('token')
          state.isAuthenticated = true
      } else {
          state.token = ''
          state.isAuthenticated = false
      } 
    },
    // here you will add items(objects) from Products.vue
    // exists will filter out any double items from state.local_storage_cart.items, exists.length will return always 1
    // when 1st item added """if (exists.length)""" is skipped
    // exists[0].quantity is just to accses item in the array , the array always contains 1 item coz of filter 
    //  exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity) here we change item.quantity 
    // so remember you can change easy item quantity just by adding """item.quantity = 30""" if u want
    addToCart(state, item) {
      const exists = state.local_storage_cart.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } 
      else {
        //  you push items from Product.vue into state.cart.item[] then accses them in app.vue
        state.local_storage_cart.items.push(item)
        // console.log( state.local_storage_cart.items)
      }

      localStorage.setItem('cart', JSON.stringify(state.local_storage_cart))
      // console.log(state.cart)
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },  
    // removeToken(state) {
    //     state.token = ''
    //     state.isAuthenticated = false
    // },
    // clearCart(state) {
    //   state.cart = { items: [] }

    //   localStorage.setItem('cart', JSON.stringify(state.cart))
    // },
  },
  actions: {
  },
  modules: {
  }
})
