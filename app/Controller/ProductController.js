//const views = require('../Controller/HomeController')
var views = {
    header : 'header',
    footer : 'footer',
}
exports.index = function(req,res){
    
    res.render('Product/allProduct',views);
}