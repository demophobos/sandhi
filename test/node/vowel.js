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
         ['विद्यालयः', 'विद्या', 'आलयः'],
         ['नमसीश्वरम्', 'नमसि', 'ईश्वरम्'],
         ['भानूदयः', 'भानु', 'उदयः'],
         ['पितॄणम्', 'पितृ', 'ॠणम्'],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
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

    {sutra: '6.1.78',
     descr: 'diphthong followed by any vowel, including itself, changes to its semi-vowel equivalent',
     only: 'int',
     tests: [
         ['शक्तये', 'शक्ते', 'ए'],
         ['अलये', 'अले', 'ए'],
         ['धेनवे', 'धेनो', 'ए'],
         ['ऊरवे', 'ऊरो', 'ए'],
         ['ध्यायामि', 'ध्यै', 'आमि'],
         ['सायन्ति', 'सै', 'अन्ति'],
         ['नयनम्', 'ने', 'अनम्'],
         ['नवनम्', 'नो', 'अनम्'],
         ['', '', ''],
     ]
    },
    {sutra: '6.1.78',
     descr: 'diphthong followed by any vowel, including itself, changes to its semi-vowel equivalent - external - optional',
     tests: [
         ['हरयिह', 'हरे', 'इह'], // coalesced
         ['हर इह', 'हरे', 'इह'], // semi-vow dropped, one by one
         ['विष्णविह', 'विष्णो', 'इह'],
         ['विष्णविह', 'विष्णो', 'इह'],
         ['देव्यायर्पय', 'देव्यै', 'अर्पय'],
         ['देव्या अर्पय', 'देव्यै', 'अर्पय'],
         ['रवावस्तङ्गते', 'रवौ', 'अस्तङ्गते'],
         ['रवा अस्तङ्गते', 'रवौ', 'अस्तङ्गते'],

         ['असावूर्मि', 'असौ', 'ऊर्मि'],
         ['नावासन', 'नौ', 'आसन'],
         ['हर आन', 'हरे', 'आन'],
         ['अल आगच्छ', 'अले', 'आगच्छ'],
         ['साध एहि', 'साधो', 'एहि'],
         ['गुर आप्नुहि', 'गुरो', 'आप्नुहि'],
         ['नद्या अरविन्दानि', 'नद्यै', 'अरविन्दानि'],
         ['देव्या अन्नम्', 'देव्यै', 'अन्नम्'],
         ['गुरा अददत्', 'गुरौ', 'अददत्'],
         ['पशा अस्निहत्', 'पशौ', 'अस्निहत्'],
         ['', '', ''],
     ]
    },

    {sutra: '6.1.109',
     descr: '"e" and "o" at the end of a word, when followed by "a" gives avagraha',
     only: 'ext',
     tests: [
         ['वनेऽटति', 'वने', 'अटति'], //
         ['शक्तयेऽर्चन्ति', 'शक्तये', 'अर्चन्ति'],
         ['गुरोऽङ्ग्धि', 'गुरो', 'अङ्ग्धि'],
         ['विष्णोऽक्ष्णुहि', 'विष्णो', 'अक्ष्णुहि'],
         ['', '', ''],
     ]
    },

    {sutra: '6.1.77',
     descr: 'simple vowel except A or Aa followed by a dissimilar simple vowel changes to its semi-vowel',
     tests: [
         ['योग्यङ्ग', 'योगि', 'अङ्ग'], // i
         ['योग्यालम्बन', 'योगि', 'आलम्बन'],
         ['योग्युत्तम', 'योगि', 'उत्तम'],
         ['योग्यूर्जस्', 'योगि', 'ऊर्जस्'],
         ['योग्यृद्धि', 'योगि', 'ऋद्धि'],
         ['योग्यॄकार', 'योगि', 'ॠकार'],
         ['योग्येकता', 'योगि', 'एकता'],
         ['योग्यैश्वर्य', 'योगि', 'ऐश्वर्य'],
         ['योग्योजस्', 'योगि', 'ओजस्'],
         ['योग्यौषध', 'योगि', 'औषध'],

         ['गुर्वङ्ग', 'गुरु', 'अङ्ग'], // u
         ['गुर्वालम्बन', 'गुरु', 'आलम्बन'],
         ['गुर्विच्छा', 'गुरु', 'इच्छा'],
         ['गुर्वीश', 'गुरु', 'ईश'],
         ['गुर्वृद्धि', 'गुरु', 'ऋद्धि'],
         ['गुर्वॄकार', 'गुरु', 'ॠकार'],
         ['गुर्वेकता', 'गुरु', 'एकता'],
         ['गुर्वैश्वर्य', 'गुरु', 'ऐश्वर्य'],
         ['गुर्वोजस्', 'गुरु', 'ओजस्'],
         ['गुर्वौषध', 'गुरु', 'औषध'],

         ['मात्रङ्ग', 'मातृ', 'अङ्ग'], // f
         ['मात्रालम्बन', 'मातृ', 'आलम्बन'],
         ['मात्रिच्छा', 'मातृ', 'इच्छा'],
         ['मात्रीश', 'मातृ', 'ईश'],
         ['मात्रुत्तम', 'मातृ', 'उत्तम'],
         ['मात्रूर्जस्', 'मातृ', 'ऊर्जस्'],
         ['मात्रेकता', 'मातृ', 'एकता'],
         ['मात्रैश्वर्य', 'मातृ', 'ऐश्वर्य'],
         ['मात्रोजस्', 'मातृ', 'ओजस्'],
         ['मात्रौषध', 'मातृ', 'औषध'],

         ['लङ्ग', 'ऌ', 'अङ्ग'], // x
         ['लालम्बन', 'ऌ', 'आलम्बन'],
         ['लिच्छा', 'ऌ', 'इच्छा'],
         ['लीश', 'ऌ', 'ईश'],
         ['लुपदेश', 'ऌ', 'उपदेश'],
         ['लूर्जस्', 'ऌ', 'ऊर्जस्'],
         ['लेकता', 'ऌ', 'एकता'],
         ['लैश्वर्य', 'ऌ', 'ऐश्वर्य'],
         ['लोजस्', 'ऌ', 'ओजस्'],
         ['लौपस्थान', 'ऌ', 'औपस्थान'],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
     ]
    },

    {sutra: '',
     descr: '',
     only: 'int',
     tests: [
         ['', '', ''], //
         ['', '', ''],
     ]
    },
    {sutra: '',
     descr: '',
     only: 'int',
     tests: [
         ['', '', ''], //
         ['', '', ''],
     ]
    },
]

describe('vowel sandhi', function() {
    tests.forEach(function(t) {
        if (t.sutra == '') return;
        var descr = [t.sutra, t.descr, t.only].join(' - ');
        describe(descr, function() {
            t.tests.forEach(function(test, idx) {
                if (t.only) test.push(t.only);
                utils.test(test, idx);
            });
        });
    });
});

// describe('vowel sandhi', function() {
//     tests.forEach(function(t) {
//         if (t.sutra == '') return;
//         var descr = [t.sutra, t.descr, t.only].join(' - ');
//         describe(descr, function() {
//             t.tests.forEach(function(test) {
//                 if (t.only) test.push(t.only);
//                 utils.test(test);
//             });
//         });
//     });
// });
