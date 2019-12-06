var seq = require('../models/seq');
var opponents = seq.import('../models/opponents');
var characters = seq.import('../models/characters');
var matches = seq.import('../models/matches');
var ranks = seq.import('../models/ranks');
var _ = require('underscore');
var fs = require('fs');
var config = require('../config');

opponents.belongsTo(ranks, {foreignKey: 'rank_id '});
matches.belongsTo(characters, {foreignKey: 'char_id'});
matches.belongsTo(opponents, {foreignKey: 'opp_id'});
exports.getOpponents = function(req, res) {
    opponents.findAll()
    .then(p => {
        if(!p) {
            return res.status(400).send({
                message: "No opponents found!"
            })
        }

        return res.status(200).send({
            opponents: o
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
        include: [characters, opponents]
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