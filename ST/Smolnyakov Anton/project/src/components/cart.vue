<template>
    <div class="headerCartWrapInAll">
        <div id="cart" class="d-flex flex-column">
            <!--basket/CART ITEMS Here-->
            <item v-for="item of items"
                  type="cart"
                  :key="item.id"
                  :item="item"
                  @remove="remove"
            />
        </div>

        <div class="headerCartWrapTotalPrice">
            <div>total</div>
<!--            <div id="totalSum">{{ renderTotalSum }}</div>-->
        </div>

        <button type="button" class="productsButtonIndex">Checkout</button>
        <button type="button" class="productsButtonIndex">Go to cart</button>
    </div>
</template>

<script>
    import item from './item.vue';
    import {
        get,
        put,
        del,
        post
    } from '../utils/reqs.js';


    export default {
        components: {item},
        data() {
            return {
                url: "/api/cart",
                items: [],
                // totalSum: null,
            }
        },

        mounted() {
            get(this.url)
                .then(cart => {
                    this.items = cart.contents
                });
        },

        methods: {
            add(item) {
                let find = this.items.find(el => el.id == item.id);
                if (!find) {
                    let newItem = Object.assign({}, item, {
                        amount: 1
                    });
                    post(this.url, newItem)
                        .then(res => {
                            if (res.status) {
                                this.items.push(newItem)
                            } else {
                                console.log('Server err')
                            }
                        })
                } else {
                    put(`${this.url}/${item.id}`, 1)
                        .then(res => {
                            if (res.status) {
                                find.amount++
                            } else {
                                console.log('Server err')
                            }
                        })
                }
            },

            remove(item) {
                let find = this.items.find(el => el.id == item.id);
                if (find.amount > 1) {
                    put(`${this.url}/${item.id}`, -1)
                        .then(res => {
                            if (res.status) {
                                find.amount--
                            } else {
                                console.log('Server err')
                            }
                        })
                } else {
                    del(`${this.url}/${item.id}`)
                        .then(res => {
                            if (res.status) {
                                this.items.splice(this.items.indexOf(find), 1);
                            } else {
                                console.log('Server err')
                            }
                        })
                }
            },
        },

        // computed: {
        //     renderTotalSum() {
        //         let sum = 0;
        //         this.totalSum = sum;
        //         this.items.forEach(item => {
        //             sum += +item.price * +item.amount;
        //         });
        //         return "$" + sum;
        //     },
        // },
    }

</script>

<style scoped>

</style>