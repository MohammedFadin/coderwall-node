'use strict';

var coderwall = require('./lib/cwall-node.js');

coderwall.getUserProfile('mohammedfadin', function(data) {
    console.log(data);
    // Uncomment below if needed
    // require('http').createServer(function(req, res) {
    //     res.end(JSON.stringify(data));
    // }).listen('3000', function() {
    //     console.log('Check results on port 3000 for result');
    // });
});

coderwall.getUserLatestProtips('DevatoTech', function(data) {
    console.log(data);
    // Uncomment below if needed
    // require('http').createServer(function(req, res) {
    //     res.end(JSON.stringify(data));
    // }).listen('3000', function() {
    //     console.log('Check results on port 3000 for result');
    // });
});
