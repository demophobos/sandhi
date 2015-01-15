/*
  node (only, not component) module for sandhi processing
*/

var _ = require('underscore');
var util = require('util');
//var slp = require('../utils/slp');
//var shiva = require('../utils/shivasutra');
var shiva = require('../shiva');
var Const = require('./lib/const');
var u = require('./lib/utils');


var voiced_asp = shiva('झष्').result;
var unvoiced_asp = shiva('खव्').del('चव्').result;
var asps = voiced_asp.concat(unvoiced_asp);

var debug = (process.env.debug == 'true') ? true : false;

module.exports = sandhi();

function sandhi() {
    if (!(this instanceof sandhi)) return new sandhi();
    return this;
}

// TODO: результат должен быть уникальным! - _.uniq(res) !!!
// TODO: krit вынести наружу
sandhi.prototype.del = function(form, flex, cflex, prefix, krit) {
    if (prefix) return removePrefix(form, flex, cflex, krit);
    return removeSuffix(form, flex, cflex);
}

// cflex: -ti, flex: -dhi, etc, i.e. variant
function removeSuffix(form, flex, cflex, krit) {
    var stems = [];
    // условие - наружу
    var re = new RegExp(flex + '$');
    var stem = form.replace(re, '');
    //log('---------', form, flex, cflex, stem, (stem == form));
    if (stem == form) return [];

    // if (flex == cflex) return [stem]; // FIXME: это не так, убрать

    //stems.push(stem); // default stem
    var first = cflex[0];
    var clean = stem.replace(/्$/, '');
    if (stem == clean) return [stem];
    var last = clean.slice(-1);
    var flex0 = flex[0];

    var hash = {form: form, stem: stem, flex: flex, cflex: cflex};
    hash.stems = [stem];

    //hash.first = u.ultima(stem); // stemUlt
    hash.stemUlt = u.ultima(stem);
    // hash.virama = u.virama(stem);
    // hash.second = cflex[0];

    // cavarga - c always reduces to k. But j is more irregular. It usually becomes k, but it can also become ṭ or ṣ
    var stem_ends_k = (hash.stemUlt == 'क');
    var cflex_in_tT = (isIN(Const.tT, cflex[0]));
    var flex_in_tT = (isIN(Const.tT, flex[0]));
    if (stem_ends_k && cflex_in_tT && flex_in_tT) cavarga_c(hash);
    // cavarga_c addendum vazwe
    var stem_ends_z = (hash.stemUlt == 'ष');
    var flex_starts_wW = (isIN(Const.wW, flex[0]));
    if (stem_ends_z && cflex_in_tT && flex_starts_wW) cavarga_cw(hash);


    // A final ś changes in these ways - In front of t or th, it becomes ṣ and shifts the letter that follows it to ṭavarga.
    // log('M', stem_ends_z, cflex_in_tT, flex_starts_wW, stem, hash.stemUlt);
    if (stem_ends_z && cflex_in_tT && flex_starts_wW) cavarga_stem_S_cflex_t_flex_w(hash);

    // cavarga_c addendum two_lat_atm_vac - vaSe, vaSvahe, etc
    var stem_ends_S = (hash.stemUlt == 'श');
    if (stem_ends_S) cavarga_cS(hash);

    var stem_ends_kzq = (isIN(Const.kzq, hash.stemUlt));
    var cflex_starts_tT = (isIN(Const.tT, cflex[0])); // возможно, есть еще значения, кроме _t, _h, наверняка
    // if (stem_ends_kzq && cflex_starts_t_h) cavarga_j(hash);



    // FIXME: krit
    if (!krit) krit = true;
    var flex_starts_z = (flex[0] == 'ष');
    // In front of the s of a verb suffix, it becomes k
    // if (krit && flex_starts_z && stem_ends_k) cavarga_SW(hash);

    // повторяет cavarga_cw
    // var stem_ends_s = (hash.stemUlt == 'ष XXX');
    // if (stem_ends_z && cflex_in_tT && flex_starts_wW) cavarga_s(hash);

    // Changing flex _n to _Y (ñ) - the same stem

    //Retroflex letters
    // retroflex letter, if followed by a tavarga letter, shifts it to ṭavarga - the same stem

    // ṣ becomes k when followed by s
    var cflex_starts_s = (cflex[0] == 'स');
    // if (flex_starts_z && cflex_starts_s && stem_ends_k) retroflex_k(hash);

    // final n
    // n becomes the anusvāra root ends with n && flex starts with s
    var stem_ends_anusvara = (hash.stemUlt == 'ं');
    var flex_starts_s = (flex[0] == 'स');
    // if (stem_ends_anusvara && flex_starts_s) final_n(hash);
    // final_m - final m becomes n in front of v
    var flex_starts_v = (flex[0] == 'व');
    var stem_ends_n = (hash.stemUlt == 'न');
    //log('--', flex_starts_v, stem_ends_n);
    // if (stem_ends_n && flex_starts_v) final_m(hash);

    // Aspirated Letters:
    // move_aspirate_forward
    // t- and th-, when they are the second letter, become dh-
    // если флексия из tT стала dh-, то окончание стема аспирируется
    var flex_starts_D = (flex[0] == 'ध');
    // if (cflex_in_tT && flex_starts_D) move_aspirate_forward(hash);

    // move_aspirate_backward
    var stem_ends_VunAC = (isIN(Const.voiced_unasp, hash.stemUlt));
    var flex_starts_BsDv = (isIN(Const.BsDv, flex[0]) || /^ध्व/.test(flex) );
    // if (stem_ends_VunAC && flex_starts_BsDv) move_aspirate_backward(hash);

    // h is treated like gh: The h both ends a root that starts with d and is in front of t, th, or dh;
    // если стем начинается на d, а флексия на tTD или _s, то gh -> h
    var cflex_in_tTD = (isIN(Const.tTD, cflex[0]));
    var stem_starts_d = (stem[0] == 'द');
    var flex_starts_Q = (flex[0] == 'ढ');
    if (cflex_starts_s && flex_starts_z && stem_ends_k) {
        h_like_gh_s_z(hash);
    }

    // if (cflex_starts_s || (cflex_in_tTD && stem_starts_d)) {
    //     h_like_gh_t_or_s(hash);
    // } else if (cflex_in_tTD && flex_starts_Q) {
    //     h_like_gh_other(hash);
    // }

    // final_s - s changes to t
    // TODO: s also becomes t in some parts of the reduplicated perfect
    if (!krit) krit = true;
    var stem_ends_t = (hash.stemUlt == 'त');
    //var flex_starts_s = (flex[0] == 'स');
    // if (stem_ends_t && flex_starts_s && krit) final_s_t(hash);
    var dD = ['द', 'ध'];
    var flex_starts_dD = (isIN(dD, flex[0]));
    // if (flex_starts_dD) final_s_zero(hash);

    // When the second letter letter is a vowel, a nasal, or a semivowel, no sandhi change of any kind will occur
    var nosandhicons = Const.nasals.concat(Const.semivowels).concat(['म', Const.virama]);
    //log('sem', Const.semivowels);
    // var no_results = (hash.stems.length == 0);
    // if (isIN(nosandhicons, flex[0]) && no_results) return [stem];

    // Aspirated letters become unaspirated
    if (isIN(Const.asps, first)) aspiratedBecomeUnaspirated(hash);
    // log('aspirated ==================', isIN(Const.asps, first), hash.stem, hash.stemUlt);

    // EXTERNAL SANDHI THAT MATTER
    // Stops become unvoiced and unaspirated =>
    var stops = Const.unvoiced_unasp;
    // if (isIN(stops, hash.stemUlt)) unvoiced2voiced(hash);
    // log('stops ==================', isIN(stops, hash.stemUlt), hash.stem, hash.stemUlt);

    // c, ś, and h are converted to k. If the c was a j before this reduction started, it might become ṭ instead.
    var ultimaK = (hash.stemUlt == 'क');
    // if (ultimaK) k2cSh(hash);

    // временная затычка для гласных сандхи, и вообще необходимо дефолтное значение
    // if (hash.stems.length == 0) hash.stems.push(stem);

    //log('hash.stems', hash.stems);
    return _.uniq(hash.stems);
}

