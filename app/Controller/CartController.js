var cart = require('../Models/CartModels');
var views = {
    header : 'header',
    footer : 'footer',
}
exports.index = function(req, res) {
    res.render('Product/cart', views);
};
exports.addToCart = function(req,res){
    let productId = req.body.id;
    cart.addToCart(1);
}