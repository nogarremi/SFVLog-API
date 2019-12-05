var seq = require('../models/seq');
var players = seq.import('../models/players');
var characters = seq.import('../models/characters');
var matches = seq.import('../models/matches');
var _ = require('underscore');
var fs = require('fs');
var config = require('../config');

matches.belongsTo(characters, {foreignKey: 'char_id'});
matches.belongsTo(players, {foreignKey: 'opp_id'});
exports.getPlayers = function(req, res) {
    players.findAll()
    .then(p => {
        if(!p) {
            return res.status(400).send({
                message: "No players found!"
            })
        }

        return res.status(200).send({
            players: p
        })
    })
};

exports.getCharacters = function(req, res) {
    characters.findAll()
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

exports.getAllMatches = function(req, res) {
    matches.findAll()
    .then(r => {
        if(!r) {
            return res.status(400).send({
                message: "No matches found!"
            })
        }

        return res.status(200).send({
            matches: m
        })
    })
};

/*
exports.getSpecificMatches = function(req, res) {
    matches.findAll({
        where: {
            year: req.params.year,
            match_type: req.params.match_type,
            myChar: req.params.myChar,
            oppName: req.params.oppName,
            oppChar: req.params.oppChar,
            result: req.params.result
        },
        include: [characters, players]
    }).then(m => {
        if(!m) {
            return res.status(400).send({
                message: "No matches found!"
            })
        }

        return res.status(200).send({
            matches: final_obj
        })
    })
}
*/