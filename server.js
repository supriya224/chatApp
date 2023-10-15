const express =require('express');

const app =express();
const http= require('http').createServer(app);

const PORT = process.env.PORT || 3000

http.listen(PORT, ()=>{
    console.log(`listing on port ${PORT}`)
})

app.use(express.static(__dirname + ''))

app.get('/', (req,res)=>{
    // res.send("Hello world")
    res.sendFile(__dirname + '/index.html')
})


// set up socekt io 

const io =require('socket.io')(http)
io.on('connection', (socket)=>{
   console.log('Connected....')
//    broadcast means sbko bhejega msg
   socket.on('message', (msg)=>{
    socket.broadcast.emit('message',msg)
   })
})