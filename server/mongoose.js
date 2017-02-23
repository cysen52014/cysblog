var mongoose = require('mongoose')
mongoose.connect('mongodb://3f8641a2e5554:5eb2d578e0e14@192.168.1.90:30141/50baa824231c4')
mongoose.Promise = global.Promise
module.exports = mongoose
