// 导入websocket node对象
var ws = require("nodejs-websocket")

// 创建一个连接通道数组
var arr = []

// 创建websocket服务器，conn -> 连接通道
var server = ws.createServer(function (conn) {
  // 将连接通道，添加到数组中保存
  arr.push(conn)
  // 连接成功，conn与客户端的连接通道
  console.log("有客户端连接", arr.length)

  // 接收客户端发送的数据事件
  conn.on("text", function (str) {
    // 打印接收到的数据
    console.log("接收到数据：" + str)

    // 遍历连接数组，并发送数据
    for(let i = 0; i < arr.length; i++ ) {
      arr[i].sendText(str.toUpperCase())
    }

    // 将数据发送给当前连接的客户端
    // conn.sendText(str.toUpperCase())
  })

  // 关闭连接事件：连接通道被关闭时触发
  conn.on("close", function (code, reason) {
      console.log("当前连接关闭，原因->", reason)
      // 将当前连接通道从数组中移除
      arr.splice(arr.indexOf(conn), 1)
      console.log("当前连接数量：", arr.length)
  })

  // 异常事件：连接通道出现异常时触发
  conn.on("error", function(code, reason) {
    console.log("异常事件：", reason)
  })

}).listen(9898, () => {
  console.log('服务已经启动，端口：9898');
})