const Hmodels= require('../../Models/admin/HomeModels');
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Đặt thư mục lưu file
        const uploadPath = path.join(
            "C:/Users/ADMIN/OneDrive/Desktop/shop-shoes/node js/app/public/img"
        );
        cb(null, uploadPath); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Đặt tên file với timestamp
    },
});
exports.upload = multer({ storage: storage });
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
exports.SaveProduct = (req, res) => {
    const { IDPrd, productName, productMeta, productPrice, titlePrd, productType, productStyle } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!productName || !productPrice || productPrice <= 0) {
        return res.status(400).json({
            message: "Invalid input data. Please check product name and price.",
        });
    }

    // Kiểm tra file hình ảnh
    if (!req.file) {
        return res.status(400).json({
            message: "No image uploaded. Please upload a product image.",
        });
    }

    // Đường dẫn hình ảnh sau khi lưu
    const productImagePath = `/Img/${req.file.filename}`;

    // Chuẩn bị dữ liệu để lưu vào database
    const newProduct = {
        IDPrd: IDPrd,
        NamePrd: productName,
        MetaPrd: productMeta,
        PricePrd: productPrice,
        TitlePrd: titlePrd,
        IdCate: productType,
        ParentCate: productStyle,
        ImgPrd: productImagePath,
    };

    // Gọi model để lưu dữ liệu
    Hmodels.saveProduct(newProduct, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to save product." });
        }

        res.status(200).json({
            message: "Product saved successfully!",
            productId: result.insertId,
            productImage: productImagePath,
        });
    });
};
