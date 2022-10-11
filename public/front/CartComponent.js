Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            totalPrice: 0
        }
    },

    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                console.log("cartComponentMounted")
                for (const item of data.contents) {
                    this.cartItems.push(item);
                    this.totalPrice += item.price * item.quantity;
                }
                console.log(this.cartItems)
            });
    },
    methods: {
        addProduct(product) {
            console.log(product)
            const existing = this.cartItems.find(item => item.id_product === product.id_product);
            if (existing) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            existing.quantity++;
                            this.totalPrice += existing.price;
                        }
                    })
            } else {
                const newItem = Object.assign({ quantity: 1 }, product);
                console.log(newItem)
                this.$parent.postJson(`api/cart/${product.id_product}/${product.product_name}`, newItem)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(newItem);
                            this.totalPrice += product.price;
                        }
                    });
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                            this.totalPrice -= product.price;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            this.totalPrice -= product.price;
                        } else {
                            console.log('error');
                        }
                    })
            }
        }
    },
    template: `<div class="basket">
                    <div class="basket_badge" id="basketCounter">{{cartItems.length}}</div>
                        <a href="cart.html"><img src="./img/basket.svg" alt="basket"></a>
                        <div class="basket_pointer"></div>
                        <div class="basket_menu">
                            <cart-single-item v-for="item of cartItems"
                            :key="item.id_product"
                            :cart-item="item"
                            @remove="remove"></cart-single-item>
                        <span class="text text__black text__capitalize text__size_14" v-show="cartItems.length===0">Cart is empty</span>
                        <div class="text text__pink text__t_margin text__uppercase text__size_18" v-show="cartItems.length!==0">Total: {{totalPrice}} $</div>
                    </div>
                </div>`
});

Vue.component('CartSingleItem', {
    props: ['cartItem'],
    template: ` <div class="basket_link" href="#">
                    <img class="basket_image fluid_image" :src="cartItem.imgProduct" alt="product image">
                    <div class="basket_item_info" href="#">
                        <div class="text text__black text__size_12  text__uppercase">{{cartItem.product_name}}</div>
                        <div class="text text__black text__size_12 text__capitalaize">Price: 
                            <span class="text text__pink text__size_12">{{cartItem.price}} $</span> 
                        </div>
                        <div class="text text__black text__size_12 text__capitalaize">Quantity: 
                            <span class="text text__pink text__size_12">{{cartItem.quantity}}</span> 
                        </div>
                        <div class="text text__black text__size_12 text__capitalaize">{{cartItem.product_name}} total: 
                            <span class="text text__pink text__size_12">{{cartItem.quantity*cartItem.price}} $</span> 
                        </div>
                        <button class="remove_button" @click="$emit('remove', cartItem)">Remove</button>
                    </div>
                </div>`
});