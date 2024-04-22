const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop_nodejs'
});
connection.connect(function(err,connection){
    if(err) console.log("kết nối dữ liệu thất bại");
});
module.exports = connection;