const { func } = require('joi');
const axios = require('axios');
var cart = require('../Models/CartModels');
const provinces = 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1';
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
        views.provinces = response_provinces.data.data;
        const response_districts = await axios.get(districts);
        views.districts = response_districts.data.data;
    } catch (error) {
        console.error(error.message);
    }
    res.render('checkout', views);
};
exports.districts = async (req, res) => {
    var provinceCode = req.query.provinceCode;
    try {
        const districts = 'https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode='+provinceCode+'&limit=-1';
        const response_districts = await axios.get(districts);
        const valuesArray = Object.values(response_districts.data.data);
        res.json(valuesArray[2]);
    } catch (error) {
        console.error("looi" +error.message);
    }
};