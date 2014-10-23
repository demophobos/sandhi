/*
  node (only, not component) module for sanskrit sandhi processing
*/

var _ = require('underscore');
var util = require('util');
var slp = require('../utils/slp');
var shiva = require('../utils/shivasutra');
var Const = require('./lib/const');
var u = require('./lib/utils');


var voiced_asp = shiva('झष्').result;
var unvoiced_asp = shiva('खव्').del('चव्').result;
var asps = voiced_asp.concat(unvoiced_asp);

module.exports = sandhi();

function sandhi() {
    if (!(this instanceof sandhi)) return new sandhi();
    return this;
}

sandhi.prototype.del = function(form, flex, cflex, prefix) {
    if (prefix) return removePrefix(form, flex, cflex);
    return removeSuffix(form, flex, cflex);
}

/* 1. нужно добавлять -cflex, т.е. исходную форму во все флексии. Может и неплохо, кстати. Как раз резерв ограничения кол-ва результатов.
   2. Неясный код. Ладно.
   3. Последовательность? Как уложить все кейсы?
*/


var t_th = ['त', 'थ'];
var t_th_dh = ['त', 'थ', 'ध'];

// cflex: -ti, flex: -dhi, etc, i.e. variant
function removeSuffix(form, flex, cflex) {
    var stems = [];

    // условие - наружу
    var re = new RegExp(flex + '$');
    var stem = form.replace(re, '');
    //log('---------', form, flex, cflex, stem)
    if (stem == form) return [];


    /* здесь тоже - не просто вызов набора функций _t_th_etc_, а вызов в цикле ?
       постоянные - hash.prima, hash.second,
       вычисляются - hash.ultima == hash.first
     */

    stems.push(stem); // default stem
    var first = cflex[0];
    var clean = stem.replace(/्$/, '');
    var last = clean.slice(-1);

    var hash = {};
    hash.stems = [stem];
    hash.first = u.ultima(stem);
    hash.virama = u.virama(stem);
    hash.second = cflex[0];

    // Aspirated Letters:
    if (isIN(t_th, first)) aspirated_t_th(stems, hash);
    if (isIN(t_th_dh, first) && stem[0] == 'द')  h_2_t_th_dh(hash);

    log('HASH STEMS', hash.stems);
    return hash.stems;
}

// h is treated like gh: The h both ends a root that starts with d and is in front of t, th, or dh;
function h_2_t_th_dh(hash) {
    ulog(hash);

    return;
}

// t- and th-, when they are the second letter, become dh-
function aspirated_t_th(stems, hash) {
    _.each(hash.stems, function(stem) {
        var first = hash.first;
        var asp = u.unasp2asp(first);
        if (hash.virama) {
            first = [first, Const.virama].join('');
            asp = [asp, Const.virama].join('');
        }
        var newStem = stem.replace(reEnd(first), asp);
        hash.stems.push(newStem);
    });
    return;
}



sandhi.prototype.join = function(first, last) {
    // склеивание
}

sandhi.prototype.splitAll = function(samasa) {
    // разбиение на все возможные пары
}

function ulog (obj) {
    console.log(util.inspect(obj, showHidden=false, depth=null, colorize=true));
}

function isIN(arr, item) {
    return (arr.indexOf(item) > -1) ? true : false;
}

function reEnd(str) {
    return new RegExp(str + '$');
}

function log() { console.log.apply(console, arguments) }
