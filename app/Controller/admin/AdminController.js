const Hmodels = require('../../Models/admin/HomeModels');
const multer = require("multer");
const path = require("path");
const slugify = require('slugify');
const { categori } = require('../../Models/ProducctModels');
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
    sidebar: 'sidebar',
    footer: 'footer',
}
let childCate;
exports.index = (req, res) => {
    Hmodels.getColumPrd(value => {
        views.totalPrd = value;
        res.render('admin/home', views);
    });

};
exports.ListProduct = async (req, res) => {
    try {
        views.Prd = await Hmodels.getListProducts();
        const category = await Hmodels.getCategory();
        views.DataCate = category;
        childCate = category.category.childCategories;
        res.render('admin/managerPrd', views);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getParentCate = (req,res) =>{
    const parentId = req.params.parentId;
    const childCategories = childCate.filter(cat => cat.ParentCate == parentId);
    res.json(childCategories);
};
exports.SingleProduct = (req, res) => {
    Hmodels.getSingleProduct(req.params.id, (err, result) => {
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

    // Chuẩn bị dữ liệu để lưu vào database
    const newProduct = {
        IDPrd: IDPrd,
        NamePrd: productName,
        MetaPrd: productMeta,
        PricePrd: productPrice,
        TitlePrd: titlePrd,
        IdCate: productType,
        ParentCate: productStyle,
    };
    if (req.file) {
        const productImagePath = `/Img/${req.file.filename}`;
        newProduct.ImgPrd = productImagePath;
    }
    // Gọi model để lưu dữ liệu
    Hmodels.saveProduct(newProduct, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to save product." });
        }

        res.status(200).json({
            message: "Product saved successfully!",
        });
    });
};
exports.insertPrd = (req,res)=>{
    const { NamePrd, PricePrd, TitlePrd, IdCate, ParentCate } = req.body;
    const imageFile = req.file;    const MetaPrd = toSlugWithUpperCase(NamePrd);
    // Đường dẫn hình ảnh sau khi lưu
    const productImagePath = `/Img/${req.file.filename}`;
    const data = {
        NamePrd: NamePrd,
        MetaPrd: MetaPrd,
        PricePrd: PricePrd,
        TitlePrd: TitlePrd,
        IdCate: IdCate,
        ParentCate: ParentCate,
        ImgPrd: productImagePath,
    };
    Hmodels.insertPrd(data);
    // Giả lập thêm sản phẩm thành công
    res.json({ message: 'Thêm sản phẩm thành công!' });
};
function toSlugWithUpperCase(input) {// chuỗi biến kí tự có dấu thành ko có dấu
    const slug = slugify(input, {
      lower: true,   // Chuyển thành chữ thường
      strict: true   // Loại bỏ ký tự đặc biệt
    });
    return slug.replace(/(^|[-])\w/g, match => match.toUpperCase());
  }
