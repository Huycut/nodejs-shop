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
    var check = [];
    arrayCate.forEach(function(value){
        if(req.params.meta == value.MetaCate && value.ParentCate == 0 ){
            check = {
                "by" : "IdCate",
                "id" : value.IDCate
            };
            categori.getProductByMeta(check,function(data){
                views.prd = data;
                res.render('Product/allProduct',views);
            });
            return;
        }
        if(req.params.meta == value.MetaCate && value.ParentCate != 0 ){
            check = {
                "by" : "ParentCate",
                "id" : value.IDCate
            };
            categori.getProductByMeta(check,function(data){
                views.prd = data;
                res.render('Product/allProduct',views);
            });
            return;
        }

    });
}
exports.getDataProduct = function(req,res){
    product.getDataPrd(req.params.metaPrd,function(data){
        res.render('Product/singleProduct',data[0]);
    });
    
}
