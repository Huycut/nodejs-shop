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
product.getReviewByPrd = function (value,call){
    db.query(` select account.Name,reviewprd.Comment,reviewprd.Rating 
        from reviewprd 
        inner JOIN account 
        on reviewprd.IdAccount = account.IdAccount 
        inner JOIN product 
        on product.IDPrd = reviewprd.Id 
        where reviewprd.Id = ?`,value,function(err,result){
            if(err){
                console.log("Hiển thị đánh giá sản phẩm thất bại");
            }
            else{
                call(result);
            }
        })
}
product.insertReview = function(idAccount,idPrd,comment,stars){
    db.query("INSERT INTO `reviewprd` set IdAccount = ? , Id = ? , Comment = ?, Rating = ?",[idAccount,idPrd,comment,stars],function(err){
        if(err){
            console.log("thêm đánh giá thất bại");
        }
    });
}


module.exports = { categori, product };