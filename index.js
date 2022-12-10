const path = require('path');
const express = require('express');
const app = express();
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



// app.get('/',(req,res)=>{
//     res.render('index');
// })

// app.get('/CPU',(req,res)=>{
//     res.render('CPU');
// })

const server = app.listen(app.get('port'),()=>{
    console.log('http://localhost:3000')
})


/****************************************************************************/
const SocketIO = require('socket.io');
// SocketIO.listen(server)
const io = SocketIO(server);
// var cpu='';
// var Memoria='';

io.on('connection',(socket)=>{
    console.log('new connection',socket.id);

    socket.on('ejemplo',()=>{        
        // console.log(data)
        pidusage(process.pid, function (err, stats) {
            var cpu=stats.cpu;
            let Memoria=stats.memory;
            io.sockets.emit('ejemplo',{CPU:cpu,Memoria:Memoria});
            })
    })
});
/****************************************************************************/
