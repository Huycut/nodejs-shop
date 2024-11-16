const { func } = require('joi');
var cart = require('../Models/CartModels');
var views = {
    header : 'header',
    footer : 'footer',
}
exports.index = function(req, res) {
    cart.dataCart(function(result){
        if(result === null ){
            views.dataCart = ''
        }else{
            views.dataCart = result; 
        }
        res.render('Product/cart', views);     
    });
    
    
};
exports.addToCart = function(req,res){
    let productId = req.body.id;
    cart.addToCart(productId,req.body.size,function(result){
        if(result === 1){
            res.status(200).json({ success: 'Thêm vào giỏ hàng thành công' });
        }
        else if (result ===2){
            res.status(200).json({ success: 'Sản phẩm đã có trong giỏ hàng' });
        }
        else
        {
            res.status(500).json({ error: 'Lỗi khi thêm vào giỏ hàng' });
        }

    });
}
exports.updateQuantity = function(req,res){
    let productId = req.body.productId;
    let newQuantity = req.body.newQuantity;
    cart.updateQuantity(newQuantity,productId);
}
exports.deleteCart = function(req,res){
    let idPrd = req.body.productId;
    cart.deleteCart(idPrd,function(result){
        if(result === 1 ){
            res.json({success:true});
        }
    })
}