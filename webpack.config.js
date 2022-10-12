module.exports = {
    mode: 'development',
    entry: ['./public/front/main.js', './public/front/CartComponent.js', './public/front/ProductComponent.js'],
    output: {
        filename: './build.js'
    }
}