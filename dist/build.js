/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/front/CartComponent.js":
/*!***************************************!*\
  !*** ./public/front/CartComponent.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('cart', {\r\n    data() {\r\n        return {\r\n            cartItems: [],\r\n            totalPrice: 0\r\n        }\r\n    },\r\n\r\n    mounted() {\r\n        this.$parent.getJson('/api/cart')\r\n            .then(data => {\r\n                console.log(\"cartComponentMounted\")\r\n                for (const item of data.contents) {\r\n                    this.cartItems.push(item);\r\n                    this.totalPrice += item.price * item.quantity;\r\n                }\r\n                console.log(this.cartItems)\r\n            });\r\n    },\r\n    methods: {\r\n        addProduct(product) {\r\n            console.log(product)\r\n            const existing = this.cartItems.find(item => item.id_product === product.id_product);\r\n            if (existing) {\r\n                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: 1 })\r\n                    .then(data => {\r\n                        if (data.result) {\r\n                            existing.quantity++;\r\n                            this.totalPrice += existing.price;\r\n                        }\r\n                    })\r\n            } else {\r\n                const newItem = Object.assign({ quantity: 1 }, product);\r\n                console.log(newItem)\r\n                this.$parent.postJson(`api/cart/${product.id_product}/${product.product_name}`, newItem)\r\n                    .then(data => {\r\n                        if (data.result) {\r\n                            this.cartItems.push(newItem);\r\n                            this.totalPrice += product.price;\r\n                        }\r\n                    });\r\n            }\r\n        },\r\n        remove(product) {\r\n            if (product.quantity > 1) {\r\n                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: -1 })\r\n                    .then(data => {\r\n                        if (data.result) {\r\n                            product.quantity--;\r\n                            this.totalPrice -= product.price;\r\n                        }\r\n                    })\r\n            } else {\r\n                this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)\r\n                    .then(data => {\r\n                        if (data.result) {\r\n                            this.cartItems.splice(this.cartItems.indexOf(product), 1);\r\n                            this.totalPrice -= product.price;\r\n                        } else {\r\n                            console.log('error');\r\n                        }\r\n                    })\r\n            }\r\n        }\r\n    },\r\n    template: `<div class=\"basket\">\r\n                    <div class=\"basket_badge\" id=\"basketCounter\">{{cartItems.length}}</div>\r\n                        <a href=\"cart.html\"><img src=\"./img/basket.svg\" alt=\"basket\"></a>\r\n                        <div class=\"basket_pointer\"></div>\r\n                        <div class=\"basket_menu\">\r\n                            <cart-single-item v-for=\"item of cartItems\"\r\n                            :key=\"item.id_product\"\r\n                            :cart-item=\"item\"\r\n                            @remove=\"remove\"></cart-single-item>\r\n                        <span class=\"text text__black text__capitalize text__size_14\" v-show=\"cartItems.length===0\">Cart is empty</span>\r\n                        <div class=\"text text__pink text__t_margin text__uppercase text__size_18\" v-show=\"cartItems.length!==0\">Total: {{totalPrice}} $</div>\r\n                    </div>\r\n                </div>`\r\n});\r\n\r\nVue.component('CartSingleItem', {\r\n    props: ['cartItem'],\r\n    template: ` <div class=\"basket_link\" href=\"#\">\r\n                    <img class=\"basket_image fluid_image\" :src=\"cartItem.imgProduct\" alt=\"product image\">\r\n                    <div class=\"basket_item_info\" href=\"#\">\r\n                        <div class=\"text text__black text__size_12  text__uppercase\">{{cartItem.product_name}}</div>\r\n                        <div class=\"text text__black text__size_12 text__capitalaize\">Price: \r\n                            <span class=\"text text__pink text__size_12\">{{cartItem.price}} $</span> \r\n                        </div>\r\n                        <div class=\"text text__black text__size_12 text__capitalaize\">Quantity: \r\n                            <span class=\"text text__pink text__size_12\">{{cartItem.quantity}}</span> \r\n                        </div>\r\n                        <div class=\"text text__black text__size_12 text__capitalaize\">{{cartItem.product_name}} total: \r\n                            <span class=\"text text__pink text__size_12\">{{cartItem.quantity*cartItem.price}} $</span> \r\n                        </div>\r\n                        <button class=\"remove_button\" @click=\"$emit('remove', cartItem)\">Remove</button>\r\n                    </div>\r\n                </div>`\r\n});\n\n//# sourceURL=webpack://shop/./public/front/CartComponent.js?");

/***/ }),

