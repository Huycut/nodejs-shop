const Hmodels= require('../../Models/admin/HomeModels');
var views = {
    sidebar : 'sidebar',
    footer : 'footer',
}
exports.index = (req,res)=>{
    console.log(Hmodels.getColumPrd);
    res.render('admin/home',views);
};//s