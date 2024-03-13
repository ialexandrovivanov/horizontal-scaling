const cluster = require('cluster');
cluster.schedulingPolicy = cluster.SCHED_RR; // windows systems only
const process = require('process');
const server = require('express')();
const cpunum = require('os').cpus().length;


if (cluster.isPrimary) for (i = 0; i < cpunum; i++) cluster.fork();
else server.listen(8080, () => console.log(`Server port 8080 / pid ${process.pid}`));


// ROUTING

server.get('/fast', (req, res) => res.send(`This page server PID :${process.pid}`));

server.get('/slow', (req, res) => {

    for (i = 0; i < 2000000000; i++) { }
    res.send(`This page process pid :${process.pid}`);
});