function final_s_t(hash) {
    var stem = hash.stem.replace(/त्$/, 'स्');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
}

// depends on move_aspirate_forward
// final_s_zero FIXME: исключения? s disappears when in front of _d or _D - не во всех же случаях добавлять s перед _d и _D?
function final_s_zero(hash) {
    if (hash.stems.length > 0) return; // move_aspirate_forward stems should not be changed
    var stem = [hash.stem, 'स्'].join('');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    if (debug) log('mod: final_s_zero', stem);
}

function final_n(hash) {
    var stem = hash.stem.replace(/ं$/, 'न्');
    if (stem == hash.stems) return;
    hash.stems.push(stem);
    if (debug) log('mod: final_n', stem);
}

function final_m(hash) {
    var stem = hash.stem.replace(/न्$/, 'म्');
    if (stem == hash.stems) return;
    hash.stems.push(stem);
    //hash.stems = [stem, hash.stem];
    if (debug) log('mod: final_m', stem);
}

// h is treated like gh: The h both ends a root that starts with d and is in front of t, th, or dh;
// если стем начинается на d, а флексия на tTD, то gh -> h
// depends_on aspirate_forward
function h_like_gh_s_z(hash) {
    var stem = hash.stem.replace(/क्$/, 'ह्');
    hash.stems = [stem];
    if (debug) log('mod: h_like_gh_s_z', stem);
}

