var cate = require("../Models/ProducctModels")

var views = {
    header : 'header',
    footer : 'footer',
}
exports.index = function(req,res){  
    cate.getCategori(function(data) {
    // Xử lý dữ liệu danh mục
        views.cate = data;
        cate.getParentCate(function(data){
            views.parentCate = data;
            res.render('Product/allProduct',views);
        })
        
      });

}
exports.getProductByMeta = function(req,res){
    console.log("aaaa");
}