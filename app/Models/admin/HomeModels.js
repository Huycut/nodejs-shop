const db = require('../../commom/sqlHelper');
exports.getColumPrd = (result)=>{
    db.query('SELECT COUNT(*)as total FROM product',(err,value)=>{
        if(err){
            console.log('lỗi khi truy vấn số lượng sản phẩm');
        }
        else{
            result(value[0].total);
        }
    });
};
exports.getListProducts = (result)=>{
    db.query('select * from product',(err,value)=>{
        if(err){
            console.log('Lỗi khi tải danh sách product/admin',err);
        }
        else{
            result(value);
        }
    });
};
exports.getSingleProduct = (id,result)=>{
    db.query('select * from product where IDPrd = ?', [id], (err, value) => {
        if (err) {
            result(err, null); // Trả về lỗi nếu xảy ra trong truy vấn đầu tiên
        }
        
        db.query('select * from categori', (err, valuee) => {
            if (err) {
                result(err, null); // Trả về lỗi nếu xảy ra trong truy vấn thứ hai
            }
            // Nếu cả hai truy vấn thành công, trả về cả hai kết quả
            result(null, { product: value, category: valuee });
        });
    });
};