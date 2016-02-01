var http = require('http')
var st = require('node-static')
var opts = { cache: false }
var file = new st.Server('./public', opts)
var port = process.env.PORT || 8082

http.createServer(function (req, res) {
  file.serve(req, res)
}).listen(port)

console.log('App running on http://localhost:%s', port)
