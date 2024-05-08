const { array } = require("joi");
var { categori, product } = require("../Models/ProducctModels")

var views = {
    header : 'header',
    footer : 'footer',
}
var arrayCate = [];
categori.getCategori(function(data) {
    // Xử lý dữ liệu danh mục
        arrayCate = data;
        views.cate = arrayCate;
});
exports.index = function(req,res){  
            product.getAllPrd(function(data){// in ra tất cả sản phẩmphẩm
                views.prd = data;
                res.render('Product/allProduct',views);
            });
}
exports.getProductByMeta = function(req,res){
    arrayCate.forEach(function(value){
        if(req.params.meta == value.MetaCate){
            categori.getProductByMeta(value.IDCate,function(data){
                views.prd = data;
                res.render('Product/allProduct',views);
            });
            return;
        }

    });
}