function h_like_gh_t_or_s(hash) {
    // поскольку здесь речь только про _gh, случаи _k, (_c, _j) -> можно преобразовать _к -> _g
    // _g получается из _gh по общему правилу
    var stem = hash.stem.replace(/क्$/, 'ग्');
    hash.stems.push(stem);
    var stems = _.map(hash.stems, function(stem) { return stem.replace(/ग्/, 'ह्') });
    // hash.stems = hash.stems.concat(stems);
    if (debug) log('mod: h_like_gh_t_or_s', stem);
}

// three things: 1) changes t, th, and dh — if they follow the h — into ḍh, 2) lengthens the vowel in front of it, if possible, 3) disappears
// укорачиваем гласную перед Q - два варианта, и добавляем h
function h_like_gh_other(hash) {
    // TODO: four exceptions are snih, muh, nah and dṛh
    var vowel_before_Q = hash.stem.slice(-1);
    var short_vowel = Const.longshort[vowel_before_Q];
    var re = new RegExp(vowel_before_Q + '$');
    var short_stem = hash.stem.replace(re, short_vowel);
    short_stem = [short_stem, 'ह्'].join('');
    var stem = [hash.stem, 'ह्'].join('');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    hash.stems.push(short_stem);
    if (debug) log('mod: h_like_gh_other', stem);
}

// t- and th-, when they are the second letter, become dh-
// если флексия tT стала dh-, то окончание стема аспирируется, d-dh
function move_aspirate_forward(hash) {
    var asp = u.unasp2asp(hash.stemUlt);
    if (!asp) return;
    var stem = u.replaceEnd(hash.stem, hash.stemUlt, asp);
    if (!stem || stem == hash.stem) return;
    hash.stems = [stem];
    if (debug) log('mod: move_aspirate_forward', stem);
}

function move_aspirate_backward(hash) {
    var asp = u.unasp2asp(hash.stemUlt);
    if (!asp) return;
    var stem = u.replaceEnd(hash.stem, hash.stemUlt, asp);
    var stem0 = hash.stem[0];
    var stem0idx = Const.GDB.indexOf(stem0);
    var stem0new = Const.gdb[stem0idx];
    stem = stem.replace(stem0, stem0new);
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    if (debug) log('mod: move_aspirate_backward', stem);
}

