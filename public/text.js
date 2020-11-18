document.addEventListener("DOMContentLoaded", () => {
    const socket = io.connect();

    const l = console.log

    function getEl(id) {
        return document.getElementById(id)
    }

    const editor = getEl("editor")

    editor.addEventListener("keyup", (evt) => {
        const text = editor.value
        socket.send(text)
    })
    socket.on('message', (data) => {
        editor.value = data
    })

})

