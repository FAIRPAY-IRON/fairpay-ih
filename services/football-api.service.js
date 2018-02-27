const request = require('request');
const API_HOST = 'https://apifootball.com/api/';
const API_KEY = process.env.FOOTBALL_API_KEY || '6f52ff77f08b498da362e26d757713878c916dffec905f10e2bcb6cb40fb454d';

module.exports.getTeamsData = (next) => {
    var teamsURL = `${API_HOST}?action=get_standings&league_id=173&APIkey=${API_KEY}`;
    request({
        url: teamsURL,
        json: true
    }, function (error, response, body) {
        next(error, body);
    });
};

module.exports.getEventsData = (date, next) => {
    var eventsURL = `${API_HOST}?action=get_events&from=2018-02-25&to=2018-03-02&&APIkey=${API_KEY}`;
    request({
        url: eventsURL,
        json: true
    }, function (error, response, body) {
        next(error, body);
    });
};
