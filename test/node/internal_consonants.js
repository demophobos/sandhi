// http://learnsanskrit.org/references/sandhi/internal

var utils = require('../utils');

// form, flex, canon.flex, stem = result
var aspirated_become_unaspirated = [
    ['रुन्द्ध्वे', 'ध्वे', 'ध्वे', 'रुन्ध्'],
];

var move_aspirate_forward = [
    ['बुद्ध', 'ध', 'त', 'बुध्'],
    ['रुन्द्धः', 'धः', 'थः', 'रुन्ध्'],
    ['दुग्ध', 'ध', 'त', 'दुह्'],
];

// h is treated like gh cflex=s
var h_like_gh_s_z = [
    ['लेक्षि', 'षि', 'सि', 'लेह्'],
];

// h is treated like gh
var h_like_gh_t_or_s = [
    ['लेक्षि', 'षि', 'सि', 'लेह्'], // FIXME: si->zi ?
    ['दग्ध', 'ध', 'त', 'दह्'],
    ['दिग्ध्वे', 'ध्वे', 'ध्वे', 'दिह्'],
];

// h_like_gh_other
var test4 = [
    ['मूढ', 'ढ', 'त', 'मुह्'],
    ['लीढ', 'ढ', 'त', 'लिह्'],
    ['ऊढ', 'ढ', 'त', 'ऊह्'],
];

// final_s
var final_s = [
    ['वत्स्यति', 'स्यति', 'xxx', 'वस्'],
    ['जिघत्सति', 'सति', 'xxx', 'जिघस्'],
    ['शाधि', 'धि', 'xxx', 'शास्'],
];

var move_aspirate_backward = [
    ['भुद्ध्वम्', 'ध्वम्', 'xxx', 'बुध्'], // अभुद्ध्वम् - w/o affix
    ['', '', '', ''],
];

var no_sandhi_change_of_any_kind = [
    ['वचन्ति', 'न्ति', 'xxx', 'वच'], // अन्ति, stem=वच्
    ['वच्मि', 'मि', '', 'वच्'],
    ['वाच्य', 'य', '', 'वाच्'],
    ['', '', '', ''],
];

var cavarga_c = [
    ['वक्ति', 'ति', 'ति', 'वच्'],
    ['वष्टे', 'टे', 'ते', 'वच्'],
];

var cavarga_j = [
    ['युक्त', 'त', 'त', 'युज्'],
    ['राष्ट्र', 'ट्र', 'त्र', 'राज्'],
];

var cavarga_S = [
    ['', '', '', ''],
    ['द्रक्ष्यसि', 'ष्यसि', 'xxx', 'द्रश्'],
];

var cavarga_stem_S_cflex_t_flex_w = [
    ['विष्ट', 'ट', 'त', 'विश्'],
    ['', '', '', ''],
];

var retroflex_k = [
    ['द्वेक्षि', 'षि', 'सि', 'द्वेष्'],
];

var final_n = [
    ['जिघांसति', 'सति', 'xxx', 'जिघान्'],
    ['मीमांसति', 'सति', 'xxx', 'मीमान्'],
    ['', '', '', ''],
];

var final_m = [
    ['जगन्वत्', 'वत्', 'xxx', 'जगम्'],
    ['', '', '', ''],
];

describe('Internal consonants sandhi', function() {
    describe('aspirated_become_unaspirated OK', function() {
        utils.test(aspirated_become_unaspirated);
    });
    describe('move_aspirate_backward', function() {
        utils.test(move_aspirate_backward);
    });
    describe('move_aspirate_forward', function() {
        utils.test(move_aspirate_forward);
    });
    describe('h_like_gh_s_z OK', function() {
        utils.test(h_like_gh_s_z);
    });
    describe('h_like_gh_other', function() {
        utils.test(test4);
    });
    describe('final_s', function() {
        utils.test(final_s);
    });
    describe('no_sandhi_change_of_any_kind', function() {
        utils.test(no_sandhi_change_of_any_kind);
    });
    describe('cavarga_c', function() {
        utils.test(cavarga_c);
    });
    describe('cavarga_j', function() {
        utils.test(cavarga_j);
    });
    describe('cavarga_S', function() {
        utils.test(cavarga_S);
    });
    describe('cavarga_stem_S_cflex_t_flex_w', function() {
        utils.test(cavarga_stem_S_cflex_t_flex_w);
    });
    describe('retroflex_k', function() {
        utils.test(retroflex_k);
    });
    describe('final_n', function() {
        utils.test(final_n);
    });
    describe('final_m', function() {
        utils.test(final_m);
    });
});



// describe(descr, function() {
//     utils.test(tests);
// });
