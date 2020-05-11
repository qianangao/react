const {ChatModel}=require('../db/modules')
module.exports = function (server) {
    //得到IO对象
    const io=require('socket.io')(server)
    //监视连接(当有一个客户连接上时回调)
    io.on('connection',function (socket) {
        console.log("socketio connected")
        //绑定sendMsg监听,接受客户端发送的消息
        socket.on('sendMsg',function ({from,to,content}) {
            console.log('服务器接收到浏览器的消息',{from,to,content})
            const chat_id=[from,to].sort().join('_')
            const create_time=Date.now()
            new ChatModel({from,to,content,chat_id,create_time}).save(function (error,chatMsg) {
                //向客户端发送消息
                io.emit('receiveMsg',chatMsg)
                console.log("服务器向浏览器发送消息",chatMsg)
            })

        })
    })

}
