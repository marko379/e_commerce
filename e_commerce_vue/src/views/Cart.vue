<template>
    <div class="page-cart" style="border:solid;">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Cart</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        <!-- you will pass trough component CartItem  props(data) trough here i think  -->
                        <!-- v-bind:initialItem="item" this item represents every item object from v-for-->
                        <!-- v-on:removeFromCart="removeFromCart"  this is triggered with emit from CartItem.vue -->
                        <CartItem
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart" />
                    </tbody>
                </table>

                <p v-else>You don't have any products in your cart...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                {{ cartTotalLength }} items = <strong>${{ cartTotalPrice.toFixed(2) }}</strong> finall price

                <hr>

                <router-link to="/cart/checkout" class="button is-dark">Proceed to checkout</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// importing cartitems so we can pass to that component some data
import CartItem from '@/components/CartItem.vue'
export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.local_storage_cart
    },
    methods: {
        removeFromCart(item) {
            // filter(remove) out item, this was trigger by emit
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        cartTotalLength() {
            // this will startt automaticly
            // acc = 0  is autoamticlly set as initiall value
            // curVal = this.cart.items
            //  remember that you store items in your local storage with added quantity 
            // const item = {product: this.product, quantity: this.quantity}
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            // const item = {product: this.product, quantity: this.quantity}
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price *  curVal.quantity
            }, 0)
        },
    }
}
</script>