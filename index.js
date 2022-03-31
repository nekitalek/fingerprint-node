const express = require('express');
const app = express();
const path = require('path');
const geo = require('geoip-lite')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});
var geoip = require('geoip-lite');
var http = require('http');
var countries = require('country-data').countries;

app.get("/api/countries/:ip", function(request, response) {
    var geo = geoip.lookup(request.params.ip);

    var result = {country:{}};
    result.country.language = "en";
    result.country.iso_code = geo.country;
    result.country.name = countries[geo.country].name;
    result.host = request.params.ip;

    response.send(JSON.stringify(result, null, 2));
    console.log(result.country.iso_code);
});

