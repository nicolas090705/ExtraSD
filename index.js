const path = require('path');
const express = require('express');
const app = express();

const OS = require('os')
app.set('port',process.env.PORT || 3000);

app.set('view engine','ejs');
app.set('views', __dirname + "/views")

app.use(express.static(path.join(__dirname + "/public")));

// const ProcessCPULoad = require('process-cpu-usage').ProcessCPULoad; 
// const tracker = new ProcessCPULoad(); 
// tracker.start((total, user, system) => {
// console.log('CPU Usage: Total: %d, User: %d, System: %d', total, user, system);
// });



/****************************************************************************/
let pidusage = require('pidusage');
// setInterval(() => {        
//     pidusage(process.pid, function (err, stats) {
//     console.log("CPU:" ,stats.cpu,"%")
//     console.log("Memoria:",stats.memory/1000000,"MB")
//     // document.getElementById('cpu').innerHTML=stats;
//     })
// }, 20000);

/****************************************************************************/
app.get('/OS',(req,res)=>{
    let cpus = OS.cpus();
    let sistema = OS.platform(); 
    let name = OS.hostname();
    let arch = OS.arch();
    let endianness = OS.endianness()
    let freemem = OS.freemem()
    let homedir = OS.homedir()
    let totalmem = OS.totalmem()

    res.render('OS',{cpus:cpus,sistema:sistema,name:name})
});


// app.get('/',(req,res)=>{
//     res.render('index');
// })

app.get('/CPU',(req,res)=>{
    res.render('CPU');
})

const server = app.listen(app.get('port'),()=>{
    console.log('http://localhost:3000')
})


/****************************************************************************/
const SocketIO = require('socket.io');
const { consumers } = require('stream');
// SocketIO.listen(server)
const io = SocketIO(server);
// var cpu='';
// var Memoria='';



io.on('connection',(socket)=>{
    console.log('new connection',socket.id);

    socket.on('ejemplo',()=>{       
        let cpus = OS.cpus();
        let sistema = OS.platform(); 
        let name = OS.hostname();
        let arch = OS.arch();
        let endianness = OS.endianness()
        let freemem = OS.freemem()
        let homedir = OS.homedir()
        let totalmem = OS.totalmem()
        // var machine = OS.machine()

        // console.log(totalmem)
        // console.log(machine)
        // console.log(endianness)// LE/BE
        // console.log(freemem/10000000,"MB");
        // console.log(homedir)//C:\Users\nic01
        // console.log(sistema);
        // console.log(name);
        // console.log(arch)
        // io.sockets.emit('obtenciondeOS',{cpus:cpus, sistema:sistema, name:name, arch:arch})
        // console.log(data)
        pidusage(process.pid, function (err, stats) {
            var cpu=stats.cpu;
            let Memoria=stats.memory/1000000;
            io.sockets.emit('obtenciondeOS',{CPU:cpu,Memoria:Memoria,cpus:cpus, sistema:sistema, name:name, arch:arch});
            })
    })
});
/****************************************************************************/
