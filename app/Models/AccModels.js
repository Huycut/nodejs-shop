const db = require('../commom/sqlHelper');
const Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const account = function(name){
    this.name = name;
}
account.login = function(data,result){
        db.query("select * from account where email = ?",[data.email], function(err, user) {
          if (err) {
            console.log("Error creating account");
          } else {
            var isMatch = bcrypt.compareSync(data.password, user[0].Password);
            if(isMatch){
                result (user[0].Name);
            }   
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