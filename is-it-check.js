// Hosted at https://github.com/evdama/is-it-check

// AMD with global, Node, or global
((root, factory) => {    // eslint-disable-line no-extra-semi
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(() => // Also create a global in case some scripts
        // that are loaded still are looking for
        // a global even when an AMD loader is in use.
        root.is = factory())
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory()
    } else {
        // Browser globals (root is self)
        root.is = factory()
    }
})(this, () => {

    // Baseline
    /* -------------------------------------------------------------------------- */

    // define 'is' object and current version
    const is = {}
    is.VERSION = '1.0.4'

    // define interfaces
    is.not = {}
    is.all = {}
    is.any = {}

    // cache some methods to call later on
    const toString = Object.prototype.toString
    const slice = Array.prototype.slice
    const hasOwnProperty = Object.prototype.hasOwnProperty

    // helper function which reverses the sense of predicate result
    const not = func => (...args) => !func(...slice.call(args))

    // helper function which call predicate function per parameter and return true if all pass
    const all = func => (...args) => {
        const params = getParams(args)
        for (const param of params) {
          if (!func.call(null, param)) {
              return false
          }
        }
        return true
    }

    // helper function which call predicate function per parameter and return true if any pass
    const any = func => (...args) => {
        const params = getParams(args)
        for (const param of params) {
          if (func.call(null, param)) {
              return true
          }
        }
        return false
    }

    // build a 'comparator' object for various comparison checks
    const comparator = {
        '<': (a, b) => a < b,
        '<=': (a, b) => a <= b,
        '>': (a, b) => a > b,
        '>=': (a, b) => a >= b
    }

    // helper function which compares a version to a range
    const compareVersion = (version, range) => {
        const string = (`${range}`)
        const n = +(string.match(/\d+/) || NaN)
        const op = string.match(/^[<>]=?|/)[0]
        return comparator[op] ? comparator[op](version, n) : (version == n || n !== n)
    }

    // helper function which extracts params from arguments
    const getParams = args => {
        let params = slice.call(args)
        const length = params.length
        if (length === 1 && is.array(params[0])) {    // support array
            params = params[0]
        }
        return params
    }

    // Type checks
    /* -------------------------------------------------------------------------- */

    // is a given value Arguments?
    is.arguments = value => // fallback check is for IE
    toString.call(value) === '[object Arguments]' || value != null && typeof value === 'object' && 'callee' in value

    // is a given value Array?
    is.array = Array.isArray || (value => // check native isArray first
    toString.call(value) === '[object Array]')

    // is a given value Boolean?
    is.boolean = value => value === true || value === false || toString.call(value) === '[object Boolean]'

    // is a given value Char?
    is.char = value => is.string(value) && value.length === 1

    // is a given value Date Object?
    is.date = value => toString.call(value) === '[object Date]'

    // is a given object a DOM node?
    is.domNode = object => is.object(object) && object.nodeType > 0

    // is a given value Error object?
    is.error = value => toString.call(value) === '[object Error]'

    // is a given value function?
    is['function'] = value => // fallback check is for IE
    toString.call(value) === '[object Function]' || typeof value === 'function'

    // is given value a pure JSON object?
    is.json = value => toString.call(value) === '[object Object]'

    // is a given value NaN?
    is.nan = value => Number.isNaN(value)

    // is a given value null?
    is['null'] = value => value === null

    // is a given value number?
    is.number = value => new Number(value) instanceof Number && typeof value === 'number' && Number.isFinite(value)

    // is a given value object?
    is.object = value => Object(value) === value

    // is a given value RegExp?
    is.regexp = value => toString.call(value) === '[object RegExp]'

    // are given values same type?
    // prevent NaN, Number same type check
    is.sameType = (value, other) => {
        const tag = toString.call(value)
        if (tag !== toString.call(other)) {
            return false
        }
        if (tag === '[object Number]') {
            return !is.any.nan(value, other) || is.all.nan(value, other)
        }
        return true
    }
    // sameType method does not support 'all' and 'any' interfaces
    is.sameType.api = ['not']

    // is a given value String?
    is.string = value => new String(value) instanceof String && typeof value === 'string' && toString.call(value) === '[object String]'

    // is a given value undefined?
    is.undefined = value => value === void 0

    // is a given value window?
    // setInterval method is only available for window object
    is.windowObject = value => value != null && typeof value === 'object' && 'setInterval' in value

    // Presence checks
    /* -------------------------------------------------------------------------- */

    //is a given value empty? Objects, arrays, strings
    is.empty = value => {
        if (is.object(value)) {
            const length = Object.getOwnPropertyNames(value).length
            if (length === 0 || (length === 1 && is.array(value)) ||
                    (length === 2 && is.arguments(value))) {
                return true
            }
            return false
        }
        return value === ''
    }

    // is a given value a Map?
    is.map = value => {
        // checking stringified constructor in case toString() yields '[object Object]'
        // instead of '[object Map]'
        const mapRegex = /^function\s+Map\b/
        const constructorStr = value.constructor ? value.constructor + '' : ''
        return mapRegex.test(constructorStr)
    }

    // is a given value existy?
    is.existy = value => value != null

    // is a given value falsy?
    is.falsy = value => !value

    // is a given value truthy?
    is.truthy = not(is.falsy)

    // Arithmetic checks
    /* -------------------------------------------------------------------------- */

    // is a given number above minimum parameter?
    is.above = (n, min) => is.all.number(n, min) && n > min
    // above method does not support 'all' and 'any' interfaces
    is.above.api = ['not']

    // is a given number decimal?
    is.decimal = n => is.number(n) && n % 1 !== 0

    // are given values equal? supports numbers, strings, regexes, booleans
    // TODO: Add object support
    is.equal = (value, other) => {
        // arrays
        if (is.all.array(value, other)) {
          return value.length === other.length && value.every(element => other.includes(element))
        }

        // objects
        if (is.all.object(value, other)) {
          return JSON.stringify(value) === JSON.stringify(other)
        }

        // check 0 and -0 equity with Infinity and -Infinity
        if (is.all.number(value, other)) {
            return value === other && 1 / value === 1 / other
        }

        // check regexes as strings too
        if (is.all.string(value, other) || is.all.regexp(value, other)) {
            return `${value}` === `${other}`
        }

        if (is.all.boolean(value, other)) {
            return value === other
        }

        return false
    }
    // equal method does not support 'all' and 'any' interfaces
    is.equal.api = ['not']

    // is a given number even?
    is.even = n => is.number(n) && n % 2 === 0

    // is a given number finite?
    is.finite = isFinite || (n => is.not.infinite(n) && is.not.nan(n))

    // is a given number infinite?
    is.infinite = n => n === Infinity || n === -Infinity

    // is a given number integer?
    is.integer = n => Number.isInteger(n)

    // is a given number negative?
    is.negative = n => is.number(n) && n < 0

    // is a given number odd?
    is.odd = n => is.number(n) && (n % 2 === 1 || n % 2 === -1)

    // is a given number positive?
    is.positive = n => is.number(n) && n > 0

    // is a given number above maximum parameter?
    is.under = (n, max) => is.all.number(n, max) && n < max
    // least method does not support 'all' and 'any' interfaces
    is.under.api = ['not']

    // is a given number within minimum and maximum parameters?
    is.within = (n, min, max) => is.all.number(n, min, max) && n > min && n < max
    // within method does not support 'all' and 'any' interfaces
    is.within.api = ['not']

    // Regexp checks
    /* -------------------------------------------------------------------------- */
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation

    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // eppPhone match extensible provisioning protocol format
    // nanpPhone match north american number plan format
    // time match hours, minutes, and seconds, 24-hour clock
    const regexes = {
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        dateString: /^(1[0-2]|0?[1-9])([/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
        email: /^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-.]{0,1}([a-zA-Z][-.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([.-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i,
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
        hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
        macAddress: /^([0-9a-f]{2}[-:]){5}[0-9a-f]{2}$/i,
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
        url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i,
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
    }

    const regexpCheck = (regexp, regexes) => {
        is[regexp] = value => is.existy(value) && regexes[regexp].test(value)
    }

    // create regexp checks methods from 'regexes' object
    for (const regexp in regexes) {
        if (Object.prototype.hasOwnProperty.call(regexes, regexp)) {
            regexpCheck(regexp, regexes)
        }
    }

    // simplify IP checks by calling the regex helpers for IPv4 and IPv6
    is.ip = value => is.ipv4(value) || is.ipv6(value)

    // String checks
    /* -------------------------------------------------------------------------- */

    // is a given string or sentence capitalized?
    is.capitalized = string => {
        if (is.not.string(string)) {
            return false
        }
        const words = string.split(' ')

        for (const word of words) {
            if (word.length) {
                const chr = word.charAt(0)
                if (chr !== chr.toUpperCase()) {
                    return false
                }
            }
        }
        return true
    }

    // is string end with a given target parameter?
    is.endWith = (string, target) => {
        if (is.not.string(string)) {
            return false
        }
        target += ''
        const position = string.length - target.length
        return position >= 0 && string.indexOf(target, position) === position
    }
    // endWith method does not support 'all' and 'any' interfaces
    is.endWith.api = ['not']

    // is a given string include parameter target?
    is.include = (string, target) => string.includes(target)
    // include method does not support 'all' and 'any' interfaces
    is.include.api = ['not']

    // is a given string all lowercase?
    is.lowerCase = string => is.string(string) && string === string.toLowerCase()

    // is a given string palindrome?
    is.palindrome = string => {
        if (is.not.string(string)) {
            return false
        }
        string = string.replace( /[^a-zA-Z0-9]+/g, '' ).toLowerCase()
        // https://itnext.io/11-way-to-check-for-palindromes-in-javascript-85dbfe7dfb5d
        return string.split('').every((c, i) => c === string[string.length - 1 - i])
    }

    // is a given value space?
    // horizontal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    is.space = value => {
        if (is.not.char(value)) {
            return false
        }
        const charCode = value.charCodeAt(0)
        return (charCode > 8 && charCode < 14) || charCode === 32
    }

    // is string start with a given target parameter?
    is.startWith = (string, target) => is.string(string) && string.indexOf(target) === 0
    // startWith method does not support 'all' and 'any' interfaces
    is.startWith.api = ['not']

    // is a given string all uppercase?
    is.upperCase = string => is.string(string) && string === string.toUpperCase()

    // Time checks
    /* -------------------------------------------------------------------------- */

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

    // is a given dates day equal given day parameter?
    is.day = (date, day) => is.date(date) && day.toLowerCase() === days[date.getDay()]
    // day method does not support 'all' and 'any' interfaces
    is.day.api = ['not']

    // is a given date in daylight saving time?
    is.dayLightSavingTime = date => {
        const january = new Date(date.getFullYear(), 0, 1)
        const july = new Date(date.getFullYear(), 6, 1)
        const stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset())
        return date.getTimezoneOffset() < stdTimezoneOffset
    }

    // is a given date future?
    is.future = date => {
        const now = new Date()
        return is.date(date) && date.getTime() > now.getTime()
    }

    // is date within given range?
    is.inDateRange = (date, start, end) => {
        if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {
            return false
        }
        const stamp = date.getTime()
        return stamp > start.getTime() && stamp < end.getTime()
    }
    // inDateRange method does not support 'all' and 'any' interfaces
    is.inDateRange.api = ['not']

    // is a given date in last month range?
    is.inLastMonth = date => is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date())

    // is a given date in last week range?
    is.inLastWeek = date => is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date())

    // is a given date in last year range?
    is.inLastYear = date => is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date())

    // is a given date in next month range?
    is.inNextMonth = date => is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)))

    // is a given date in next week range?
    is.inNextWeek = date => is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)))

    // is a given date in next year range?
    is.inNextYear = date => is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)))

    // is the given year a leap year?
    is.leapYear = year => is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)

    // is a given dates month equal given month parameter?
    is.month = (date, month) => is.date(date) && month.toLowerCase() === months[date.getMonth()]
    // month method does not support 'all' and 'any' interfaces
    is.month.api = ['not']

    // is a given date past?
    is.past = date => {
        const now = new Date()
        return is.date(date) && date.getTime() < now.getTime()
    }

    // is a given date in the parameter quarter?
    is.quarterOfYear = (date, quarter) => is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3)
    // quarterOfYear method does not support 'all' and 'any' interfaces
    is.quarterOfYear.api = ['not']

    // is a given date indicate today?
    is.today = date => {
        const now = new Date()
        const todayString = now.toDateString()
        return is.date(date) && date.toDateString() === todayString
    }

    // is a given date indicate tomorrow?
    is.tomorrow = date => {
        const now = new Date()
        const tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString()
        return is.date(date) && date.toDateString() === tomorrowString
    }

    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    is.weekend = date => is.date(date) && (date.getDay() === 6 || date.getDay() === 0)

    // is a given date weekday?
    is.weekday = not(is.weekend)

    // is a given dates year equal given year parameter?
    is.year = (date, year) => is.date(date) && is.number(year) && year === date.getFullYear()
    // year method does not support 'all' and 'any' interfaces
    is.year.api = ['not']

    // is a given date indicate yesterday?
    is.yesterday = date => {
        const now = new Date()
        const yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString()
        return is.date(date) && date.toDateString() === yesterdayString
    }

    // Environment checks
    /* -------------------------------------------------------------------------- */

    const freeGlobal = is.windowObject(typeof global == 'object' && global) && global
    const freeSelf = is.windowObject(typeof self == 'object' && self) && self
    const thisGlobal = is.windowObject(typeof this == 'object' && this) && this
    const root = freeGlobal || freeSelf || thisGlobal || Function('return this')()

    const document = freeSelf && freeSelf.document
    const previousIs = root.is

    // store navigator properties to use later
    const navigator = freeSelf?.navigator
    const platform = (navigator?.userAgentData?.platform || navigator?.platform || '').toLowerCase()
    const userAgent = (navigator?.userAgent || '').toLowerCase()
    const vendor = (navigator?.vendor || '').toLowerCase()

    // is current device android?
    is.android = () => /android/.test(userAgent)
    // android method does not support 'all' and 'any' interfaces
    is.android.api = ['not']

    // is current device android phone?
    is.androidPhone = () => /android/.test(userAgent) && /mobile/.test(userAgent)
    // androidPhone method does not support 'all' and 'any' interfaces
    is.androidPhone.api = ['not']

    // is current device android tablet?
    is.androidTablet = () => /android/.test(userAgent) && !/mobile/.test(userAgent)
    // androidTablet method does not support 'all' and 'any' interfaces
    is.androidTablet.api = ['not']

    // is current device blackberry?
    is.blackberry = () => /blackberry/.test(userAgent) || /bb10/.test(userAgent)
    // blackberry method does not support 'all' and 'any' interfaces
    is.blackberry.api = ['not']

    // is current browser chrome?
    // parameter is optional
    is.chrome = range => {
        const match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null
        return match !== null && is.not.opera() && compareVersion(match[1], range)
    }
    // chrome method does not support 'all' and 'any' interfaces
    is.chrome.api = ['not']

    // is current device desktop?
    is.desktop = () => is.not.mobile() && is.not.tablet()
    // desktop method does not support 'all' and 'any' interfaces
    is.desktop.api = ['not']

    // is current browser edge?
    // parameter is optional
    is.edge = range => {
        const match = userAgent.match(/edg(e|a|ios)?\/(\d+)/)
        return match !== null && compareVersion(match[1], range)
    }
    // edge method does not support 'all' and 'any' interfaces
    is.edge.api = ['not']

    // is current browser firefox?
    // parameter is optional
    is.firefox = range => {
        const match = userAgent.match(/(?:firefox|fxios)\/(\d+)/)
        return match !== null && compareVersion(match[1], range)
    }
    // firefox method does not support 'all' and 'any' interfaces
    is.firefox.api = ['not']

    // is current browser internet explorer?
    // parameter is optional
    is.ie = range => {
        const match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/)
        return match !== null && compareVersion(match[1], range)
    }
    // ie method does not support 'all' and 'any' interfaces
    is.ie.api = ['not']

    // is current device ios?
    is.ios = () => is.iphone() || is.ipad() || is.ipod()
    // ios method does not support 'all' and 'any' interfaces
    is.ios.api = ['not']

    // is current device ipad?
    // parameter is optional
    is.ipad = range => {
        const match = is.not.iphone() && is.not.ipod() ? ( userAgent.match( /ipad.+?os (\d+)/ ) || ( ( userAgent.includes( "mac" ) && "ontouchend" in document ) ? userAgent.match( /version\/(\d+)/ ) : null ) ) : null
        return match !== null && compareVersion(match[1], range)
    }
    // ipad method does not support 'all' and 'any' interfaces
    is.ipad.api = ['not']

    // is current device iphone?
    // parameter is optional
    is.iphone = range => {
        // avoid false positive for Facebook in-app browser on ipad
        // original iphone doesn't have the OS portion of the UA
        const match = is.ipad() ? null : userAgent.match(/iphone(?:.+?os (\d+))?/)
        return match !== null && compareVersion(match[1] || 1, range)
    }
    // iphone method does not support 'all' and 'any' interfaces
    is.iphone.api = ['not']

    // is current device ipod?
    // parameter is optional
    is.ipod = range => {
        const match = userAgent.match(/ipod.+?os (\d+)/)
        return match !== null && compareVersion(match[1], range)
    }
    // ipod method does not support 'all' and 'any' interfaces
    is.ipod.api = ['not']

    // is current operating system linux?
    is.linux = () => /linux/.test(platform) && is.not.android()
    // linux method does not support 'all' and 'any' interfaces
    is.linux.api = ['not']

    // is current operating system mac?
    is.mac = () => /mac/.test(platform)
    // mac method does not support 'all' and 'any' interfaces
    is.mac.api = ['not']

    // is current device mobile?
    is.mobile = () => is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone()
    // mobile method does not support 'all' and 'any' interfaces
    is.mobile.api = ['not']

    // is current state offline?
    is.offline = not(is.online)
    // offline method does not support 'all' and 'any' interfaces
    is.offline.api = ['not']

    // is current state online?
    is.online = () => !navigator || navigator.onLine === true
    // online method does not support 'all' and 'any' interfaces
    is.online.api = ['not']

    // is current browser opera?
    // parameter is optional
    is.opera = range => {
        const match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/)
        return match !== null && compareVersion(match[1], range)
    }
    // opera method does not support 'all' and 'any' interfaces
    is.opera.api = ['not']

    // is current browser opera mini?
    // parameter is optional
    is.operaMini = range => {
        const match = userAgent.match(/opera mini\/(\d+)/)
        return match !== null && compareVersion(match[1], range)
    }
    // operaMini method does not support 'all' and 'any' interfaces
    is.operaMini.api = ['not']

    // is current browser phantomjs?
    // parameter is optional
    is.phantom = range => {
        const match = userAgent.match(/phantomjs\/(\d+)/)
        return match !== null && compareVersion(match[1], range)
    }
    // phantom method does not support 'all' and 'any' interfaces
    is.phantom.api = ['not']

    // is current browser safari?
    // parameter is optional
    is.safari = range => {
        const match = userAgent.match(/version\/(\d+)((?!chrome).)+?safari/)
        return match !== null && compareVersion(match[1], range)
    }
    // safari method does not support 'all' and 'any' interfaces
    is.safari.api = ['not']

    // is current device tablet?
    is.tablet = () => is.ipad() || is.androidTablet() || is.windowsTablet()
    // tablet method does not support 'all' and 'any' interfaces
    is.tablet.api = ['not']

    // is current device supports touch?
    is.touchDevice = () => !!document && ('ontouchstart' in freeSelf ||
        ('DocumentTouch' in freeSelf && document instanceof DocumentTouch))
    // touchDevice method does not support 'all' and 'any' interfaces
    is.touchDevice.api = ['not']

    // is current operating system windows?
    is.windows = () => /win/.test(platform)
    // windows method does not support 'all' and 'any' interfaces
    is.windows.api = ['not']

    // is current device windows phone?
    is.windowsPhone = () => is.windows() && /phone/.test(userAgent)
    // windowsPhone method does not support 'all' and 'any' interfaces
    is.windowsPhone.api = ['not']

    // is current device windows tablet?
    is.windowsTablet = () => is.windows() && is.not.windowsPhone() && /touch/.test(userAgent)
    // windowsTablet method does not support 'all' and 'any' interfaces
    is.windowsTablet.api = ['not']

    // Object checks
    /* -------------------------------------------------------------------------- */

    // has a given object got parameterized count property?
    is.propertyCount = (object, count) => {
        if (is.not.object(object) || is.not.number(count)) {
            return false
        }
        let n = 0
        for (const property in object) {
            if (hasOwnProperty.call(object, property) && ++n > count) {
                return false
            }
        }
        return n === count
    }
    // propertyCount method does not support 'all' and 'any' interfaces
    is.propertyCount.api = ['not']

    // is given object has parameterized property?
    is.propertyDefined = (object, property) => is.object(object) && is.string(property) && property in object
    // propertyDefined method does not support 'all' and 'any' interfaces
    is.propertyDefined.api = ['not']

    // is a given value thenable (like Promise)?
    is.thenable = value => is.object(value) && typeof value.then === 'function'

    // Array checks
    /* -------------------------------------------------------------------------- */

    // is a given item in an array?
    is.inArray = (value, array) => {
        if (is.not.array(array)) {
            return false
        }
        return array.includes(value)
    }
    // inArray method does not support 'all' and 'any' interfaces
    is.inArray.api = ['not']

    // is a given array sorted?
    is.sorted = (array, sign) => {
        if (is.not.array(array)) {
            return false
        }

        const predicate = comparator[ sign ] || comparator[ '>=' ]

        for ( const [i] of array.entries() ) {
          if (i >= 1 && !predicate(array[i], array[i-1])) {
            return false
          }
        }
        return true
    }


    // API
    // Set 'not', 'all' and 'any' interfaces to methods based on their api property
    /* -------------------------------------------------------------------------- */

    const setInterfaces = () => {
        const options = is
        for (const option in options) {
            if (hasOwnProperty.call(options, option) && is['function'](options[option])) {
                const interfaces = options[option].api || ['not', 'all', 'any']
                for (const item of interfaces) {
                    if (item === 'not') {
                        is.not[option] = not(is[option])
                    }
                    if (item === 'all') {
                        is.all[option] = all(is[option])
                    }
                    if (item === 'any') {
                        is.any[option] = any(is[option])
                    }
                }
            }
        }
    }
    setInterfaces()

    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */

    // change namespace of library to prevent name collisions
    // var preferredName = is.setNamespace()
    // preferredName.odd(3)
    // => true
    is.setNamespace = () => {
        root.is = previousIs
        return this
    }

    // set optional regexes to methods
    is.setRegexp = (regexp, name) => {
        for (const r in regexes) {
            if (hasOwnProperty.call(regexes, r) && (name === r)) {
                regexes[r] = regexp
            }
        }
    }

    return is
})
