const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// app.get('/', function(req, res){
//   res.sendFile('./public/index.html', {root: __dirname});
// });


app.use(express.static('public'));

var total = 0
var voto_sim = 0
var voto_nao = 0
var voto_abster = 0

var propostaAntiga = ''
var propostaNova = ''
var votados = []


// Esse é "io" é responsável por ficar checando se alguma coisa tá acontecendo (no caso aí é a conexão)
io.on('connection', (socket) => {
  console.log("Nova conexão")

  socket.emit('total', total, votados)
  socket.emit('voto_sim', voto_sim)
  socket.emit('voto_nao', voto_nao)
  socket.emit('voto_abster', voto_abster)
  socket.emit('propostaAntiga', propostaAntiga)
  socket.emit('propostaNova', propostaNova)

  socket.on('botao_sim', (usuario) => {
    if (verificaVoto(usuario)) {
      votados.push(usuario);
      total += 1;
      voto_sim += 1;
      io.emit('voto_sim', voto_sim)
      io.emit('total', total, votados)
    }
  })

  socket.on('botao_nao', (usuario) => {
    if (verificaVoto(usuario)) {
      votados.push(usuario);
      total += 1;
      voto_nao += 1;
      io.emit('voto_nao', voto_nao)
      io.emit('total', total, votados)
    }
  })

  socket.on('botao_abster', (usuario) => {
    if (verificaVoto(usuario)) {
      votados.push(usuario);
      total += 1;
      voto_abster += 1;
      io.emit('voto_abster', voto_abster)
      io.emit('total', total, votados)
    }
  })


  socket.on('limpar', () => {
    total = 0;
    voto_sim = 0
    voto_nao = 0
    voto_abster = 0
    votados = []
    io.emit('limpar', total)
  })


  socket.on('propostaAntiga', (evt) => {
    propostaAntiga = evt
    socket.broadcast.emit('propostaAntiga', evt)
  })

  socket.on('propostaNova', (evt) => {
    propostaNova = evt
    socket.broadcast.emit('propostaNova', evt)
  })

})

http.listen(port, function () {
  console.log('listening on *:' + port);
});


function verificaVoto(usuario) {
  console.log(votados)
  console.log(votados.length)

  for (let i = 0; i < votados.length; i++) {
    if (votados[i].nome === usuario.nome && votados[i].PET === usuario.PET) {
      console.log("Não é permitido mais de um voto por pessoa")
      return 0;
    }
  }
  return 1;
}