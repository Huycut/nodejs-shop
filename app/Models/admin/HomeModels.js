const db = require('../../commom/sqlHelper');
exports.getColumPrd = (result)=>{
    db.query('SELECT COUNT(*) FROM product',(err,result)=>{
        if(err){
            console.log('lỗi khi truy vấn số lượng sản phẩm');
        }
        else{
            result(result);
        }
    });
};