const express = require('express');
const session = require('express-session');
var app = express();
// Cấu hình session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.locals.sessionName = req.session.name;
    next();
});
// cấu hình hỗ trợ template
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));// giao diện
app.use(express.static(path.join(__dirname, 'app/public')));// tài nguyên css & javascript
// cấu hình lấy dữ liệu từ client
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
///
require('./app/Routes/HomeRoutes')(app);
app.listen(3000,()=>{
    console.log('Server started on port');
});
