
var views = {
    header : 'header',
    footer : 'footer',
}
exports.index = function(req, res) {
    res.render('Product/cart', views);
};