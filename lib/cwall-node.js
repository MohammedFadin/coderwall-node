'use strict';

var request = require('request');
var url = require('url');
var apiURL = 'https://coderwall.com';
var api = {};

api.getUserInfo = function(username, cb) {
    var rURL = url.resolve(apiURL, username + '.json');
    request({
        uri: rURL,
        json: true
    }, function(err, res, data) {
        if (err || res.statusCode === 404) return cb({
            status: 404,
            msg: 'User Not Found'
        });
        cb(data);
    });
};
/*
    TODO: "getUserProtips"
        , "getUserAboutMe"
 */

module.exports = api;
