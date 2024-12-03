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
    db.query('select * from product where IDPrd = ?',[id],(err,value)=>{
        result(err,value);
    });
};