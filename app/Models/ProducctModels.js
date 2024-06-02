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
product.getAllPrd = function(result){
    db.query("select * from product",function(err,data){
        if(err){
            console.log("Tải sản phẩm thất bại");
        }
        else{
            result(data);
        }
    })
}
categori.getProductByMeta = function(id,result){
    db.query("select * from product where ?? = ?",[id.by,id.id], function(err,data){
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
            result(data);
        }
    })
}

module.exports = { categori, product };