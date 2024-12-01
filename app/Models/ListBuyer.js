const db = require('../commom/sqlHelper');
var account = require('../Models/AccModels');
exports.addListBuyer = (rptName,numberP,email,province,district,address,note,payment,date) =>{
    db.query(`INSERT INTO listbuyer 
    (RptName, NumberP, Email, Province, District, Address, Note, IdName, Payment,Date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,[rptName,numberP,email,province,district,address,note,account.currentAccount.idName,payment,date],(err)=>{
        if(err){
            console.log("thêm dữ liệu của người mua hàng bị lỗi"+ err);
        }
    });
};