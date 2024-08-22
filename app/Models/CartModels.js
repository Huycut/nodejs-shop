const db = require('../commom/sqlHelper');
var account = require('../Models/AccModels');
exports.addToCart = function(id){
    if (account.currentAccount) {
        let accountID = account.currentAccount.idName;
        db.query("INSERT INTO cart (IdAccount, IDPrd) VALUES (?, ?)",[accountID,id],function(err,result){
            if (err) {
                console.log('Error inserting into cart:', err);
            }
            else{
                console.log('thêm vào giỏ hàng thành công');
            }
        });
    }
}