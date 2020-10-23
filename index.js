var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var total = 0
var voto_sim = 0
var voto_nao = 0
var voto_abstencao = 0


// Esse é "io" é responsável por ficar checando se alguma coisa tá acontecendo (no caso aí é a conexão)
io.on('connection', (socket) => {
    console.log("Nova conexão")

    socket.emit('total', total)
    socket.emit('voto_sim', voto_sim)
    socket.emit('voto_nao', voto_nao)
    socket.emit('voto_abstencao', voto_abstencao)

    socket.on('botao_sim', ()=>{
        total += 1;
        voto_sim += 1;
        io.emit('voto_sim', voto_sim)
        io.emit('total', total)
    })

    socket.on('botao_nao', ()=>{
      total += 1;
      voto_nao += 1;
      io.emit('voto_nao', voto_nao)
      io.emit('total', total)
    })

    socket.on('botao_abster', ()=>{
      total += 1;
      voto_abstencao += 1;
      io.emit('voto_abster', voto_abstencao)
      io.emit('total', total)
    })
  

    socket.on('limpar', ()=>{
        total = 0;
        voto_sim = 0
        voto_nao = 0
        voto_abstencao = 0
        io.emit('limpar', total)
    })
})

http.listen(port, function(){
  console.log('listening on *:' + port);
});
