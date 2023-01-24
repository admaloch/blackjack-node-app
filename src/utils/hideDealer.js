"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.hideDealerCards = void 0;
var hideDealerCards = function (arr) { return (__spreadArray([arr[0]], arr.slice(1).map(function (x) { return x = 'X'; }), true)); };
exports.hideDealerCards = hideDealerCards;
