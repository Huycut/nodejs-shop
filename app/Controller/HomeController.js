const bcrypt = require('bcryptjs');
const Joi = require('joi');
var account = require('../Models/AccModels');
const session = require('express-session');
var { categori, product } = require("../Models/ProducctModels")
var views = {
    header : 'header',
    footer : 'footer',
}
///Trang Chủ
exports.index = function(req,res){
    views['salePrd'] = product.productsOnSale;
    res.render('home',views);
}//Trang login
exports.pageLogin = function (req,res){
    requireNoAuth(req,res,'login');
    //res.render('login',views);
    
}
//Xử lí login
exports.login = function (req,res){
    var data = {
        email : req.body.email,
        password : req.body.password
    }
    account.login(data,function (response){
        req.session.name = response.Name;
        req.session.IdAccount = response.IdAccount;
        res.redirect('/');
    });
    
}
//Trang Đăng Ký
exports.pageCreate = function (req,res){
    requireNoAuth(req,res,'register');
}
//Xử lý Đăng Ký
exports.createAccount = function(req,res){
    var data = {
            email : req.body.email,
            password : req.body.password,
            name : req.body.name,
            numberPhone : req.body.phoneNumber
         };
    validate(data);
    var hashedPassword = bcrypt.hashSync(req.body.password);// Mã hóa password
    var isMatch = bcrypt.compareSync(req.body.confirmPassword, hashedPassword);//check password 
    if(isMatch){
        data['password'] =  hashedPassword;
        if(account.create(data)){
            var message = "Tạo tài khoản thành công ";
            res.render('register',{ header : 'header', footer : 'footer',message: message});
        };
    } 
}
exports.logout = function(req,res){
    account.currentAccount = null;
    req.session.destroy();
    res.redirect('/');
}
// Định nghĩa schema cho dữ liệu
function validate(data){
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email không đúng'),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{3,30}$')).label('Mật khẩu phải từ 3 kí tự bao gồm chữ hoa chữ thường'),
        name: Joi.string().required().label('Vui lòng nhập tên'),
        numberPhone: Joi.number().integer().min(10).required().label('Số điện thoại không đúng')
      });
      const { error, value } = schema.validate(data);
      
      if (error) {
        error.details.forEach((err) => {
            console.log(err.context.label);
        });
      } else {
        console.log('Dữ liệu hợp lệ');
      }
}
function requireNoAuth(req, res,value) {
    if (req && req.session && req.session.name) {
      res.redirect('/');
    } else {
      res.render(value);
    }
  }