const { func } = require('joi');
const db = require('../commom/sqlHelper');
const categori = function(Categori){
    this.id = Categori.IDCate;
    this.nameCate = Categori.NameCate;
    this.meta = Categori.MetaCate;
    this.parentCate = Categori.ParentCate;
}
const product = function(Prd){
    this.IdPrd = Prd.IdPrd;
}
categori.getCategori = function(result){
    db.query("select * from categori ",function(err,data){
        if(err){
            console.log("Tải danh mục thất bại");
        }
        else{
            result(data);
        }
    })
};
product.getAllPrd = function(result,page){
    let limit = 6;
    let offset = (page-1) * limit;
    db.query("select * from product limit "+ limit +" offset "+offset,function(err,data){
        if(err){
            console.log("Tải sản phẩm thất bại");
        }
        else{
            result(data);
        }
    })
}
categori.getProductByMeta = function(id,result,page){
    let limit = 6;
    let offset = (page-1) * limit;
    db.query("select * from product where ?? = ? limit "+ limit +" offset "+offset ,[id.by,id.id], function(err,data){
        if(err){
            console.log("Tải danh mục con thất bại");
        }
        else{
            result(data);
        }
    });
}
product.getDataPrd = function(meta,result){
    db.query("select * from product where metaPrd = ?",meta,function(err,data){
        if(err){
            console.log("Tải dữ liệu sản phẩm thất bại");
        }else{
            result(data[0]);
        }
    })
}
product.getColumPage = function (callback) {
    db.query('SELECT COUNT(*) AS total FROM product', (err, results) => {
      if (err) {
        console.log('Truy vấn số lượng thất bại');
        callback(err, null);
      } else {
        const count = results[0].total;
        callback(null, count);
      }
    });
  }
product.getColumPageByMeta = function (value,callback) {
    db.query('SELECT COUNT(*) AS total FROM product where ?? = ?',[value.by,value.id],(err, results) => {
      if (err) {
        console.log('Truy vấn số lượng thất bại');
        callback(err, null);
      } else {
        const count = results[0].total;
        callback(null, count);
      }
    });
  }


module.exports = { categori, product };