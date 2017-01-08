'use strict';

angular.module('com.github.devzer01.typeMaster.core.data.thai', ['com.github.devzer01.typeMaster.core.locale.thai'])
    .provider('thai', ['localeThProvider', function(typeMasterLocaleProvider) {
    this.$get = function() {
        return {
            filter: typeMasterLocaleProvider.$get().filter,
            keyboard: typeMasterLocaleProvider.$get().keyboard,
            level: "constant",
            defaultLevel: "constant",
            levels: { "constant" : "พยัญชนะ",  "vowels" : "สระ", "numbers": 'หมายเลข' , "easy": "คำ" },
            words: {
                constant: "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณ".split(""),
                vowels: ["\u0E30","\e0E31","\u0E32","\u0E33","\u0E34","\u0E35","\u0E36","\u0E37","\u0E38","\u0E39","\u0E3A", "\u0E40", "\u0E41", "\u0E42", "\u0E43", "\u0E44" ,"\u0E47"],
                numbers: ["\u0E50", "\u0E51", "\u0E52", "\u0E53", "\u0E54", "\u0E55", "\u0E56", "\u0E57", "\u0E58", "\u0E59"],
                easy: ["แม่", "งานแต่งงาน", "อาชีพ", "ปีใหม่", "เพื่อน", "อารยธรรม", "การเดินทาง", "ประธานาธิบดี", "พ่อ", "ศุลกากร"]
            },
            translation: {
                'VERSION': 'รุ่น',
                'COPYRIGHT': 'ลิขสิทธิ์',
                'APPNAME' : 'เรียนรู้ที่จะพิมพ์',
                'GREETINGS' : 'สวัสดี',
                'TAGLINE' : 'สนุกกับการเรียน',
                'HELPTITLE' : 'วิธีการเปิดใช้คีย์บอร์ดภาษาไทย',
                'HELP' : 'ช่วยด้วย',
                'HOWTOTITLE' : 'วิธีการเล่น',
                'STEP1' : 'กดปุ่มเริ่มต้น',
                'STEP2' : 'ประเภทคำที่คุณเห็น',
                'STEP3' : 'ใช้แป้นพิมพ์ดิบ - ไม่ออกเสียง',
                'START' : 'เริ่มต้น',
                'LOOSE': 'แพ้',
                'WON': 'ชนะ',
                'EFFICIENCY': 'ประสิทธิภาพ',
                'TIME': 'เวลา',
                'SCORE': 'คะแนน',
                'PLAY_AGAIN': 'เล่นอีกครั้ง'
            }
        }
    }
}]);

