export declare let VERSION: string;
export declare let not: {};
export declare let all: {};
export declare let any: {};
export declare function arguments(value: any): boolean;
export declare function array(value: any): boolean;
export declare function boolean(value: any): boolean;
export declare function char(value: any): boolean;
export declare function date(value: any): boolean;
export declare function domNode(object: any): boolean;
export declare function error(value: any): boolean;
declare function _function(value: any): boolean;
export declare function json(value: any): boolean;
export declare function nan(value: any): any;
declare function _null(value: any): boolean;
export declare function number(value: any): any;
export declare function object(value: any): boolean;
export declare function regexp(value: any): boolean;
export declare function sameType(value: any, other: any): any;
export declare namespace sameType {
    let api: string[];
}
export declare function string(value: any): boolean;
export declare function undefined(value: any): boolean;
export declare function windowObject(value: any): boolean;
export declare function stream(stream: any): boolean;
export declare function duplexStream(stream: any): boolean;
export declare function readableStream(stream: any): boolean;
export declare function transformStream(stream: any): boolean;
export declare function writeableStream(stream: any): boolean;
export declare function empty(value: any): boolean;
export declare function map(value: any): boolean;
export declare function existy(value: any): boolean;
export declare function falsy(value: any): boolean;
export declare function truthy(...args: any[]): boolean;
export declare function above(n: any, min: any): boolean;
export declare namespace above {
    let api_1: string[];
    export { api_1 as api };
}
export declare function decimal(n: any): boolean;
export declare function equal(value: any, other: any): any;
export declare namespace equal {
    let api_2: string[];
    export { api_2 as api };
}
export declare function even(n: any): boolean;
export declare function finite(n: number): any;
export declare function infinite(n: any): boolean;
export declare function integer(n: any): any;
export declare function negative(n: any): boolean;
export declare function odd(n: any): boolean;
export declare function positive(n: any): boolean;
export declare function under(n: any, max: any): boolean;
export declare namespace under {
    let api_3: string[];
    export { api_3 as api };
}
export declare function within(n: any, min: any, max: any): boolean;
export declare namespace within {
    let api_4: string[];
    export { api_4 as api };
}
export declare function ip(value: any): any;
export declare function capitalized(string: any): boolean;
export declare function endWith(string: any, target: any): boolean;
export declare namespace endWith {
    let api_5: string[];
    export { api_5 as api };
}
export declare function include(string: any, target: any): any;
export declare namespace include {
    let api_6: string[];
    export { api_6 as api };
}
export declare function umlaut(string: any): boolean;
export declare function lowerCase(string: any): boolean;
export declare function palindrome(string: any): any;
export declare function space(value: any): boolean;
export declare function startWith(string: any, target: any): boolean;
export declare namespace startWith {
    let api_7: string[];
    export { api_7 as api };
}
export declare function upperCase(string: any): boolean;
export declare function day(date: any, day: any): boolean;
export declare namespace day {
    let api_8: string[];
    export { api_8 as api };
}
export declare function dayLightSavingTime(date: any): boolean;
export declare function future(date: any): boolean;
export declare function inDateRange(date: any, start: any, end: any): boolean;
export declare namespace inDateRange {
    let api_9: string[];
    export { api_9 as api };
}
export declare function inLastMonth(date: any): boolean;
export declare function inLastWeek(date: any): boolean;
export declare function inLastYear(date: any): boolean;
export declare function inNextMonth(date: any): boolean;
export declare function inNextWeek(date: any): boolean;
export declare function inNextYear(date: any): boolean;
export declare function leapYear(year: any): boolean;
export declare function month(date: any, month: any): boolean;
export declare namespace month {
    let api_10: string[];
    export { api_10 as api };
}
export declare function past(date: any): boolean;
export declare function quarterOfYear(date: any, quarter: any): boolean;
export declare namespace quarterOfYear {
    let api_11: string[];
    export { api_11 as api };
}
export declare function today(date: any): boolean;
export declare function tomorrow(date: any): boolean;
export declare function weekend(date: any): boolean;
export declare function weekday(...args: any[]): boolean;
export declare function year(date: any, year: any): boolean;
export declare namespace year {
    let api_12: string[];
    export { api_12 as api };
}
export declare function yesterday(date: any): boolean;
export declare function browser(): boolean;
export declare namespace browser {
    let api_13: string[];
    export { api_13 as api };
}
export declare function nodejs(): boolean;
export declare namespace nodejs {
    let api_14: string[];
    export { api_14 as api };
}
export declare function deno(): boolean;
export declare namespace deno {
    let api_15: string[];
    export { api_15 as api };
}
export declare function webworker(): boolean;
export declare namespace webworker {
    let api_16: string[];
    export { api_16 as api };
}
export declare function android(): boolean;
export declare namespace android {
    let api_17: string[];
    export { api_17 as api };
}
export declare function androidPhone(): boolean;
export declare namespace androidPhone {
    let api_18: string[];
    export { api_18 as api };
}
export declare function androidTablet(): boolean;
export declare namespace androidTablet {
    let api_19: string[];
    export { api_19 as api };
}
export declare function blackberry(): boolean;
export declare namespace blackberry {
    let api_20: string[];
    export { api_20 as api };
}
export declare function chrome(range: any): any;
export declare namespace chrome {
    let api_21: string[];
    export { api_21 as api };
}
export declare function desktop(): any;
export declare namespace desktop {
    let api_22: string[];
    export { api_22 as api };
}
export declare function edge(range: any): any;
export declare namespace edge {
    let api_23: string[];
    export { api_23 as api };
}
export declare function firefox(range: any): any;
export declare namespace firefox {
    let api_24: string[];
    export { api_24 as api };
}
export declare function ie(range: any): any;
export declare namespace ie {
    let api_25: string[];
    export { api_25 as api };
}
export declare function ios(): any;
export declare namespace ios {
    let api_26: string[];
    export { api_26 as api };
}
export declare function ipad(range: any): any;
export declare namespace ipad {
    let api_27: string[];
    export { api_27 as api };
}
export declare function iphone(range: any): any;
export declare namespace iphone {
    let api_28: string[];
    export { api_28 as api };
}
export declare function ipod(range: any): any;
export declare namespace ipod {
    let api_29: string[];
    export { api_29 as api };
}
export declare function linux(): any;
export declare namespace linux {
    let api_30: string[];
    export { api_30 as api };
}
export declare function mac(): boolean;
export declare namespace mac {
    let api_31: string[];
    export { api_31 as api };
}
export declare function mobile(): any;
export declare namespace mobile {
    let api_32: string[];
    export { api_32 as api };
}
export declare function offline(...args: any[]): boolean;
export declare function online(): boolean;
export declare namespace online {
    let api_33: string[];
    export { api_33 as api };
}
export declare function opera(range: any): any;
export declare namespace opera {
    let api_34: string[];
    export { api_34 as api };
}
export declare function operaMini(range: any): any;
export declare namespace operaMini {
    let api_35: string[];
    export { api_35 as api };
}
export declare function phantom(range: any): any;
export declare namespace phantom {
    let api_36: string[];
    export { api_36 as api };
}
export declare function safari(range: any): any;
export declare namespace safari {
    let api_37: string[];
    export { api_37 as api };
}
export declare function tablet(): any;
export declare namespace tablet {
    let api_38: string[];
    export { api_38 as api };
}
export declare function touchDevice(): boolean;
export declare namespace touchDevice {
    let api_39: string[];
    export { api_39 as api };
}
export declare function windows(): boolean;
export declare namespace windows {
    let api_40: string[];
    export { api_40 as api };
}
export declare function windowsPhone(): boolean;
export declare namespace windowsPhone {
    let api_41: string[];
    export { api_41 as api };
}
export declare function windowsTablet(): boolean;
export declare namespace windowsTablet {
    let api_42: string[];
    export { api_42 as api };
}
export declare function propertyCount(object: any, count: any): boolean;
export declare namespace propertyCount {
    let api_43: string[];
    export { api_43 as api };
}
export declare function propertyDefined(object: any, property: any): boolean;
export declare namespace propertyDefined {
    let api_44: string[];
    export { api_44 as api };
}
export declare function thenable(value: any): boolean;
export declare function inArray(value: any, array: any): any;
export declare namespace inArray {
    let api_45: string[];
    export { api_45 as api };
}
export declare function sorted(array: any, sign: any): boolean;
export declare function setNamespace(): {
    VERSION: string;
    not: {};
    all: {};
    any: {};
    arguments(value: any): boolean;
    array(value: any): boolean;
    boolean(value: any): boolean;
    char(value: any): boolean;
    date(value: any): boolean;
    domNode(object: any): boolean;
    error(value: any): boolean;
    function(value: any): boolean;
    json(value: any): boolean;
    nan(value: any): any;
    null(value: any): boolean;
    number(value: any): any;
    object(value: any): boolean;
    regexp(value: any): boolean;
    sameType: {
        (value: any, other: any): any;
        api: string[];
    };
    string(value: any): boolean;
    undefined(value: any): boolean;
    windowObject(value: any): boolean;
    stream(stream: any): boolean;
    duplexStream(stream: any): boolean;
    readableStream(stream: any): boolean;
    transformStream(stream: any): boolean;
    writeableStream(stream: any): boolean;
    empty(value: any): boolean;
    map(value: any): boolean;
    existy(value: any): boolean;
    falsy(value: any): boolean;
    truthy: (...args: any[]) => boolean;
    above: {
        (n: any, min: any): boolean;
        api: string[];
    };
    decimal(n: any): boolean;
    equal: {
        (value: any, other: any): any;
        api: string[];
    };
    even(n: any): boolean;
    finite: (n: number) => any;
    infinite(n: any): boolean;
    integer(n: any): any;
    negative(n: any): boolean;
    odd(n: any): boolean;
    positive(n: any): boolean;
    under: {
        (n: any, max: any): boolean;
        api: string[];
    };
    within: {
        (n: any, min: any, max: any): boolean;
        api: string[];
    };
    ip(value: any): any;
    capitalized(string: any): boolean;
    endWith: {
        (string: any, target: any): boolean;
        api: string[];
    };
    include: {
        (string: any, target: any): any;
        api: string[];
    };
    umlaut(string: any): boolean;
    lowerCase(string: any): boolean;
    palindrome(string: any): any;
    space(value: any): boolean;
    startWith: {
        (string: any, target: any): boolean;
        api: string[];
    };
    upperCase(string: any): boolean;
    day: {
        (date: any, day: any): boolean;
        api: string[];
    };
    dayLightSavingTime(date: any): boolean;
    future(date: any): boolean;
    inDateRange: {
        (date: any, start: any, end: any): boolean;
        api: string[];
    };
    inLastMonth(date: any): boolean;
    inLastWeek(date: any): boolean;
    inLastYear(date: any): boolean;
    inNextMonth(date: any): boolean;
    inNextWeek(date: any): boolean;
    inNextYear(date: any): boolean;
    leapYear(year: any): boolean;
    month: {
        (date: any, month: any): boolean;
        api: string[];
    };
    past(date: any): boolean;
    quarterOfYear: {
        (date: any, quarter: any): boolean;
        api: string[];
    };
    today(date: any): boolean;
    tomorrow(date: any): boolean;
    weekend(date: any): boolean;
    weekday: (...args: any[]) => boolean;
    year: {
        (date: any, year: any): boolean;
        api: string[];
    };
    yesterday(date: any): boolean;
    browser: {
        (): boolean;
        api: string[];
    };
    nodejs: {
        (): boolean;
        api: string[];
    };
    deno: {
        (): boolean;
        api: string[];
    };
    webworker: {
        (): boolean;
        api: string[];
    };
    android: {
        (): boolean;
        api: string[];
    };
    androidPhone: {
        (): boolean;
        api: string[];
    };
    androidTablet: {
        (): boolean;
        api: string[];
    };
    blackberry: {
        (): boolean;
        api: string[];
    };
    chrome: {
        (range: any): any;
        api: string[];
    };
    desktop: {
        (): any;
        api: string[];
    };
    edge: {
        (range: any): any;
        api: string[];
    };
    firefox: {
        (range: any): any;
        api: string[];
    };
    ie: {
        (range: any): any;
        api: string[];
    };
    ios: {
        (): any;
        api: string[];
    };
    ipad: {
        (range: any): any;
        api: string[];
    };
    iphone: {
        (range: any): any;
        api: string[];
    };
    ipod: {
        (range: any): any;
        api: string[];
    };
    linux: {
        (): any;
        api: string[];
    };
    mac: {
        (): boolean;
        api: string[];
    };
    mobile: {
        (): any;
        api: string[];
    };
    offline: (...args: any[]) => boolean;
    online: {
        (): boolean;
        api: string[];
    };
    opera: {
        (range: any): any;
        api: string[];
    };
    operaMini: {
        (range: any): any;
        api: string[];
    };
    phantom: {
        (range: any): any;
        api: string[];
    };
    safari: {
        (range: any): any;
        api: string[];
    };
    tablet: {
        (): any;
        api: string[];
    };
    touchDevice: {
        (): boolean;
        api: string[];
    };
    windows: {
        (): boolean;
        api: string[];
    };
    windowsPhone: {
        (): boolean;
        api: string[];
    };
    windowsTablet: {
        (): boolean;
        api: string[];
    };
    propertyCount: {
        (object: any, count: any): boolean;
        api: string[];
    };
    propertyDefined: {
        (object: any, property: any): boolean;
        api: string[];
    };
    thenable(value: any): boolean;
    inArray: {
        (value: any, array: any): any;
        api: string[];
    };
    sorted(array: any, sign: any): boolean;
    setNamespace(): any;
    setRegexp(regexp: any, name: any): void;
};
export declare function setRegexp(regexp: any, name: any): void;
export { _function as function, _null as null };
//# sourceMappingURL=is-it-check.d.ts.map