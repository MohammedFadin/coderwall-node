'use strict';

var url, request, cheerio,
    apiURL, api;
url = require('url');
request = require('request'); // dependency
cheerio = require('cheerio'); // dependency
apiURL = 'https://coderwall.com';
api = {};

/*
    Get user information
    from Coderwall API
    https://coderwall.com/username.json
 */
api.getUserInfo = function(username, cb) {
    var rURL = url.resolve(apiURL, username + '.json');
    request({
        uri: rURL,
        json: true
    }, function(err, res, data) {
        if (err || res.statusCode === 404) return cb({
            status: 404,
            msg: 'Username Not Found'
        });
        _getUserAboutMe(username, function(userAbout) {
            data.about = userAbout;
            cb(data);
        });
    });
};

/*
    Get user' about-me description
    since current Coderwall API doesn't
    provide it
 */
function _getUserAboutMe(username, cb) {
    var rURL = url.resolve(apiURL, username);
    request(rURL, function(err, res, data) {
        if (err || res.statusCode === 404)
            return cb({
                about: 'Username Not Found'
            });
        var $ = cheerio.load(data);
        var isAbout = $('.profile-details').children().first().children().first().text();
        if (isAbout.toLowerCase() !== 'about')
            return cb({
                about: null
            });
        var parsedAboutMe = $('.profile-details').children().first().children().last().text();
        //cb({about: parsedAboutMe.trim()});
        cb(parsedAboutMe.trim());
    });
};

module.exports = api;

/*
    TODO: "getUserProtips"
 */
