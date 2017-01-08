'use strict';

angular.module('com.github.devzer01.typeMaster.core.data.thai', ['com.github.devzer01.typeMaster.core.locale.thai'])
    .provider('thai', ['localeThProvider', function(typeMasterLocaleProvider) {
    this.$get = function() {
        return {
            filter: typeMasterLocaleProvider.$get().filter,
            keyboard: typeMasterLocaleProvider.$get().keyboard,
            level: "constant",
            defaultLevel: "constant",
            levels: { "constant" : "พยัญชนะ",  "vowels" : "สระ",  "easy": "คำ" },
            words: {
                constant: "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณ".split(""),
                    vowels: ["අ","ආ","ඇ","ඈ","ඉ","ඊ","උ","\u0D8C","එ","ඔ","ඕ"],
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

