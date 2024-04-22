var { categori, product } = require("../Models/ProducctModels")

var views = {
    header : 'header',
    footer : 'footer',
}
exports.index = function(req,res){  
    categori.getCategori(function(data) {
    // Xử lý dữ liệu danh mục
        views.cate = data;
        categori.getParentCate(function(data){
            views.parentCate = data;
            product.getAllPrd(function(data){
                views.prd = data;
                console.log(views.prd);
                res.render('Product/allProduct',views);
            })
            
        })
        
      });
    
}
exports.getProductByMeta = function(req,res){
    console.log("aaaa");
}