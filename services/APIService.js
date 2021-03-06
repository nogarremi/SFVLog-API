var seq = require('../models/seq');
var opponents = seq.import('../models/opponents');
var characters = seq.import('../models/characters');
var matches = seq.import('../models/matches');
var ranks = seq.import('../models/ranks');
var _ = require('underscore');
var fs = require('fs');
var config = require('../config');


matches.belongsTo(ranks, {foreignKey: 'opp_rank_id'});
matches.belongsTo(characters, {as: 'My Character', foreignKey: 'my_char_id'});
matches.belongsTo(characters, {as: 'Opponent Character', foreignKey: 'opp_char_id'});
matches.belongsTo(opponents, {foreignKey: 'opp_id'});


exports.getCharacters = function(req, res) {
    characters.findAll({
        attributes: ["char_id", "char_name"]
    })
    .then(c => {
        if(!c) {
            return res.status(400).send({
                message: "No characters found!"
            })
        }

        return res.status(200).send({
            characters: c
        })
    })
};

exports.getRanks = function(req, res) {
    ranks.findAll({
        attributes: ["rank_id", "rank_name"]
    })
    .then(r => {
        if(!r) {
            return res.status(400).send({
                message: "No ranks found!"
            })
        }

        return res.status(200).send({
            ranks: r
        })
    })
};

exports.getOpponents = function(req, res) {
    opponents.findAll({
        attributes: ["opp_id", "opp_name"]
    })
    .then(o => {
        if(!o) {
            return res.status(400).send({
                message: "No opponents found!"
            })
        }

        return res.status(200).send({
            opponents: o
        })
    })
};

exports.getMatches = function(req, res) {
    var wheres = {}
    var where_rank = {}
    let season = req.query.season;
    let type = req.query.type;
    let result = req.query.result;
    let my_char = req.query.my_char;
    let opp_char = req.query.opp_char;
    let opp_id = req.query.opp_id;
    let opp_rank = req.query.opp_rank;
    
    if (!!season) {
        wheres['season'] = season;
    }
    if (!!type) {
        wheres['match_type'] = type;
    }
    if (!!result) {
        wheres['result'] = result;
    }
    if (!!my_char) {
        wheres['my_char_id'] = my_char;
    }
    if (!!opp_char) {
        wheres['opp_char_id'] = opp_char;
    }
    if (!!opp_id) {
        wheres['opp_id'] = opp_id;
    }
    if (!!opp_rank) {
        wheres['rank_id'] = opp_rank;
    }
    
    matches.findAll({
        where: wheres,
        attributes: ["match_id", "season", "match_type", "result"],
        include: [{
            model: characters,
            as: 'My Character',
            attributes: ["char_id", "char_name"]
        }, {
            model: characters,
            as: 'Opponent Character',
            attributes: ["char_id", "char_name"]
        }, {
            model: opponents,
            attributes: ["opp_id", "opp_name"]
        }, {
            model: ranks,
            attributes: ["rank_id", "rank_name"]
        }]
    }).then(m => {
        if(!m) {
            return res.status(400).send({
                message: "No matches found!"
            })
        }

        return res.status(200).send({
            matches: m
        })
    })
};

exports.postMatch = function(req, res) {
    let season = req.body.season;
    let type = req.body.type;
    let result = req.body.result;
    let my_char = req.body.my_char;
    let opp_char = req.body.opp_char;
    let opp_name = req.body.opp_name;
    let opp_rank = req.body.opp_rank;
    var sql = '(SELECT opp_id FROM opponents WHERE opp_name = "' + opp_name + '")';
    
    opponents.findAll({
        attributes: ["opp_id", "opp_name"]
    })
    .then(o => {
        var names = [];
        o.forEach(item => {
            names.push(item.opp_name);
        })
        if (!names.includes(opp_name)){
            opponents.create({ opp_name: opp_name}).then(matches.create({season: season, match_type: type, my_char_id: my_char, opp_id: seq.literal(sql), opp_char_id: opp_char, opp_rank_id: opp_rank, result: result}));
        }
        else {
            matches.create({season: season, match_type: type, my_char_id: my_char, opp_id: seq.literal(sql), opp_char_id: opp_char, opp_rank_id: opp_rank, result: result});
        }
        return res.status(200).send([season, type, result, my_char, opp_char, opp_name, opp_rank]);
    })
};