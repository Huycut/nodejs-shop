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
    router.post('/addToCart',CartController.addToCart);
    router.post('/updateQuantity',CartController.updateQuantity);
    router.post('/deleteCart',CartController.deleteCart);
    router.post('/update-size',CartController.updateSize);
    //
    //
    router.get('/products',ProductController.index);
    router.get('/collections/:meta',ProductController.getProductByMeta);// in ra sản phẩm theo danh mục
    router.get('/product/:metaPrd',ProductController.getDataProduct);// in ra thông tin sản phẩm
    router.post('/product/review',ProductController.insertReview);

    //
    
}