function cavarga_c(hash) {
    var stem = hash.stem.replace(/क्$/,'च्');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    if (debug) log('mod: cavarga_c', stem);
}

function cavarga_cw(hash) {
    var stem = hash.stem.replace(/ष्$/,'च्');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    if (debug) log('mod: cavarga_cw', stem);
}

function cavarga_cS(hash) {
    var stem = hash.stem.replace(/श$/,'च्').replace(/श्$/,'च्');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    //hash.stems = [stem];
    if (debug) log('mod: cavarga_cS', stem);
}

function cavarga_j(hash) {
    var stem_j = hash.stem.replace(/क्$/,'ज्');
    var stem_z = hash.stem.replace(/ष्$/,'ज्');
    var stem_q = hash.stem.replace(/ष्$/,'ज्');
    var stems = [stem_j, stem_z, stem_q];
    stems = _.uniq(_.compact(stems));
    stems = _.without(stems, hash.stem);
    hash.stems = hash.stems.concat(stems);
    if (debug) log('mod: cavarga_j', stems);
}

function cavarga_SW(hash) {
    var stem = hash.stem.replace(/क्$/,'श्');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    if (debug) log('mod: cavarga_S', stem);
}

function cavarga_s(hash) {
    // overlapped with cavarga_j
    var stem = hash.stem.replace(/ष्$/,'श्');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    if (debug) log('mod: cavarga_s', stem);
}

function cavarga_stem_S_cflex_t_flex_w(hash) {
    var stem = hash.stem.replace(/ष्$/,'श्');
    log('STEM', stem, hash.stem);
    if (stem == hash.stem) return;
    hash.stems = [stem];
    if (debug) log('mod: cavarga_s', hash.stems);
}


function retroflex_k(hash) {
    var stem = hash.stem.replace(/क्$/,'ष्');
    if (stem == hash.stem) return;
    hash.stems.push(stem);
    //hash.stems = [stem];
    if (debug) log('mod: retroflex_k', stem);
}


// Aspirated letters become unaspirated
// наоборот, окончание стема без придыхания получает придыхание, кроме gh?
function aspiratedBecomeUnaspirated(hash) {
    var unasp = u.unasp2asp(hash.stemUlt);
    var stem = u.replaceEnd(hash.stem, hash.stemUlt, unasp);
    if (stem == hash.stem) return;
    hash.stems = [stem];
    if (debug) log('mod: aspiratedBecomeUnaspirated', stem);
}

function unvoiced2voiced(hash) {
    var voiced = u.unvoiced2voiced_unasp(hash.stemUlt);
    if (!voiced) return;
    var stem = u.replaceEnd(hash.stem, hash.stemUlt, voiced);
    if (!stem || stem == hash.stem) return;
    // FIXME: нужно ли добавить неизмененный стем?
    hash.stems.push(stem);
    //ulog(hash);
}

function k2cSh(hash) {
    var stem;
    var cSh = ['च्', 'श्', 'ह्'];
    // var cSh = ['च्', 'श्'];
    _.each(cSh, function(lett) {
        stem = hash.stem.replace(/क्$/, lett) ;
        hash.stems.push(stem);
    });
}

sandhi.prototype.join = function(first, last) {
    // склеивание
}

sandhi.prototype.splitAll = function(samasa) {
    // разбиение на все возможные пары
}

function ulog () {
    var obj = arguments[0];
    if (arguments.length > 1) {
        console.log('==', arguments[0], '==');
        var obj = arguments[1];
    }
    console.log(util.inspect(obj, showHidden=false, depth=null, colorize=true));
}

function isIN(arr, item) {
    return (arr.indexOf(item) > -1) ? true : false;
}

// function reEnd(str) {
//     return new RegExp(str + '$');
// }

function log() { console.log.apply(console, arguments) }
