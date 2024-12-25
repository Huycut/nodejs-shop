const db = require('../../commom/sqlHelper');
exports.getColumPrd = (result) => {
    db.query('SELECT COUNT(*)as total FROM product', (err, value) => {
        if (err) {
            console.log('lỗi khi truy vấn số lượng sản phẩm');
        }
        else {
            result(value[0].total);
        }
    });
};
exports.getCategory = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM categori', (err, value) => {
            if (err) {
                console.log('Lỗi khi tải danh mục:', err);
                reject(err);
            } else {
                const parentCategories = value.filter(cat => cat.ParentCate === 0);
                const childCategories = value.filter(cat => cat.ParentCate !== 0);
                resolve({category: { parentCategories, childCategories }});
            }
        });
    });
};

exports.getListProducts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM product', (err, value) => {
            if (err) {
                console.log('Lỗi khi tải danh sách sản phẩm:', err);
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
};
exports.getSingleProduct = (id, result) => {
    db.query('select * from product where IDPrd = ?', [id], (err, value) => {
        if (err) {
            result(err, null); // Trả về lỗi nếu xảy ra trong truy vấn đầu tiên
        }

        db.query('select * from categori', (err, valuee) => {
            if (err) {
                result(err, null); // Trả về lỗi nếu xảy ra trong truy vấn thứ hai
            }
            // Nếu cả hai truy vấn thành công, trả về cả hai kết quả
            const parentCategories = valuee.filter(cat => cat.ParentCate === 0);
            const childCategories = valuee.filter(cat => cat.ParentCate !== 0);
            result(null, { product: value, category: { parentCategories, childCategories } });
        });
    });
};
exports.saveProduct = (productData, callback) => {
    db.query(`
        UPDATE product 
        SET 
            NamePrd = ?, 
            MetaPrd = ?, 
            PricePrd = ?, 
            ImgPrd = ?, 
            TitlePrd = ?, 
            IdCate = ?, 
            ParentCate = ?
        WHERE IDPrd = ?
    `, [productData.NamePrd,
    productData.MetaPrd,
    productData.PricePrd,
    productData.ImgPrd,
    productData.TitlePrd,
    productData.IdCate,
    productData.ParentCate,
    productData.IDPrd], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};
exports.insertPrd = (productData)=>{
    db.query(`INSERT INTO product 
    (NamePrd, MetaPrd, PricePrd, ImgPrd, TitlePrd, IdCate, ParentCate) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,[ productData.NamePrd,
        productData.MetaPrd,
        productData.PricePrd,
        productData.ImgPrd,
        productData.TitlePrd,
        productData.IdCate,
        productData.ParentCate],(err)=>{
        if(err){
            console.log(" lỗi khi thêm sản phẩm ",err);
        }
      });
};
