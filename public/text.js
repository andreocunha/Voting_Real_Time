document.addEventListener("DOMContentLoaded", () => {

    const socket = io.connect();

    const propostaAntiga = document.getElementById("propostaAntiga")

    propostaAntiga.addEventListener("keyup", (evt) => {
        const text = propostaAntiga.value
        // socket.send(text)
        socket.emit('propostaAntiga', text)
    })
    socket.on('propostaAntiga', (data) => {
        propostaAntiga.value = data
    })



    const propostaNova = document.getElementById("propostaNova")

    propostaNova.addEventListener("keyup", (evt) => {
        const text = propostaNova.value
        socket.emit('propostaNova', text)
    })
    socket.on('propostaNova', (data) => {
        propostaNova.value = data
    })


    if (localStorage.getItem('admin') === '') {
        propostaAntiga.disabled = true
    }

})

