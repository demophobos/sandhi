var utils = require('../utils');

var tests = [
    {sutra: '1.6.101',
     descr: 'simple vowel, followed by a similar vowel',
     tests: [
         ['योगानुशासन', 'योग', 'अनुशासन'], // a + a = A
         ['योगानन्द', 'योग', 'आनन्द'],
         ['महामृत', 'महा', 'अमृत'],
         ['महानन्द', 'महा', 'आनन्द'],

         ['ऋद्धीष्ट', 'ऋद्धि', 'इष्ट'], // i + i = I
         ['देवीयम्', 'देवी', 'इयम्'],
         ['ऋद्धीप्सन', 'ऋद्धि', 'ईप्सन'],
         ['नदीश्वरी', 'नदी', 'ईश्वरी'],

         ['तनूदर', 'तनु', 'उदर'], // u + u = U
         ['चमूत्तमा', 'चमू', 'उत्तमा'],
         ['तनून', 'तनु', 'ऊन'],
         ['चमूर्जिता', 'चमू', 'ऊर्जिता'],

         ['पितॄण', 'पितृ', 'ऋण'], // f + f = F
         ['होतॄकार', 'होतृ', 'ॠकार'],
         ['होतॄकार', 'होतृ', 'ऌकार'], // f + x = F

         ['देवार्हित', 'देव', 'अर्हित'],  // a + ar = Ar
         ['महार्जुन', 'महा', 'अर्जुन'],
         ['नरालभ्य', 'नर', 'अलभ्य'], // a + al = Al
         ['सेनालोभ', 'सेना', 'अलोभ'],

         ['देहाविष्ट', 'देह', 'आविष्ट'], // a + A = A
         ['महाकार', 'महा', 'आकार'],
         // ['', '', ''],
         // ['', '', ''],
     ]
    },
    {sutra: '6.1.88',
     descr: 'a or ā is followed by e, o, ai or au - vriddhi',
     tests: [
         ['नरैन्द्रिय', 'नर', 'ऐन्द्रिय'],
         ['सदैश्वर', 'सदा', 'ऐश्वर'],
         ['नरौदर्य', 'नर', 'औदर्य'],
         ['सदौरग', 'सदा', 'औरग'],

         ['देवैकत्व', 'देव', 'एकत्व'], // a + e = E
         ['सैव', 'सा', 'एव'],

         ['परौजस्', 'पर', 'ओजस्'], // a + o = O
         ['महौघ', 'महा', 'ओघ'],
         // ['', '', ''],
     ]
    },

    {sutra: '6.1.87',
     descr: 'a or ā is followed by i, ī, u, ū, ṛ, ṝ or ḷ -  guna',
     tests: [
         ['नेति', 'न', 'इति'], // a + i = e
         ['परेश', 'पर', 'ईश'],
         ['महेन्दु', 'महा', 'इन्दु'],
         ['महेश्वर', 'महा', 'ईश्वर'],

         ['केनोपनिषत्', 'केन', 'उपनिषत्'], // a + u = o
         ['परमोर्मि', 'परम', 'ऊर्मि'],
         ['सदोपयोग', 'सदा', 'उपयोग'],
         ['रमोरु', 'रमा', 'ऊरु'],

         ['रामर्द्धि', 'राम', 'ऋद्धि'], // a + f = ar
         ['परर्कार', 'पर', 'ॠकार'],
         ['महर्षि', 'महा', 'ऋषि'],
         ['महर्कार', 'महा', 'ॠकार'],

         ['तवल्कार', 'तव', 'ऌकार'], // a + x = al
         ['महल्कार', 'महा', 'ऌकार'],
         // ['', '', ''],
     ]
    },
    {sutra: '',
     descr: '',
     ext: true,
     tests: [
         ['', '', ''], //
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
     ]
    },
    {sutra: '',
     descr: '',
     ext: true,
     tests: [
         ['', '', ''], //
         ['', '', ''],
     ]
    },
    {sutra: '',
     descr: '',
     ext: true,
     tests: [
         ['', '', ''], //
         ['', '', ''],
     ]
    },

]

describe('vowel sandhi', function() {
    tests.forEach(function(t) {
        if (t.sutra == '') return;
        var descr = [t.sutra, t.descr].join(' - ');
        describe(descr, function() {
            t.tests.forEach(function(test) {
                utils.test(test);
            });
        });
    });
});

// describe('vowel sandhi', function() {
//     describe('6.1.101 - simple vowel, followed by a similar vowel', function() {
//         s6_1_101.forEach(function(test) {
//             utils.test(test);
//         });
//     });
//     describe('6.1.88 - a or ā is followed by e, o, ai or au - vriddhi', function() {
//         s6_1_88.forEach(function(test) {
//             utils.test(test);
//         });
//     });
//     describe('6.1.87 - a or ā is followed by i, ī, u, ū, ṛ, ṝ or ḷ -  guna ', function() {
//         s6_1_87.forEach(function(test) {
//             utils.test(test);
//         });
//     });
// });
