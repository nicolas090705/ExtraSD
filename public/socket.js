//CLIENTE
const socket = io();

let CPU = "";
let Memoria = '';
setInterval(()=>{
    socket.emit('ejemplo');
},8000)

socket.on('ejemplo',(data)=>{
    document.getElementById('CPU').innerHTML="CPU: "+data.CPU+"%";
    document.getElementById('Memoria').innerHTML="Memoria: "+data.Memoria+"MB";
});

