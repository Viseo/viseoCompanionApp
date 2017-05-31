import moment from "moment";

export default function setDateLang(lang) {
    if (lang === 'en-US') {
        moment.updateLocale('en');
    } else {
        moment.updateLocale('fr', {
            months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
            monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
            monthsParseExact: true,
            weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
            weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
            weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
            weekdaysParseExact: true,
            longDateFormat: {
                LT: 'HH[h]mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
            },
            calendar: {
                sameDay: '[Aujourd\'hui]/LT',
                nextDay: '[Demain]/LT',
                nextWeek: 'dddd/LT',
                lastDay: '[Hier]/LT',
                lastWeek: 'ddd [dernier] LT',
                sameElse: 'ddd Do MMM/LT'
            },
            relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans',
            },
            // dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
            // ordinal: function (number) {
            //     return number + (number === 1 ? 'er' : 'e');
            // },
            meridiemParse: /PD|MD/,
            isPM: function (input) {
                return input.charAt(0) === 'M';
            },
            // In case the meridiem units are not separated around 12, then implement
            // this function (look at locale/id.js for an example).
            // meridiemHour : function (hour, meridiem) {
            //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
            // },
            meridiem: function (hours, minutes, isLower) {
                return hours < 12 ? 'PD' : 'MD';
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4  // The week that contains Jan 4th is the first week of the year.
            }
        });
    }
}