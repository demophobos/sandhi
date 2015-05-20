var utils = require('../utils');

var tests = [
    // {sutra: '8.2.39',
    //  descr: 'hard consonant followed by a soft consonant or vow. changes to the third of its class',
    //  tests: [
    //      ['श्रीमद्भगवद्गीता', 'श्रीमत्', 'भगवद्गीता'],
    //      ['वनादागच्छामि', 'वनात्', 'आगच्छामि'],
    //      ['सद्भडति', 'सत्', 'भडति'],
    //      ['प्रागूध', 'प्राक्', 'ऊध'], // 4.40 ?
    //      ['नगरादागच्छति', 'नगरात्', 'आगच्छति'],
    //      ['भगवद्गीता', 'भगवत्', 'गीता'],
    //      ['वधाद्विना', 'वधात्', 'विना'],
    //      // ['वनात्पिता', 'वनात्', 'पिता'], // failed in this very sutra
    //      ['', '', ''],
    //      ['', '', ''],
    //  ]
    // },

    // In place of the "m" ending in an inflected word , the substitution is to be the "anusvara" if a consonant follows',
    {sutra: '8.4.58',
     descr: 'm,n to anusvara',
     only: 'ext',
     tests: [
         ['तंस', 'तम्', 'स'],
         ['अहंच', 'अहम्', 'च'],
         ['अहञ्च', 'अहम्', 'च'],
         ['अहंतिष्ठामि', 'अहम्', 'तिष्ठामि'],
         ['अहन्तिष्ठामि', 'अहम्', 'तिष्ठामि'],
         ['शिवंनमः', 'शिवम्', 'नमः'],
         ['नरंपृच्छामि', 'नरम्', 'पृच्छामि'],
         ['नरंयच्छति', 'नरम्', 'यच्छति'],
         ['पुष्पंदत्तम्', 'पुष्पम्', 'दत्तम्'],
         ['', '', ''],
         ['', '', ''],
     ]
    },



    {sutra: '8.4.40',
     descr: 'Dental + Palatal / Palatal (ex S) + Dental -> Palatal',
     tests: [
         ['शिवश्च', 'शिवस्', 'च'], // dental + palatal - 8.4.40 -> corr -> 8.4.55 -> err, wtf?
         ['तच्च', 'तत्', 'च'],
         ['तज्जह', 'तत्', 'जह'], // soft
         ['रामश्शेते', 'रामस्', 'शेते'],
         ['तज्जातम्', 'तत्', 'जातम्'],
         ['ताञ्जनान्', 'तान्', 'जनान्'], // nasal

         ['तच्शिवः', 'तत्', 'शिवः'], // S - non opt
         ['तच्छिवः', 'तत्', 'शिवः'], // S opt
         ['हरिश्शेते', 'हरिस्', 'शेते'],
         ['तज्जातम्', 'तत्', 'जातम्'],
         ['', '', ''],
     ]
    },

    {sutra: '8.4.41',
     descr: 'A (dental class consonant) followed by a (cerebral class consonant) changes to the (corresponding cerebral)',
     tests: [
         // ['ताण्डम्बरानरामष्षष्ठः्', 'तान्', 'डम्बरान्'],
         ['ताण्डम्बरान्', 'तान्', 'डम्बरान्'],
         ['तट्षट्', 'तत्', 'षट्'],
         ['रामष्षष्ठः', 'रामस्', 'षष्ठः'],
         ['तड्डयते', 'तत्', 'डयते'],
         ['तट्टिका', 'तत्', 'टिका'],
         ['', '', ''],
         // ['वाग्देवताचरितचित्रितचित्तसद्मा', 'वाक् देवता चरित चित्रित चित्त सद्मा', ''], // INTEGR
         ['', '', ''],
     ]
    },

    // {sutra: '8.4.44',
    //  descr: 'palatal + dental', // непонятно, откуда взято - не работает - нужно добавить отдельную сутру или это часть уже существующей?
    //  tests: [
    //      ['याच्ञा', 'याच्', 'ना'], // palatal + dental
    //      ['', '', ''],
    //      ['', '', ''],
    //      ['', '', ''],
    //  ]
    // },

    {sutra: '8.4.60',
     descr: 'a dental n or dental other than n and s is followed by l',
     only: 'ext',
     tests: [
         ['तल्लयः', 'तत्', 'लयः'],
         ['विद्वालँ्लिखति', 'विद्वान्', 'लिखति'],
         ['चिल्लीनः', 'चिद्', 'लीनः'],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
     ]
    },

    {sutra: '8.4.45',
     descr: 'class consonant followed by (nasal) optionally changes to the nasal of class, or less commonly for class hard consonants, changes to 3rd consonant of class',
     only: 'ext',
     tests: [
         ['एतन्मुरारि', 'एतद्', 'मुरारि'], // opt
         ['एतद्मुरारि', 'एतद्', 'मुरारि'],
         ['षण्मासा', 'षट्', 'मासा'],
         ['षड्मासा', 'षट्', 'मासा'], // то же самое, 3-й класс - какая сутра ???
         ['तन्मुग्धम्', 'तत्', 'मुग्धम्'],
         ['तद्मुग्धम्', 'तत्', 'मुग्धम्'],
         ['सम्यङ्मिलितः', 'सम्यक्', 'मिलितः'],
         ['सम्यग्मिलितः', 'सम्यक्', 'मिलितः'],
         ['', '', ''],
     ]
    },

    {sutra: '8.4.55',
     descr: 'soft consonant except nasal, followed by a hard consonant changes to 1st consonant of class',
     only: 'ext',
     tests: [
         ['एतत्पतति', 'एतद्', 'पतति'],
         ['सुहृत्सु', 'सुहृद्', 'सु'],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
     ]
    },

    {sutra: 'cons-nasal-doubled',
     descr: 'ङ्, ण्, न् at the end of a word after a short vowel doubles itself when followed by a vowel',
     only: 'ext',
     tests: [
         ['प्रत्यङ्ङात्मा', 'प्रत्यङ्', 'आत्मा'],
         ['सुगण्णिति', 'सुगण्', 'इति'],
         ['तस्मिन्नेव', 'तस्मिन्', 'एव'],
         ['विषीदन्निदम्', 'विषीदन्', 'इदम्'],
         ['', '', ''],
     ]
    },



    {sutra: '',
     descr: '',
     only: 'ext',
     tests: [
         ['', '', ''],
         ['', '', ''],
     ]
    },

]

describe('consonant sandhi', function() {
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
