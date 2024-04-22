const db = require('../commom/sqlHelper');
const categori = function(Categori){
    this.id = Categori.id;
    this.nameCate = Categori.NameCate;
    this.meta = Categori.Meta;
    this.parentCate = Categori.ParentCate;
}
const product = function(Prd){
    this.IdPrd = Prd.IdPrd;
}
categori.getCategori = function(result){
    db.query("select * from categori where ParentCate = 0",function(err,data){
        if(err){
            console.log("Tải danh mục thất bại");
        }
        else{
            result(data);
        }
    })
};
categori.getParentCate = function(result){
    db.query("select * from categori",function(err,data){
        if(err){
            console.log("Tải danh mục con thất bại");
        }
        else{
            result(data);
        }
    })

}
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
categori.getProductByMeta = function(result){
    db.query("select ");
}

module.exports = { categori, product };