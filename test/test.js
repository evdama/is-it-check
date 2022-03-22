(root => {
    // eslint-disable-line no-extra-semi
    const _ = root._ || require('lodash')

    const document = root.document
    const expect = _.get(root, 'chai.expect') || require('chai').expect
    const is = root.is || require('../is-it-check')
    const window = root.window
    const ctx = (typeof window === 'undefined') ? global : window

    const checkApi = (name, list) => {
        list || (list = ['all', 'any', 'not'])
        _.each(['all', 'any', 'not'], api => {
            const exists = _.includes(list, api)
            describe(`is.${api}.${name}`, () => {
                it(`should ${exists ? '' : 'not '}exist`, () => {
                    expect(is[api][name]).to[exists ? 'be': 'not'].exist
                })
            })
        })
    }

    describe('type checks', () => {
        describe('is.arguments', () => {
            it('should return true if passed parameter type is arguments', () => {
                const getArguments = () => {
                    return arguments
                }
                const args = getArguments('test')
                expect(is.arguments(args)).to.be.true
            })
            it('should return false if passed parameter type is not arguments', () => {
                const notArgs = ['test']
                expect(is.arguments(notArgs)).to.be.false
            })
        })
        checkApi('arguments')

        describe('is.array', () => {
            it('should return true if passed parameter type is array', () => {
                const array = ['test']
                expect(is.array(array)).to.be.true
            })
            it('should return false if passed parameter type is not array', () => {
                const notArray = 'test'
                expect(is.array(notArray)).to.be.false
            })
        })
        checkApi('array')

        describe('is.boolean', () => {
            it('should return true if passed parameter type is boolean', () => {
                const bool = true
                expect(is.boolean(bool)).to.be.true
            })
            it('should return false if passed parameter type is not boolean', () => {
                const notBool = 'test'
                expect(is.boolean(notBool)).to.be.false
            })
        })
        checkApi('boolean')

        describe('is.date', () => {
            it('should return true if passed parameter type is date', () => {
                const date = new Date()
                expect(is.date(date)).to.be.true
            })
            it('should return false if passed parameter type is not date', () => {
                const notDate = 'test'
                expect(is.date(notDate)).to.be.false
            })
        })
        checkApi('date')

        describe('is.error', () => {
            it('should return true if passed parameter type is error', () => {
                const error = new Error()
                expect(is.error(error)).to.be.true
            })
            it('should return false if passed parameter type is not error', () => {
                const notError = 'test'
                expect(is.error(notError)).to.be.false
            })
        })
        checkApi('error')

        describe('is.function', () => {
            it('should return true if passed parameter type is function', () => {
                expect(is.function(is.function)).to.be.true
            })
            it('should return false if passed parameter type is not function', () => {
                const notFunction = 'test'
                expect(is.function(notFunction)).to.be.false
            })
        })
        checkApi('function')

        describe('is.nan', () => {
            it('should return true if passed parameter type is NaN', () => {
                expect(is.nan(NaN)).to.be.true
            })
            it('should return false if passed parameter type is not NaN', () => {
                const notNaN = 'test'
                expect(is.nan(notNaN)).to.be.false
            })
        })
        checkApi('nan')

        describe('is.null', () => {
            it('should return true if passed parameter type is null', () => {
                expect(is.null(null)).to.be.true
            })
            it('should return false if passed parameter type is not null', () => {
                const notNull = 'test'
                expect(is.null(notNull)).to.be.false
            })
        })
        checkApi('null')

        describe('is.number', () => {
            it('should return true if passed parameter type is number', () => {
                expect(is.number(1)).to.be.true
            })
            it('should return false if passed parameter type is not number', () => {
                const notNumber = 'test'
                expect(is.number(notNumber)).to.be.false
            })
            it('should return false if passed parameter is NaN', () => {
                expect(is.number(NaN)).to.be.false
            } )
            it('should return false if passed parameter is Infinity', () => {
                expect(is.number(Infinity)).to.be.false
            })
            it('should return false if passed parameter is -Infinity', () => {
                expect(is.number(-Infinity)).to.be.false
            })
        })
        checkApi('number')

        describe('is.object', () => {
            it('should return true if passed parameter type is object', () => {
                expect(is.object({})).to.be.true
            })
            it('should return false if passed parameter type is not object', () => {
                const notObject = 'test'
                expect(is.object(notObject)).to.be.false
            })
        })
        checkApi('object')

        describe('is.json',() => {
            it('should return true if passed parameter type is a json object', () => {
                expect(is.json({})).to.be.true
            })
            it('should return false if passed parameter type is not a json object', () => {
                const notObject = 'test'
                expect(is.json(notObject)).to.be.false
            })
        })
        checkApi('json')

        describe('is.regexp', () => {
            it('should return true if passed parameter type is regexp', () => {
                const regexp = new RegExp()
                expect(is.regexp(regexp)).to.be.true
            })
            it('should return false if passed parameter type is not regexp', () => {
                const notRegexp = 'test'
                expect(is.regexp(notRegexp)).to.be.false
            })
        })
        checkApi('regexp')

        describe('is.map', () => {
            it('should return true if passed parameter type is map', () => {
                // check for Map support first
                if ('Map' in ctx) {
                    const map = new ctx.Map()
                    expect(is.map(map)).to.be.true
                } else {
                    // no Map support - noop
                    expect(true).to.be.true
                }
            })
            it('should return false if passed parameter type is not map', () => {
                const notMap = 'test'
                expect(is.map(notMap)).to.be.false
            })
        })
        checkApi('map')

        describe('is.sameType', () => {
            it('should return true if passed parameter types are same', () => {
                expect(is.sameType(1, 2)).to.be.true
                expect(is.sameType('test', 'test')).to.be.true
            })
            it('should return false if passed parameter types are not same', () => {
                expect(is.sameType(1, 'test')).to.be.false
            })
        })
        checkApi('sameType', ['not'])

        describe('is.char', () => {
            it('should return true if passed parameter type is char', () => {
                expect(is.char('t')).to.be.true
            })
            it('should return false if passed parameter type is not a char', () => {
                expect(is.char('test')).to.be.false
            })
        })
        checkApi('char')

        describe('is.string', () => {
            it('should return true if passed parameter type is string', () => {
                expect(is.string('test')).to.be.true
            })
            it('should return false if passed parameter type is not string', () => {
                expect(is.string(1)).to.be.false
            })
        })
        checkApi('string')

        describe('is.undefined', () => {
            it('should return true if passed parameter type is undefined', () => {
                expect(is.undefined(undefined)).to.be.true
            })
            it('should return false if passed parameter type is not undefined', () => {
                expect(is.undefined(null)).to.be.false
                expect(is.undefined('test')).to.be.false
            })
        })
        checkApi('undefined')
    })

    describe('presence checks', () => {
        describe('is.empty', () => {
            it('should return true if given array is empty', () => {
                expect(is.empty([])).to.be.true
            })
            it('should return false if given object is not empty', () => {
                expect(is.empty({test: 'test'})).to.be.false
            })
        })
        checkApi('empty')

        describe('is.existy', () => {
            it('should return false if given value is null', () => {
                expect(is.existy(null)).to.be.false
            })
            it('should return false if given value is undefined', () => {
                expect(is.existy(undefined)).to.be.false
            })
            it('should return false for Node.js and SSR, true for web browsers', () => {
                expect(is.existy(window)).to.be.false
            })
            it('should return true if given value is not null or undefined', () => {
                expect(is.existy('test')).to.be.true
            })
        })
        checkApi('existy')

        describe('is.truthy', () => {
            it('should return true if given value is truthy', () => {
                expect(is.truthy('test')).to.be.true
            })
            it('should return false if given value is not truthy', () => {
                expect(is.truthy(undefined)).to.be.false
            })
            it('should return false if given value is false', () => {
                expect(is.truthy(false)).to.be.false
            })
        })
        checkApi('truthy')

        describe('is.falsy', () => {
            it('should return false if given value is truthy', () => {
                expect(is.falsy('test')).to.be.false
            })
            it('should return true if given value is falsy', () => {
                expect(is.falsy(undefined)).to.be.true
            })
            it('should return true if given value is false', () => {
                expect(is.falsy(false)).to.be.true
            })
        })
        checkApi('falsy')

        describe('is.space', () => {
            it('should return false if given value is not string', () => {
                expect(is.space(1)).to.be.false
            })
            it('should return true if given value is space', () => {
                expect(is.space(' ')).to.be.true
            })
        })
        checkApi('space')
    })

    describe('arithmetic checks', () => {
        describe('is.equal', () => {
            it('should return true if given two numbers are equal', () => {
                expect(is.equal(3, 1 + 2)).to.be.true
            })
            it('should return false if given two numbers are not equal', () => {
                expect(is.equal(3, 2)).to.be.false
            })
            it('should return true if given two strings are same', () => {
                expect(is.equal('test', 'test')).to.be.true
            })
            it('should return false if given two strings are not same', () => {
                expect(is.equal('test', 'test2')).to.be.false
            })
            it('should return true if given two boolean are same', () => {
                expect(is.equal(false, false)).to.be.true
            })
            it('should return false if given two boolean are not same', () => {
                expect(is.equal(false, true)).to.be.false
            })
            it('should return false if given two arrays are empty', () => {
              expect(is.not.equal([],[])).to.be.false
            })
            it('should return true if given two arrays have the same booleans', () => {
              expect(is.equal([true, false],[false, true])).to.be.true
            })
            it('should return false if given two arrays have different length', () => {
              expect(is.equal([1,5],[1,5,33])).to.be.false
            })
            it('should return true if given two arrays have the same numbers', () => {
              expect(is.equal([1,5,33],[1,5,33])).to.be.true
            })
            it('should return true if given two arrays have the same numbers but different order', () => {
              expect(is.equal([1,33,5],[1,5,33])).to.be.true
            })
            it('should return true if given arrays have the same strings', () => {
              expect(is.equal(['foo', 'bar', 'baz'], ['baz', 'bar', 'foo'])).to.be.true
            })
            it('should return true if given objects are the same', () => {
              expect(is.equal({'a': 1, 'b': 'nose'}, {'a': 1, 'b': 'nose'})).to.be.true
            })
            it('should return true if given objects are not the same', () => {
              expect(is.not.equal({'a': 'nose', 'b': 1}, {'b': 1, 'a': 'nose'})).to.be.true
            })
            it('should return true if given objects are the same', () => {
              expect(is.equal({'a': 'nose', 'b': {'c': 3, 'd': true}}, {'a': 'nose', 'b': {'c': 3, 'd': true}})).to.be.true
            })
            it('should return true if given objects are not the same', () => {
              expect(is.equal({'a': 2, 'b': 'mouth'}, {'a': 2, 'b': 'nose'})).to.be.false
            })
        })
        checkApi('equal', ['not'])

        describe('is.even', () => {
            it('should return true if given number is even', () => {
                expect(is.even(2)).to.be.true
            })
            it('should return false if given number is not even', () => {
                expect(is.even(3)).to.be.false
            })
            it('should return false if given number is not integer', () => {
                expect(is.even(2.5)).to.be.false
            })
        })
        checkApi('even')

        describe('is.odd', () => {
            it('should return true if given number is odd', () => {
                expect(is.odd(3)).to.be.true
            })
            it('should return true if given number is negative odd', () => {
                expect(is.odd(-3)).to.be.true
            })
            it('should return false if given number is not odd', () => {
                expect(is.odd(2)).to.be.false
            })
            it('should return false if given number is not integer', () => {
                expect(is.odd(2.5)).to.be.false
            })
        })
        checkApi('odd')

        describe('is.positive', () => {
            it('should return true if given number is positive', () => {
                expect(is.positive(3)).to.be.true
            })
            it('should return false if given number is not positive', () => {
                expect(is.positive(-2)).to.be.false
            })
        })
        checkApi('positive')

        describe('is.negative', () => {
            it('should return true if given number is negative', () => {
                expect(is.negative(-3)).to.be.true
            })
            it('should return false if given number is not negative', () => {
                expect(is.negative(2)).to.be.false
            })
        })
        checkApi('negative')

        describe('is.above', () => {
            it('should return true if given number is above minimum value', () => {
                expect(is.above(13, 12)).to.be.true
            })
            it('should return false if given number is not above minimum value', () => {
                expect(is.above(12, 13)).to.be.false
            })
        })
        checkApi('above', ['not'])

        describe('is.under', () => {
            it('should return true if given number is under maximum value', () => {
                expect(is.under(11, 12)).to.be.true
            })
            it('should return false if given number is not under maximum value', () => {
                expect(is.under(12, 11)).to.be.false
            })
        })
        checkApi('under', ['not'])

        describe('is.within', () => {
            it('should return true if given number is within minimum and maximum values', () => {
                expect(is.within(10, 5, 15)).to.be.true
            })
            it('should return false if given number is not within minimum and maximum values', () => {
                expect(is.within(20, 5, 15)).to.be.false
            })
        })
        checkApi('within', ['not'])

        describe('is.decimal', () => {
            it('should return true if given number is decimal', () => {
                expect(is.decimal(4.2)).to.be.true
            })
            it('should return false if given number is not decimal', () => {
                expect(is.decimal(2)).to.be.false
            })
        })
        checkApi('decimal')

        describe('is.integer', () => {
            it('should return true if given number is integer', () => {
                expect(is.integer(4)).to.be.true
            })
            it('should return false if given number is not integer', () => {
                expect(is.integer(2.2)).to.be.false
            })
        })
        checkApi('integer')

        describe('is.finite', () => {
            it('should return true if given number is finite', () => {
                expect(is.finite(4)).to.be.true
            })
            it('should return false if given number is not finite', () => {
                expect(is.finite(Infinity)).to.be.false
            })
        })
        checkApi('finite')

        describe('is.infinite', () => {
            it('should return true if given number is infinite', () => {
                expect(is.infinite(Infinity)).to.be.true
            })
            it('should return false if given number is not infinite', () => {
                expect(is.infinite(1)).to.be.false
                expect(is.infinite(NaN)).to.be.false
            })
        })
        checkApi('infinite')
    })

    describe('regexp checks', () => {
        describe('is.url', () => {
            it('should return true if given value is url', () => {
                expect(is.url('http://www.test.com')).to.be.true
            })
            it('should return true if given value is url', () => {
                expect(is.url('https://github.com/evdama/is-it-check/commit/74b01444421525d636dabb47d4e72b23fd58a152')).to.be.true
            })
            it('should return false if given value is not url', () => {
                expect(is.url(1)).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.url(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.url(undefined)).to.be.false
            })
        })
        checkApi('url')

        describe('is.email', () => {
            it('should return true if given value is email', () => {
                expect(is.email('test@test.com')).to.be.true
            })
            it('should return false if given value is not email', () => {
                expect(is.email('test@test')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.email(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.email(undefined)).to.be.false
            })
        })
        checkApi('email')

        describe('is.creditCard', () => {
            it('should return true if given value is credit card', () => {
                expect(is.creditCard(378282246310005)).to.be.true
            })
            it('should return false if given value is not credit card', () => {
                expect(is.creditCard(123)).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.creditCard(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.creditCard(undefined)).to.be.false
            })
        })
        checkApi('creditCard')

        describe('is.alphaNumeric', () => {
            it('should return true if given value is alpha numeric', () => {
                expect(is.alphaNumeric(123)).to.be.true
            })
            it('should return false if given value is not alpha numeric', () => {
                expect(is.alphaNumeric('*?')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.alphaNumeric(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.alphaNumeric(undefined)).to.be.false
            })
        })
        checkApi('alphaNumeric')

        describe('is.timeString', () => {
            it('should return true if given value is time string', () => {
                expect(is.timeString('13:45:30')).to.be.true
            })
            it('should return false if given value is not time string', () => {
                expect(is.timeString('12:12:90')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.timeString(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.timeString(undefined)).to.be.false
            })
        })
        checkApi('timeString')

        describe('is.dateString', () => {
            it('should return true if given value is date string', () => {
                expect(is.dateString('11/11/2011')).to.be.true
                expect(is.dateString('10-21-2012')).to.be.true
            })
            it('should return false if given value is not date string', () => {
                expect(is.dateString('1')).to.be.false
                expect(is.dateString('10/21-2012')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.dateString(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.dateString(undefined)).to.be.false
            })
        })
        checkApi('dateString')

        describe('is.usZipCode', () => {
            it('should return true if given value is US zip code', () => {
                expect(is.usZipCode('02201-1020')).to.be.true
            })
            it('should return false if given value is not US zip code', () => {
                expect(is.usZipCode('1')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.usZipCode(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.usZipCode(undefined)).to.be.false
            })
        })
        checkApi('usZipCode')

        describe('is.caPostalCode', () => {
            it('should return true if given value is Canada postal code', () => {
                expect(is.caPostalCode('L8V3Y1')).to.be.true
            })
            it('should return true if given value is Canada postal code with space', () => {
                expect(is.caPostalCode('L8V 3Y1')).to.be.true
            })
            it('should return false if given value is not Canada postal code', () => {
                expect(is.caPostalCode('1')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.caPostalCode(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.caPostalCode(undefined)).to.be.false
            })
        })
        checkApi('caPostalCode')

        describe('is.ukPostCode', () => {
            it('should return true if given value is UK post code', () => {
                expect(is.ukPostCode('B184BJ')).to.be.true
            })
            it('should return false if given value is not UK post code', () => {
                expect(is.ukPostCode('1')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.ukPostCode(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.ukPostCode(undefined)).to.be.false
            })
        })
        checkApi('ukPostCode')

        describe('is.nanpPhone', () => {
            it('should return true if given value is nanpPhone', () => {
                expect(is.nanpPhone('609-555-0175')).to.be.true
            })
            it('should return false if given value is not nanpPhone', () => {
                expect(is.nanpPhone('1')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.nanpPhone(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.nanpPhone(undefined)).to.be.false
            })
        })
        checkApi('nanpPhone')

        describe('is.eppPhone', () => {
            it('should return true if given value is eppPhone', () => {
                expect(is.eppPhone('+90.2322456789')).to.be.true
            })
            it('should return false if given value is not eppPhone', () => {
                expect(is.eppPhone('1')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.eppPhone(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.eppPhone(undefined)).to.be.false
            })
        })
        checkApi('eppPhone')

        describe('is.socialSecurityNumber', () => {
            it('should return true if given value is socialSecurityNumber', () => {
                expect(is.socialSecurityNumber('017-90-7890')).to.be.true
                expect(is.socialSecurityNumber('017907890')).to.be.true
            })
            it('should return false if given value is not socialSecurityNumber', () => {
                expect(is.socialSecurityNumber('1')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.socialSecurityNumber(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.socialSecurityNumber(undefined)).to.be.false
            })
        })
        checkApi('socialSecurityNumber')

        describe('is.affirmative', () => {
            it('should return true if given value is affirmative', () => {
                expect(is.affirmative('yes')).to.be.true
            })
            it('should return false if given value is not affirmative', () => {
                expect(is.affirmative('no')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.affirmative(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.affirmative(undefined)).to.be.false
            })
        })
        checkApi('affirmative')

        describe('is.hexadecimal', () => {
            it('should return true if given value is hexadecimal', () => {
                expect(is.hexadecimal('ff')).to.be.true
                expect(is.hexadecimal('0xff')).to.be.true
            })
            it('should return false if given value is not hexadecimal', () => {
                expect(is.hexadecimal(0.287)).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.hexadecimal(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.hexadecimal(undefined)).to.be.false
            })
        })
        checkApi('hexadecimal')

        describe('is.hexColor', () => {
            it('should return true if given value is hexColor', () => {
                expect(is.hexColor('#333')).to.be.true
            })
            it('should return false if given value is not hexColor', () => {
                expect(is.hexColor(0.287)).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.hexColor(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.hexColor(undefined)).to.be.false
            })
        })
        checkApi('hexColor')

        describe('is.ip', () => {
            it('should return true if given value is a valid IP address', () => {
                expect(is.ip('2001:DB8:0:0:1::1')).to.be.true
            })
            it('should return false if given value is not a valid IP address', () => {
                expect(is.ip('985.12.3.4')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.ip(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.ip(undefined)).to.be.false
            })
        })
        checkApi('ip')

        describe('is.ipv4', () => {
            it('should return true if given value is a valid IPv4 address', () => {
                expect(is.ipv4('198.12.3.142')).to.be.true
            })
            it('should return false if given value is not a valid IPv4 address', () => {
                expect(is.ipv4('985.12.3.4')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.ipv4(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.ipv4(undefined)).to.be.false
            })
        })
        checkApi('ipv4')

        describe('is.ipv6', () => {
            it('should return true if given value is a valid IPv6 address', () => {
                expect(is.ipv6('2001:DB8:0:0:1::1')).to.be.true
            })
            it('should return false if given value is not a valid IPv6 address', () => {
                expect(is.ipv6('985.12.3.4')).to.be.false
            })
            it('should return false if the given value is null', () => {
                expect(is.ipv6(null)).to.be.false
            })
            it('should return false if the given value is undefined', () => {
                expect(is.ipv6(undefined)).to.be.false
            })
        })
        checkApi('ipv6')

        describe("is.macAddress", () => {
            it("should return true if given value is a MAC address", () => {
                expect(is.macAddress('01:23:45:67:89:ab')).to.be.true
            })
            it("should return false if given value is not a MAC address", () => {
                expect(is.macAddress('0123456789ab')).to.be.false
            })
        })
        checkApi('macAddress')
    })



    describe('string checks', () => {
        describe('is.include', () => {
            it('should return true if given string contains substring', () => {
                expect(is.include('test.com', 't.com')).to.be.true
            })
            it('should return false if given string does not contain substring', () => {
                expect(is.include('test.com', 'nope')).to.be.false
            })
        })
        checkApi('include', ['not'])

        describe('is.upperCase', () => {
            it('should return true if given string is uppercase', () => {
                expect(is.upperCase('TEST')).to.be.true
            })
            it('should return false if given string is not uppercase', () => {
                expect(is.upperCase('test')).to.be.false
            })
        })
        checkApi('upperCase')

        describe('is.lowerCase', () => {
            it('should return true if given string is lowerCase', () => {
                expect(is.lowerCase('test')).to.be.true
            })
            it('should return false if given string is not lowerCase', () => {
                expect(is.lowerCase('TEST')).to.be.false
            })
        })
        checkApi('lowerCase')

        describe('is.startWith', () => {
            it('should return true if given string starts with substring', () => {
                expect(is.startWith('test', 'te')).to.be.true
            })
            it('should return false if given string does not start with substring', () => {
                expect(is.startWith('test', 'st')).to.be.false
            })
        })
        checkApi('startWith', ['not'])

        describe('is.endWith', () => {
            it('should return true if given string ends with substring', () => {
                expect(is.endWith('test', 't')).to.be.true
                expect(is.endWith('test', 'st')).to.be.true
            })
            it('should return false if given string does not end with substring', () => {
                expect(is.endWith('test', 'te')).to.be.false
            })
            it('should prevent true return if endWith is not present in the string', () => {
                expect(is.endWith('id', '_id')).to.be.false
            })
        })
        checkApi('endWith', ['not'])

        describe('is.capitalized', () => {
            it('should return true if given string is capitalized', () => {
                expect(is.capitalized('Test')).to.be.true
            })
            it('should return false if given string is not capitalized', () => {
                expect(is.capitalized('test')).to.be.false
            })
            it('should return true if words are capitalized', () => {
                expect(is.capitalized('Test Is Good')).to.be.true
                expect(is.capitalized('Test   Is   Good')).to.be.true
            })
            it('should return false if words are not capitalized', () => {
                expect(is.capitalized('Test is good')).to.be.false
            })
        })
        checkApi('capitalized')

        describe('is.palindrome', () => {
            it('should return true if given string is palindrome', () => {
                expect(is.palindrome('abba')).to.be.true
                expect(is.palindrome('testset')).to.be.true
                expect(is.palindrome('A man, a plan, a canal - Panama!')).to.be.true
            })
            it('should return false if given string is not palindrome', () => {
                expect(is.palindrome('test')).to.be.false
            })
        })
        checkApi('palindrome')
    })

    describe('time checks', () => {
        describe('is.today', () => {
            it('should return true if given date is today', () => {
                const date = new Date()
                expect(is.today(date)).to.be.true
            })
            it('should return false if given date is not today', () => {
                const date = new Date()
                expect(is.today(date.setDate(date.getDate() - 1))).to.be.false
            })
        })
        checkApi('today')

        describe('is.yesterday', () => {
            it('should return true if given date is yesterday', () => {
                const date = new Date()
                const yesterday = new Date(date.setDate(date.getDate() - 1))
                expect(is.yesterday(yesterday)).to.be.true
            })
            it('should return false if given date is not yesterday', () => {
                const date = new Date()
                expect(is.yesterday(date)).to.be.false
            })
        })
        checkApi('yesterday')

        describe('is.tomorrow', () => {
            it('should return true if given date is tomorrow', () => {
                const date = new Date()
                const tomorrow = new Date(date.setDate(date.getDate() + 1))
                expect(is.tomorrow(tomorrow)).to.be.true
            })
            it('should return false if given date is not tomorrow', () => {
                const date = new Date()
                expect(is.tomorrow(date)).to.be.false
            })
        })
        checkApi('tomorrow')

        describe('is.past', () => {
            it('should return true if given date is past', () => {
                const date = new Date()
                const past = new Date(date.setDate(date.getDate() - 1))
                expect(is.past(past)).to.be.true
            })
            it('should return false if given date is not past', () => {
                const date = new Date()
                expect(is.past(date)).to.be.false
            })
        })
        checkApi('past')

        describe('is.future', () => {
            it('should return true if given date is future', () => {
                const date = new Date()
                const future = new Date(date.setDate(date.getDate() + 1))
                expect(is.future(future)).to.be.true
            })
            it('should return false if given date is not future', () => {
                const date = new Date()
                const past = new Date(date.setDate(date.getDate() - 1))
                expect(is.future(date)).to.be.false
                expect(is.future(past)).to.be.false
            })
        })
        checkApi('future')

        describe('is.day', () => {
            it('should return true if given day string is the day of the date object', () => {
                const time = 1421572235303
                expect(is.day(new Date(time), 'sunday')).to.be.true
            })
            it('should return false if given day string is not the day of the date object', () => {
                const time = 1421572235303
                expect(is.day(new Date(time), 'monday')).to.be.false
            })
        })
        checkApi('day', ['not'])

        describe('is.month', () => {
            it('should return true if given month string is the month of the date object', () => {
                const time = 1421572235303
                expect(is.month(new Date(time), 'january')).to.be.true
            })
            it('should return false if given month string is not the month of the date object', () => {
                const time = 1421572235303
                expect(is.month(new Date(time), 'february')).to.be.false
            })
        })
        checkApi('month', ['not'])

        describe('is.year', () => {
            it('should return true if given year string is the year of the date object', () => {
                const time = 1421572235303
                expect(is.year(new Date(time), 2015)).to.be.true
            })
            it('should return false if given year string is not the year of the date object', () => {
                const time = 1421572235303
                expect(is.year(new Date(time), 2016)).to.be.false
            })
        })
        checkApi('year', ['not'])

        describe('is.leapYear', () => {
            it('should return true if given year is a leap year', () => {
                expect(is.leapYear(2016)).to.be.true
            })
            it('should return false if given year is not a leap year', () => {
                expect(is.leapYear(2015)).to.be.false
            })
        })
        checkApi('leapYear')

        describe('is.weekend', () => {
            it('should return true if given date is weekend', () => {
                const time = 1421572235303
                expect(is.weekend(new Date(time))).to.be.true
            })
            it('should return false if given date is not weekend', () => {
                const time = 1421572235303
                const date = new Date(time)
                const friday = new Date(date.setDate(date.getDate() - 2))
                expect(is.weekend(friday)).to.be.false
            })
        })
        checkApi('weekend')

        describe('is.weekday', () => {
            it('should return true if given date is weekday', () => {
                const time = 1421572235303
                const date = new Date(time)
                const friday = new Date(date.setDate(date.getDate() - 2))
                expect(is.weekday(friday)).to.be.true
            })
            it('should return false if given date is not weekday', () => {
                const time = 1421572235303
                const sunday = new Date(time)
                expect(is.weekday(sunday)).to.be.false
            })
        })
        checkApi('weekday')

        describe('is.inDateRange', () => {
            it('should return true if date is within given start date and end date', () => {
                const today = new Date()
                const date = new Date()
                const tomorrow = new Date(date.setDate(date.getDate() + 1))
                const yesterday = new Date(date.setDate(date.getDate() - 2))
                expect(is.inDateRange(today, yesterday, tomorrow)).to.be.true
            })
            it('should return false if date is not within given start date and end date', () => {
                const today = new Date()
                const date = new Date()
                const tomorrow = new Date(date.setDate(date.getDate() + 1))
                const yesterday = new Date(date.setDate(date.getDate() - 2))
                expect(is.inDateRange(yesterday, today, tomorrow)).to.be.false
            })
        })
        checkApi('inDateRange', ['not'])

        describe('is.inLastWeek', () => {
            it('should return true if date is within last week', () => {
                const date = new Date()
                const twoDaysAgo = new Date(date.setDate(date.getDate() - 2))
                expect(is.inLastWeek(twoDaysAgo)).to.be.true
            })
            it('should return false if date is not within last week', () => {
                const date = new Date()
                const eightDaysAgo = new Date(date.setDate(date.getDate() - 8))
                expect(is.inLastWeek(eightDaysAgo)).to.be.false
            })
        })
        checkApi('inLastWeek')

        describe('is.inLastMonth', () => {
            it('should return true if date is within last month', () => {
                const date = new Date()
                const tenDaysAgo = new Date(date.setDate(date.getDate() - 10))
                expect(is.inLastMonth(tenDaysAgo)).to.be.true
            })
            it('should return false if date is not within last month', () => {
                const date = new Date()
                const fiftyDaysAgo = new Date(date.setDate(date.getDate() - 50))
                expect(is.inLastMonth(fiftyDaysAgo)).to.be.false
            })
        })
        checkApi('inLastMonth')

        describe('is.inLastYear', () => {
            it('should return true if date is within last year', () => {
                const date = new Date()
                const threeMonthsAgo = new Date(date.setMonth(date.getMonth() - 3))
                expect(is.inLastYear(threeMonthsAgo)).to.be.true
            })
            it('should return false if date is not within last year', () => {
                const date = new Date()
                const future = new Date(date.setDate(date.getDate() + 1))
                expect(is.inLastYear(future)).to.be.false
            })
        })
        checkApi('inLastYear')

        describe('is.inNextWeek', () => {
            it('should return true if date is within next week', () => {
                const date = new Date()
                const future = new Date(date.setDate(date.getDate() + 1))
                expect(is.inNextWeek(future)).to.be.true
            })
            it('should return false if date is not within next week', () => {
                const date = new Date()
                const yesterday = new Date(date.setDate(date.getDate() - 1))
                expect(is.inNextWeek(yesterday)).to.be.false
            })
        })
        checkApi('inNextWeek')

        describe('is.inNextMonth', () => {
            it('should return true if date is within next month', () => {
                const date = new Date()
                const aWeekLater = new Date(date.setDate(date.getDate() + 7))
                expect(is.inNextMonth(aWeekLater)).to.be.true
            })
            it('should return false if date is not within next month', () => {
                const date = new Date()
                const yesterday = new Date(date.setDate(date.getDate() - 1))
                expect(is.inNextMonth(yesterday)).to.be.false
            })
        })
        checkApi('inNextMonth')

        describe('is.inNextYear', () => {
            it('should return true if date is within next year', () => {
                const date = new Date()
                const threeMonthsLater = new Date(date.setMonth(date.getMonth() + 3))
                expect(is.inNextYear(threeMonthsLater)).to.be.true
            })
            it('should return false if date is not within next year', () => {
                const date = new Date()
                const past = new Date(date.setDate(date.getDate() - 1))
                expect(is.inNextYear(past)).to.be.false
            })
        })
        checkApi('inNextYear')

        describe('is.quarterOfYear', () => {
            it('should return true if given quarter is the quarter of the date object', () => {
                const time = 1421572235303
                const date = new Date(time)
                expect(is.quarterOfYear(date, 1)).to.be.true
            })
            it('should return false if given quarter is not the quarter of the date object', () => {
                const time = 1421572235303
                const date = new Date(time)
                expect(is.quarterOfYear(date, 2)).to.be.false
            })
        })
        checkApi('quarterOfYear', ['not'])

        describe('is.dayLightSavingTime', () => {
            it('should return false if given date is not in daylight saving time', () => {
                const time = 1421572235303
                const date = new Date(time)
                expect(is.dayLightSavingTime(date)).to.be.false
            })
            it('should return false if given date is in daylight saving time', () => {
                const time = 1421572235303
                const date = new Date(time)
                const sixMonthsAgo = new Date(date.setMonth(date.getMonth() - 6))
                expect(is.dayLightSavingTime(sixMonthsAgo)).to.be.true
            })
        })
        checkApi('dayLightSavingTime')
    })

    describe('object checks', () => {
        describe('is.propertyCount', () => {
            it('should return true if given count matches that of the object', () => {
                const obj = {
                    test: 'test',
                    is: 'is',
                    good: 'good'
                }
                expect(is.propertyCount(obj, 3)).to.be.true
            })
            it('should return false if given count does not match that of the object', () => {
                const obj = {
                    test: 'test',
                    is: 'is'
                }
                expect(is.propertyCount(obj, 3)).to.be.false
            })
        })
        checkApi('propertyCount', ['not'])

        describe('is.propertyDefined', () => {
            it('should return true if given property is in objects', () => {
                const obj = {
                    test: 'test',
                    is: 'is',
                    good: 'good'
                }
                expect(is.propertyDefined(obj, 'good')).to.be.true
            })
            it('should return false if given property is not in objects', () => {
                const obj = {
                    test: 'test',
                    is: 'is'
                }
                expect(is.propertyDefined(obj, 'good')).to.be.false
            })
        })
        checkApi('propertyDefined', ['not'])

        describe('is.windowObject', () => {
            it('should return true if given object is window object', () => {
                expect(is.windowObject(window)).to.be[!!window]
            })
            it('should return false if given object is not window object', () => {
                expect(is.windowObject({})).to.be.false
            })
        })
        checkApi('windowObject')

        describe('is.domNode', () => {
            it('should return true if given object is a DOM node', () => {
                const obj = document && document.createElement('div')
                expect(is.domNode(obj)).to.be[!!document]
            })
            it('should return false if given object is not a DOM node', () => {
                expect(is.domNode({})).to.be.false
            })
        })
        checkApi('domNode')

        describe('is.thenable', () => {
            it('should return true if passed parameter type is Promise', () => {
                const promise = Promise.resolve(true) // eslint-disable-line no-undef
                expect(is.thenable(promise)).to.be.true
            })
            it('should return false if passed parameter type is not Promise', () => {
                const notPromise = 'test'
                expect(is.thenable(notPromise)).to.be.false
            })
        })
        checkApi('thenable')
    })

    describe('array checks', () => {
        describe('is.sorted', () => {
            it('should return true if given array is sorted', () => {
                const array1 = [1, 2, 3, 4, 5]
                expect(is.sorted(array1)).to.be.true
                expect(is.sorted(array1, '>=')).to.be.true
                expect(is.sorted(array1, '>')).to.be.true
                expect(is.sorted(array1, '<=')).to.be.false
                expect(is.sorted(array1, '<')).to.be.false

                const array2 = [5, 4, 4, 3, 1]
                expect(is.sorted(array2)).to.be.false
                expect(is.sorted(array2, '>=')).to.be.false
                expect(is.sorted(array2, '>')).to.be.false
                expect(is.sorted(array2, '<=')).to.be.true
                expect(is.sorted(array2, '<')).to.be.false

                const array3 = [10]
                expect(is.sorted(array3)).to.be.true
                expect(is.sorted(array3, '>=')).to.be.true
                expect(is.sorted(array3, '>')).to.be.true
                expect(is.sorted(array3, '<=')).to.be.true
                expect(is.sorted(array3, '<')).to.be.true
            })
            it('should return false if given array is not sorted', () => {
                const array = [1, 2, 3, 5, 4]
                expect(is.sorted(array)).to.be.false
                expect(is.sorted(array, '>=')).to.be.false
                expect(is.sorted(array, '>')).to.be.false
                expect(is.sorted(array, '<=')).to.be.false
                expect(is.sorted(array, '<')).to.be.false
            })
        })
        checkApi('sorted')

        describe('is.inArray', () => {
            it('should return true if the item is in the array', () => {
                const value = 3
                const array = [1, 4, 6, 7, 3]
                expect(is.inArray(value, array)).to.be.true
            })
            it('should return false if the item is not in the array', () => {
                const value = 2
                const array = [1, 4, 6, 7, 3]
                expect(is.inArray(value, array)).to.be.false
            })
        })
        checkApi('inArray', ['not'])
    })
})(this)
