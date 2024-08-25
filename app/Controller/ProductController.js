const { array } = require("joi");
var { categori, product } = require("../Models/ProducctModels")

var views = {
    header: 'header',
    footer: 'footer',
}
var arrayCate = [];
categori.getCategori(function (data) {
    // Xử lý dữ liệu danh mục
    arrayCate = data;
    views.cate = arrayCate;
});
exports.index = function (req, res) {
    if (!req.query.page) { page = 1 }
    else {
        page = req.query.page;
    }
    product.getColumPage((err, count) => {
        views.pagination = count;
    });
    views.currentPage = parseInt(page);
    views.hrefPage = '';
    product.getAllPrd(function (data) {// in ra tất cả sản phẩmphẩm
        views.prd = data;
        res.render('Product/allProduct', views);
    }, page);
}
exports.getProductByMeta = function (req, res) {
    var check = [];
    if (!req.query.page) { page = 1 }
    else {
        page = req.query.page;
    }
    views.currentPage = parseInt(page);
    arrayCate.forEach(function (value) {
        if (req.params.meta == value.MetaCate && value.ParentCate == 0) {
            check = {
                "by": "IdCate",
                "id": value.IDCate
            };
            product.getColumPageByMeta(check,(err, count) => {
                views.pagination = count;
            });
            views.hrefPage = req.params.meta;
            categori.getProductByMeta(check, function (data) {
                views.prd = data;
                res.render('Product/allProduct', views);
            },page);
            return;
        }
        if (req.params.meta == value.MetaCate && value.ParentCate != 0) {
            check = {
                "by": "ParentCate",
                "id": value.IDCate
            };
            product.getColumPageByMeta(check,(err, count) => {
                views.pagination = count;
            });
            views.hrefPage = req.params.meta;
            categori.getProductByMeta(check, function (data) {
                views.prd = data;
                res.render('Product/allProduct', views);
            },page);
            return;
        }

    });
}
exports.getDataProduct = function (req, res) {
    let data = {};
    product.getDataPrd(req.params.metaPrd, function (dataPrd) {
        if (dataPrd) {
            data['prd'] = dataPrd;
            console.log(dataPrd);
            product.getReviewByPrd(dataPrd.IDPrd,function(dataReview){
                data['reviewPrd'] = dataReview;
                res.render('Product/singleProduct', data);
            })
        } else {
            res.status(404).send('Product not found');
        }
    });

}
exports.insertReview = function (req,res){
    const { stars, comment,idPrd } = req.body;
    console.log('Số sao nhận được:', stars);
    console.log('Bình luận nhận được:', comment);
    console.log('sản phẩm:', idPrd);
    console.log(req.session.IdAccount);
    product.insertReview(req.session.IdAccount,idPrd,comment,stars)

    // Trả về phản hồi cho client
    res.json({ message: 'Nhận dữ liệu thành công', stars, comment });
}
