var express = require('express')
var compression = require('compression')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

// 引入 mongoose 相关模型
require('./server/models/admin')
require('./server/models/article')
require('./server/models/category')
require('./server/models/comment')
require('./server/models/like')
require('./server/models/user')

// 引入 api 路由
var routes = require('./server/routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'client'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

app.use(compression())
app.use(favicon(path.join(__dirname, 'client') + '/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client')))

app.use('/',routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.send(err.message)
})

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
app.listen(port, host,function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
