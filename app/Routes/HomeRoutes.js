module.exports = function(router){
    var HomeController = require('../Controller/HomeController')
    var ProductController = require('../Controller/ProductController')
    var CartController = require('../Controller/CartController')
    router.get('/',HomeController.index);
    
    router.get('/login.html',HomeController.pageLogin);
    router.post('/loginPost',HomeController.login);
    router.get('/register.html',HomeController.pageCreate);
    router.post('/registerPost',HomeController.createAccount);
    router.get('/logout',HomeController.logout);
    //
    router.get('/cart.html',CartController.index);
    //
    router.get('/product',ProductController.index);
    router.get('/product/:meta',ProductController.getProductByMeta);// in ra sản phẩm theo danh mục
    router.get('/:metaPrd',ProductController.getDataProduct);
    //
    
}

