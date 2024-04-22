const db = require('../commom/sqlHelper');
const categori = function(Categori){
    this.id = Categori.id;
    this.nameCate = Categori.NameCate;
    this.meta = Categori.Meta;
    this.parentCate = Categori.ParentCate;
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
module.exports = categori;