//CLIENTE
const socket = io();

let CPU = "";
let Memoria = '';
setInterval(()=>{
    socket.emit('ejemplo');
},1000)

socket.on('obtenciondeOS',(data)=>{
    document.getElementById('model').innerHTML="Model: "+data.cpus[0].model;
    document.getElementById('speed').innerHTML="Speed: "+data.cpus[0].speed+"MHz";
    document.getElementById('sistema').innerHTML="Sistema: "+data.sistema;
    document.getElementById('name').innerHTML="Nombre: "+data.name;
    document.getElementById('arch').innerHTML="arquitectura: "+data.arch;
    document.getElementById('CPU').innerHTML="CPU:"+data.CPU+" %";
    document.getElementById('Memoria').innerHTML="Memoria: "+data.Memoria+" MB";
    document.getElementById('DiscoDuro').innerHTML="DiscoDuro: no encontrado";
    // document.getElementById('Memoria').innerHTML="Memoria: "+data.Memoria+"MB";
});

