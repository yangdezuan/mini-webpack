let hellodz = require('hellodz')
const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, World!\n')
})

server.listen(port, hostname, () => {
  //console.log(hellodz.sleep(10000))
  var start = Date.now()
  while (Date.now() - start < 5000) {}
  console.log('睡眠时间5S再运行！')
  console.log(`服务器运行在1 http://${hostname}:${port}/`)
})
