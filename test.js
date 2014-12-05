'use strict';

var coderwall = require('./lib/cwall-node.js');

coderwall.getUserInfo('mohammedfadin', function (data) {
    console.log(data);
    require('http').createServer(function (req, res) {
        res.end(JSON.stringify(data));
    }).listen('3000', function () {
        console.log('Check on port 3000 for result');
    });
});
