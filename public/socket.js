//CLIENTE
const socket = io();

let CPU = "";
let Memoria = '';

socket.emit('ejemplo');

socket.on('ejemplo',(data)=>{
    document.getElementById('CPU').innerHTML="CPU: "+data.CPU+"%";
    document.getElementById('Memoria').innerHTML="Memoria: "+data.Memoria+"MB";
});

