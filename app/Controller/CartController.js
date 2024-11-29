const { func } = require('joi');
const axios = require('axios');
var cart = require('../Models/CartModels');
const provinces = 'https://vapi.vnappmob.com/api/province/';
var views = {
    header: 'header',
    footer: 'footer',
}
exports.index = function (req, res) {
    cart.dataCart(function (result) {
        if (result === null) {
            views.dataCart = ''
        } else {
            views.dataCart = result;
        }
        res.render('Product/cart', views);
    });


};
exports.addToCart = function (req, res) {
    let productId = req.body.id;
    cart.addToCart(productId, req.body.size, function (result) {
        if (result === 1) {
            res.status(200).json({ success: 'Thêm vào giỏ hàng thành công' });
        }
        else if (result === 2) {
            res.status(200).json({ success: 'Sản phẩm đã có trong giỏ hàng' });
        }
        else {
            res.status(500).json({ error: 'Lỗi khi thêm vào giỏ hàng' });
        }

    });
}
exports.updateQuantity = function (req, res) {
    let productId = req.body.productId;
    let newQuantity = req.body.newQuantity;
    cart.updateQuantity(newQuantity, productId);
}
exports.deleteCart = function (req, res) {
    let idPrd = req.body.productId;
    cart.deleteCart(idPrd, function (result) {
        if (result === 1) {
            res.json({ success: true });
        }
    })
}
exports.updateSize = function (req, res) {
    const { productId, size } = req.body;
    cart.updateSize(productId, size, function (result) {
        if (result === 1) {
            res.json({ success: true });
        }
    });
}
exports.checkout = async (req, res) => {
    try {
        const response_provinces = await axios.get(provinces);
        views.provinces = response_provinces.data.results;
    } catch (error) {
        console.error(error.message);
    }
    res.render('checkout', views);

};
exports.districts = async (req, res) => {
    var provinceCode = req.query.provinceCode;
    try {
        const districts = 'https://vapi.vnappmob.com/api/province/district/'+provinceCode;
        const response_districts = await axios.get(districts);
        const valuesArray = Object.values(response_districts.data.results);
        res.json(valuesArray);
    } catch (error) {
        console.error("looi" +error.message);
    }
};
exports.payment = (req,res,next)=>{
    var ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    
        var config = require('config');
        var dateFormat = require('dateformat');
    
        
        var tmnCode = config.get('vnp_TmnCode');
        var secretKey = config.get('vnp_HashSecret');
        var vnpUrl = config.get('vnp_Url');
        var returnUrl = config.get('vnp_ReturnUrl');
    
        var date = new Date();
    
        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = req.body.amount;
        var bankCode = req.body.bankCode;
        
        var orderInfo = req.body.orderDescription;
        var orderType = req.body.orderType;
        var locale = req.body.language;
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }
    
        vnp_Params = sortObject(vnp_Params);
    
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    
        res.redirect(vnpUrl)
};
