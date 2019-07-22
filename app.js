var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

var httpResult = require('./config').httpResult;
var sessionOptions = require('./config').sessionOptions;
var authPathsReg = require('./config').authPathsReg;

var productRouter = require('./routes/product.js');
var categoryRouter = require('./routes/category.js');
var userRouter = require('./routes/user.js');
var cartRouter = require('./routes/cart.js');
var profileRouter = require("./routes/profile.js");
var detailsRouter = require("./routes/details.js");
var addressRouter = require("./routes/address.js");
var orderRouter = require("./routes/order.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', function(req,res,next) {
        var isAuthPath = authPathsReg.test(req.baseUrl);//用正则表达式来检测获取的baseURL路由
        if(isAuthPath&&!req.session.name) res.send(httpResult.untoken());
        else next();
});



app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/login', userRouter);
app.use('/cart', cartRouter);
app.use("/profile", profileRouter);
app.use("/details", detailsRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