/***/ "./public/front/ProductComponent.js":
/*!******************************************!*\
  !*** ./public/front/ProductComponent.js ***!
  \******************************************/
/***/ (() => {

eval("Vue.component('products', {\r\n    data() {\r\n        return {\r\n            products: []\r\n        }\r\n    },\r\n    mounted() {\r\n        this.$parent.getJson('/api/products')\r\n            .then(data => {\r\n                console.log(data)\r\n                if (data === undefined) {\r\n                    return;\r\n                }\r\n                for (const item of data) {\r\n                    this.$data.products.push(item);\r\n                }\r\n            });\r\n    },\r\n    template: `<section class=\"case case__column case__margin_64\">\r\n                <h2 class=\"text text__black text__centered text__size_30\">Featured items</h2>\r\n                <div class=\"text text__gray text__centered text__size_14\">Shop for  items based on what we featured in this week</div>\r\n                    <div class=\"featured_cards_row case__padding_20\">\r\n                        <product v-for=\"item of products\"\r\n                        :key=\"item.id_product\"\r\n                        :product=\"item\"></product>\r\n                    </div>\r\n                 <div class=\"full_width full_width__flex_center full_width__margin_48\">\r\n                      <a href=\"catalog.html\" class=\"button button__white_button\">Browse All Product</a>\r\n                 </div>\r\n            </section>`\r\n});\r\n\r\nVue.component('product', {\r\n    props: ['product'],\r\n    template: `<a href=\"#\" class=\"featured_card_content\">\r\n                <div class=\"featured_card_element\"  @click=\"$root.$refs.cart.addProduct(product)\">\r\n                    <div class=\"featured_card_brightness\">\r\n                        <div class=\"button button__invisible_button\">\r\n                            Add to cart\r\n                        </div>\r\n                    </div>\r\n                    <img :src=\"product.imgProduct\" class=\"featured_card_image\" alt=\"top left card\">\r\n                </div>\r\n                <div class=\"featured_content_text\">\r\n                    <span class=\"text text__black text__uppercase text__size_14 text__b_margin\">{{product.product_name}}</span>\r\n                    <span class=\"text text__black text__size_14 text__b_margin\">{{product.product_expl}}</span>\r\n                    <span class=\"text text__pink text__size_16 text__b_margin\">{{product.price}}</span>\r\n                </div>\r\n            </a>`\r\n});\n\n//# sourceURL=webpack://shop/./public/front/ProductComponent.js?");

/***/ }),

/***/ "./public/front/main.js":
/*!******************************!*\
  !*** ./public/front/main.js ***!
  \******************************/
/***/ (() => {

eval("const app = new Vue({\r\n    el: '#app',\r\n    methods: {\r\n        getJson(url) {\r\n            return fetch(url)\r\n                .then(result => result.json())\r\n                .catch(error => console.log(error))\r\n        },\r\n        postJson(url, data) {\r\n            console.log(url)\r\n            return fetch(url, {\r\n                method: 'POST',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => console.log(error))\r\n        },\r\n        putJson(url, data) {\r\n            return fetch(url, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => console.log(error))\r\n        },\r\n        delJson(url, data) {\r\n            return fetch(url, {\r\n                method: 'DELETE',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => console.log(error))\r\n        },\r\n    },\r\n});\n\n//# sourceURL=webpack://shop/./public/front/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/front/main.js"]();
/******/ 	__webpack_modules__["./public/front/CartComponent.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/front/ProductComponent.js"]();
/******/ 	
/******/ })()
;