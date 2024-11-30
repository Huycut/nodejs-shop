const { func } = require('joi');
const axios = require('axios');
var cart = require('../Models/CartModels');
const moment = require('moment');
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
        const districts = 'https://vapi.vnappmob.com/api/province/district/' + provinceCode;
        const response_districts = await axios.get(districts);
        const valuesArray = Object.values(response_districts.data.results);
        res.json(valuesArray);
    } catch (error) {
        console.error("looi" + error.message);
    }
};
exports.payment = (req, res, next) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    let config = require('config');
    
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = '';
    
    let locale = 'vn';
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
        
};
exports.vnpayReturn = (req,res)=>{
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        console.log('1');
        // res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        // res.render('success', {code: '97'})
        console.log('2');
    }
}
function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
