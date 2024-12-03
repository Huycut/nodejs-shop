const Hmodels= require('../../Models/admin/HomeModels');
var views = {
    sidebar : 'sidebar',
    footer : 'footer',
}
exports.index = (req,res)=>{
    Hmodels.getColumPrd(value =>{
        views.totalPrd = value;
        res.render('admin/home',views);
    });
    
};
exports.ListProduct = (req,res)=>{
    Hmodels.getListProducts((value)=>{
        views.Prd = value;
        res.render('admin/managerPrd',views);
    });
    
};
exports.SingleProduct = (req,res)=>{
    Hmodels.getSingleProduct(req.params.id,(err,result)=>{
        if (err) {
            return res.status(500).send(err); // Trả về lỗi nếu có
        }
        
        if (result.product.length > 0) {
            // Trả về cả product và category
            res.json({
                product: result.product[0], // Trả về sản phẩm đầu tiên
                category: result.category   // Trả về toàn bộ danh sách category
            });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
};