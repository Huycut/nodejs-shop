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
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.json(result[0]); // Trả về sản phẩm đầu tiên
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
};