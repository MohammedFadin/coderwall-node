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
        if (err || res.statusCode === 404)
            return cb({
                status: 404,
                msg: 'Username Not Found'
            });
        _parseMoreUserInfo(username, function(parsedData) {
            data.about = parsedData.about;
            data.total_protips = parsedData.total_protips;
            cb(data);
        });
    });
};

/*
    Get user's protips' titles,
    links, and total protips created
    https://coderwall.com/p/u/username
 */
api.getUserLatestProtips = function(username, cb) {
    var rURL = url.resolve(apiURL + '/p/u/', username);
    request(rURL, function(err, res, data) {
        if (err || res.statusCode === 404)
            return cb({
                status: 404,
                msg: 'Username Not found',
            });

        var $ = cheerio.load(data);
        var protips = {};
        protips.latest = {};

        // Currently, this display
        // the latest 4 protips only
        // since the rest of protips are
        // hidden from visitor
        $('.protips-grid').children()
            .find('.protip')
            .each(function(i, elm) {
                var parsedProtip = $(this);
                i++;
                protips.latest['protip' + i] = {}; //initialize
                protips.latest['protip' + i]
                    .title = parsedProtip.find('a')
                        .first()
                        .text();
                protips.latest['protip' + i]
                    .link = url
                        .resolve(apiURL, parsedProtip.find('a').first().attr('href'));
                protips.latest['protip' + i]
                    .views = parsedProtip
                        .find('.views')
                        .text()
                        .trim() || null;
            });
        protips.total = $('.protips-grid') // total latest only
            .children()
                .find('.protip')
                .length;

        cb(protips);
    });
};

/*
    Get user's about-me description
    since current Coderwall API doesn't
    provide it
    https://coderwall.com/username
 */
function _parseMoreUserInfo(username, cb) {
    var rURL = url.resolve(apiURL, username);
    request(rURL, function(err, res, data) {
        if (err || res.statusCode === 404)
            return cb({
                about: 'Username Not Found'
            });
        var $ = cheerio.load(data);
        var isAbout = $('.profile-details')
                .children()
                .first()
                .children()
                .first()
                .text();
        if (isAbout.toLowerCase() !== 'about')
            return cb({
                about: null
            });
        var parsedAboutMe = $('.profile-details')
                .children()
                .first()
                .children()
                .last()
                .text();
        var parsedTotalProtips = $('.pro-tip-number span').html();

        cb({about: parsedAboutMe.trim(), total_protips: parsedTotalProtips});
    });
};

module.exports = api;

/*
    TODO: "get user all protips"
          "Store parsed content"
 */
