const socket = io();
let name 
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')


do{
    name = prompt('Please enter your name here to continue')
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
//this is the ougoing this works fine i thnk
function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }
appendMessage(msg, 'outgoing')
textarea.value = ''

socket.emit('message', msg)

}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup =  `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

    scrollToBottom()
}
 //this part.. 
 //does this get called?

 //idk how socket stuyff works so see why socket isnt calling this method
 //once this get called, it will work, in server.js its getting but not received by client.js
socket.on('message',(msg) => {//this function is never called  this function is the one which puts the msg on the html element
    console.log("Incoming msg in client.js");
    appendMessage(msg, 'incoming')
    scrollToBottom()

})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}