
document.addEventListener("DOMContentLoaded", () => {

    const socket = io.connect();


    const botao_sim = document.querySelector('#botao_sim')
    const botao_nao = document.querySelector('#botao_nao')
    const botao_abster = document.querySelector('#botao_abster')

    const nome = localStorage.getItem("nome")
    const PET = localStorage.getItem("PET")
    const usuario = {nome: nome, PET: PET, voto: ''}

    function desabilitar() {
        botao_sim.disabled = true
        botao_nao.disabled = true
        botao_abster.disabled = true
    }

    function habilitar() {
        botao_sim.disabled = false
        botao_nao.disabled = false
        botao_abster.disabled = false
    }

    // checa se a pessoa já votou
    if (localStorage.getItem('status') === nome) {
        desabilitar();
    }

    botao_sim.onmousedown = () => {
        usuario.voto = 'sim'
        socket.emit('botao_sim', usuario)
        desabilitar();
        localStorage.setItem('status', nome)
    }

    botao_nao.onmousedown = () => {
        usuario.voto = 'não'
        socket.emit('botao_nao', usuario)
        desabilitar();
        localStorage.setItem('status', nome)
    }

    botao_abster.onmousedown = () => {
        usuario.voto = 'abstenção'
        socket.emit('botao_abster', usuario)
        desabilitar();
        localStorage.setItem('status', nome)
    }

    const contagem = document.querySelector('#contagem')
    const pessoas_votaram = document.querySelector('#pessoas')
    socket.on('total', (valor, votados) => {
        contagem.innerHTML = valor

        pessoas_votaram.innerHTML = ''
        for(let i = 0; i<votados.length; i++)
        {
            pessoas_votaram.innerHTML += votados[i].nome + ' - ' + votados[i].PET + ' - ' + votados[i].voto + "<br />"
        }
        // pessoas_votaram.innerHTML = JSON.stringify(votados)
        
    })

    const votos_sim = document.querySelector('#voto_sim')
    socket.on('voto_sim', (valor) => {
        votos_sim.innerHTML = valor
    })

    const votos_nao = document.querySelector('#voto_nao')
    socket.on('voto_nao', (valor) => {
        votos_nao.innerHTML = valor
    })

    const votos_abstencao = document.querySelector('#voto_abstencao')
    socket.on('voto_abster', (valor) => {
        votos_abstencao.innerHTML = valor
    })

    const limpar = document.querySelector('#limpar')
    limpar.onmousedown = () => {
        socket.emit('limpar')
    }

    socket.on('limpar', (valor) => {
        contagem.innerHTML = valor
        voto_sim.innerHTML = valor
        voto_nao.innerHTML = valor
        voto_abstencao.innerHTML = valor
        pessoas_votaram.innerHTML = ''
        habilitar();
        localStorage.removeItem('status')
    })

})

