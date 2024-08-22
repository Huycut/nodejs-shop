const db = require('../commom/sqlHelper');
var account = require('../Models/AccModels');
exports.addToCart = function (id, result) {
    if (account.currentAccount) {
        let accountID = account.currentAccount.idName;
        db.query("INSERT INTO cart (IdAccount, IDPrd) VALUES (?, ?)", [accountID, id], function (err, value) {
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
}
exports.dataCart = function (result) {
    if (account.currentAccount) {
        db.query(` SELECT product.ImgPrd, product.NamePrd, product.PricePrd FROM cart 
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