const db = require('../commom/sqlHelper');
const Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const account = function(id,name){
    this.name = name;
    this.idName = id;
}
account.currentAccount = null;
account.login = function(data, result) {
  // Truy vấn thông tin người dùng dựa trên email
  db.query("SELECT IdAccount, Name, Password FROM account WHERE email = ?", [data.email], function(err, rows) {
      if (err) {
          console.log("Error querying account:", err);
          return result({ error: "Internal server error" }); // Trả về lỗi cho client
      }

      // Kiểm tra xem có người dùng không
      if (rows.length === 0) {
          return result({ error: "Invalid email or password" });
      }

      // Lấy thông tin người dùng
      const user = rows[0];
      
      // So sánh mật khẩu
      var isMatch = bcrypt.compareSync(data.password, user.Password);
      if (isMatch) {
          // Tạo đối tượng tài khoản hiện tại
          account.currentAccount = new account(user.IdAccount, user.Name);
          // Chỉ trả về IdAccount và Name
          return result({ IdAccount: user.IdAccount, Name: user.Name });
      } else {
          return result({ error: "Invalid email or password" });
      }
  });
}
account.create = function(data) {
    return new Promise(function(resolve, reject) {
      db.query("INSERT INTO account SET Email = ?, Password = ?, Name = ?, NumberPhone = ?, AccountType = 1", [data.email, data.password, data.name, data.numberPhone], function(err, result) {
        if (err) {
          console.log("Error creating account");
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
};
module.exports = account;