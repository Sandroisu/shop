Vue.component('products', {
    data() {
        return {
            products: []
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                console.log(data)
                if (data === undefined) {
                    return;
                }
                for (const item of data) {
                    this.$data.products.push(item);
                }
            });
    },
    template: `<section class="case case__column case__margin_64">
                <h2 class="text text__black text__centered text__size_30">Featured items</h2>
                <div class="text text__gray text__centered text__size_14">Shop for  items based on what we featured in this week</div>
                    <div class="featured_cards_row case__padding_20">
                        <product v-for="item of products"
                        :key="item.id_product"
                        :product="item"></product>
                    </div>
                 <div class="full_width full_width__flex_center full_width__margin_48">
                      <a href="catalog.html" class="button button__white_button">Browse All Product</a>
                 </div>
            </section>`
});

Vue.component('product', {
    props: ['product'],
    template: `<a href="#" class="featured_card_content">
                <div class="featured_card_element"  @click="$root.$refs.cart.addProduct(product)">
                    <div class="featured_card_brightness">
                        <div class="button button__invisible_button">
                            Add to cart
                        </div>
                    </div>
                    <img :src="product.imgProduct" class="featured_card_image" alt="top left card">
                </div>
                <div class="featured_content_text">
                    <span class="text text__black text__uppercase text__size_14 text__b_margin">{{product.product_name}}</span>
                    <span class="text text__black text__size_14 text__b_margin">{{product.product_expl}}</span>
                    <span class="text text__pink text__size_16 text__b_margin">{{product.price}}</span>
                </div>
            </a>`
});