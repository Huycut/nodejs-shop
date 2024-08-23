const { func } = require('joi');
const db = require('../commom/sqlHelper');
var account = require('../Models/AccModels');
exports.addToCart = function (id, result) {
    if (account.currentAccount) {
        let accountID = account.currentAccount.idName;
        checkCart(accountID,id,function(resultCheck){
            if(resultCheck === 1){
                result(2);
            }else{
                db.query("INSERT INTO cart (IdAccount, IDPrd,quantity) VALUES (?, ?,?)", [accountID, id,1], function (err, value) {
                    if (err) {
                        console.log('Error inserting into cart:', err);
                        result(0);
                    }
                    else {
                        console.log('thêm vào giỏ hàng thành công');
                        result(1);
                        
                    }
                });
            }
        });
    }
}
exports.dataCart = function (result) {
    if (account.currentAccount) {
        db.query(` SELECT product.ImgPrd, product.NamePrd, product.PricePrd,cart.quantity,cart.IDPrd,product.MetaPrd FROM cart 
        INNER JOIN account ON cart.IdAccount = account.IdAccount 
        INNER JOIN product ON cart.IDPrd = product.IDPrd 
        WHERE cart.IdAccount = ?`, account.currentAccount.idName, function (err,data) {
            if (err) {
                console.log("lỗi câu truy vấn");
            }
            else {
                result(data);
            }
        });
    }
    else{
        result(null);
    }
}
function checkCart(idAccount,idPrd,result){
    db.query("SELECT quantity FROM cart WHERE IdAccount = ? AND IDPrd = ?",[idAccount,idPrd],function(err,value){
        if(err){
            console.log(" lỗi khi kiểm tra");
        }
        else{
            if(value.length > 0){
                db.query("UPDATE `cart` SET quantity=? WHERE IdAccount = ? AND IDPrd = ?",[value[0].quantity + 1,idAccount,idPrd] ,function(err){
                    if(err){
                        console.log(" Lỗi khi update quantity sản phẩm");
                    }
                    else{
                        result(1) ;
                    }
                });
            }
            else{
                result(0);
            }
        }
    })
}
exports.updateQuantity = function(newQuantity,idPrd){
    db.query("UPDATE cart SET quantity = ? WHERE IDPrd= ? AND IdAccount = ?",[newQuantity,idPrd,account.currentAccount.idName],function(err){
        if(err){
            console.log(" cập nhập quantity thất bại");
            result(0);
        }
       
    })
}
exports.deleteCart = function(idPrd,result){
    db.query("delete from cart where IDPrd = ? and IdAccount = ?",[idPrd,account.currentAccount.idName],function(err){
        if(err){
            console.log(" Xóa Sản phẩm trong giỏ hàng thất bại");
        }
        else{
            result(1);
        }
    })
}