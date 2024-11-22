const { array, func } = require("joi");
var { categori, product } = require("../Models/ProducctModels")

var views = {
    header: 'header',
    footer: 'footer',
}
var arrayCate = [];
var check = 0;
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
        views.salePrd = product.productsOnSale;
        views.check = 1;
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
    views.check = 2;    
    arrayCate.forEach(function (value) {
        if (req.params.meta == value.MetaCate && value.ParentCate == 0) {
            check = {
                "by": "IdCate",
                "id": value.IDCate
            };
            product.getColumPageByMeta(check, (err, count) => {
                views.pagination = count;
            });
            views.hrefPage = req.params.meta;
            categori.getProductByMeta(check, function (data) {
                views.prd = data;
                res.render('Product/allProduct', views);
            }, page);
            return;
        }
        if (req.params.meta == value.MetaCate && value.ParentCate != 0) {
            check = {
                "by": "ParentCate",
                "id": value.IDCate
            };
            product.getColumPageByMeta(check, (err, count) => {
                views.pagination = count;
            });
            views.hrefPage = req.params.meta;
            categori.getProductByMeta(check, function (data) {
                views.prd = data;
                res.render('Product/allProduct', views);
            }, page);
            return;
        }

    });
}
exports.getDataProduct = function (req, res) {
    let data = {};
    product.getDataPrd(req.params.metaPrd, function (dataPrd) {
        if (dataPrd) {
            data['prd'] = dataPrd;
            product.getRatingReivew(dataPrd.IDPrd, function (dataRating) {
                data['rating'] = dataRating;
                const totalPoints =
                    dataRating['1stars'] * 1 +
                    dataRating['2stars'] * 2 +
                    dataRating['3stars'] * 3 +
                    dataRating['4stars'] * 4 +
                    dataRating['5stars'] * 5;

                const totalReviews =
                    dataRating['1stars'] +
                    dataRating['2stars'] +
                    dataRating['3stars'] +
                    dataRating['4stars'] +
                    dataRating['5stars'];

                var averageRating = totalReviews > 0 ? (totalPoints / totalReviews).toFixed(2) : 0;
                data['averageRating'] = averageRating;
                data['totalReviews'] = totalReviews;
                product.getReviewByPrd(dataPrd.IDPrd, function (dataReview) {
                    data['reviewPrd'] = dataReview;
                    data['salePrd'] = product.productsOnSale;
                    data['cate'] = arrayCate;
                    res.render('Product/singleProduct', data);

                })
            });

        } else {
            res.status(404).send('Product not found');
        }
    });

}
exports.insertReview = function (req, res) {
    const { stars, comment, idPrd } = req.body;
    product.insertReview(req.session.IdAccount, idPrd, comment, stars);

    // Trả về phản hồi cho client
    res.json({ message: 'Nhận dữ liệu thành công', stars, comment });
}
exports.search = function (req,res){
    var valueSearch = req.body.keyword;
    product.search(valueSearch,function(dataSearch){
        res.json({data:dataSearch,dataSale:product.productsOnSale});
    });
}

