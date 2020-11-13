
document.addEventListener("DOMContentLoaded", () => {

    const socket = io.connect();


    const botao_sim = document.querySelector('#botao_sim')
    const botao_nao = document.querySelector('#botao_nao')
    const botao_abster = document.querySelector('#botao_abster')

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

    if (localStorage.getItem('status')) {
        desabilitar();
    }

    botao_sim.onmousedown = () => {
        socket.emit('botao_sim')
        desabilitar();
        localStorage.setItem('status', 'votado')
    }

    botao_nao.onmousedown = () => {
        socket.emit('botao_nao')
        desabilitar();
        localStorage.setItem('status', 'votado')
    }

    botao_abster.onmousedown = () => {
        socket.emit('botao_abster')
        desabilitar();
        localStorage.setItem('status', 'votado')
    }

    const contagem = document.querySelector('#contagem')
    socket.on('total', (valor) => {
        contagem.innerHTML = valor
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
        habilitar();
        localStorage.removeItem('status')
    })

})

