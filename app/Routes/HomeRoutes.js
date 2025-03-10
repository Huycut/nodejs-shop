module.exports = function(router){
    var HomeController = require('../Controller/HomeController')
    var ProductController = require('../Controller/ProductController')
    var CartController = require('../Controller/CartController')
    var AdminController = require('../Controller/admin/AdminController');
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
    //router.get('/search',ProductController.search);// tìm kiếm sản phẩm bằng ajax
    router.get('/search/',ProductController.search);
    //
    router.get('/checkout',CartController.checkout);
    router.get('/api/districts',CartController.districts);
    router.post('/create_payment_url',CartController.payment);
    router.get('/checkout/vnpay_return',CartController.vnpayReturn);

    //router admin
    router.get('/admin/home',AdminController.index);
    router.get('/admin/ManagerProduct',AdminController.ListProduct);
    router.get('/categories/:parentId',AdminController.getParentCate);
    router.get('/admin/singleProduct/:id',AdminController.SingleProduct);
    router.post('/admin/saveProduct',AdminController.upload.single("productImage"),AdminController.SaveProduct);//router lưu khi chính sửa sp
    router.post('/admin/managerPrd/add',AdminController.upload.single("ImgPrd"),AdminController.insertPrd);// router thêm sản phẩmphẩm
}

