if (!('toJSON' in Error.prototype))
    Object.defineProperty(Error.prototype, 'toJSON', {
        value: function () {
            var alt = { name: this.name };

            Object.getOwnPropertyNames(this).forEach(function (key) {
                alt[key] = this[key];
            }, this);

            return alt;
        },
        configurable: true,
        writable: true
    });
const debugMode = false;
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const process = require('process')
app.use(express.static('public'))
var exec = require('child_process').exec;
function execute(command, callback) {
    return new Promise(async (resolve, reject) => exec(command, function (error, stdout, stderr) { resolve(callback(stdout, error, stderr)); }));
};
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const network = Object.create(null);

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!network[name]) {
                network[name] = [];
            }
            network[name].push(net.address);
        }
    }
}

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/docs', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/index.html'));
});


router.get('/console_run', function (req, res) {
    res.sendFile(path.join(__dirname + '/docs/index.html'));
});
app.use('/', express.static(__dirname + '/'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/editor'));
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// should only be used during private testing, the rest of the time the debugMode constant should be set to false.
if (debugMode) {
    router.post('/console', async function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
        console.log((req.body))
        let result = undefined;
        try {
            result = eval(JSON.parse(req.body).code)
        } catch (e) {
            console.error(e.toString(), e.stack);
            res.status(500);
            res.statusCode = 500;
            res.send({
                "message": e.toString() + " " + e.stack,
                "error": (e),
            });
            return;
        }
        res.status(200);
        res.statusCode = 200;
        res.send({ "message": "Recieved", "result": await result })

    })
};
app.use('/', router);
app.listen(8212);
if (!!!network.en0) {
    network.en0 = []
};
let currentIP = network.en0[0];
if(!!!currentIP){
    if(!!network["Wi-Fi 2"] && !!network["Wi-Fi 2"][0]){
        currentIP=network["Wi-Fi 2"][0]
    }else if(!!network["Wi-Fi"] && !!network["Wi-Fi"][0]){
        currentIP=network["Wi-Fi"][0]
    }else if(!!network["Wi-Fi 3"] && !!network["Wi-Fi 3"][0]){
        currentIP=network["Wi-Fi 3"][0]
    }else if(!!network["Wi-Fi"] && !!network["Wi-Fi"][0]){
        currentIP=network["Wi-Fi"][0]
    }else if(!!network["Ethernet 3"] && !!network["Ethernet 3"][0]){
        currentIP=network["Ethernet 3"][0]
    }else if(!!network["Ethernet 2"] && !!network["Ethernet 2"][0]){
        currentIP=network["Ethernet 2"][0]
    }else if(!!network["Ethernet"] && !!network["Ethernet"][0]){
        currentIP=network["Ethernet"][0]
    }else if(!!Object.entries(network).find(v=>v[1].length>0) && !!Object.entries(network).find(v=>v[1].length>0)[0]){
        currentIP=Object.entries(network).find(v=>v[1].length>0)[0]
    }
}

console.log(nets)
console.log(network)
console.log(`Running at Port http://${currentIP}:8212`);
module.exports = { app, router, path, exec, execute: execute };