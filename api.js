const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const bodyParser = require('body-parser');
var config = require('./config');
var service = require('./services/APIService');

const app = express();

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET');
})

app.get('/opponents', service.getOpponents);
app.get('/characters', service.getCharacters);
app.get('/matches', service.getAllMatches);
//app.get('/:year/:match_type/:myChar/:oppName/:oppChar/:result', service.getResults);

module.exports.handler = serverless(app);