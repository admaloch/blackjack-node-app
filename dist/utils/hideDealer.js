"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideDealerCards = void 0;
const hideDealerCards = (arr) => ([arr[0], ...arr.slice(1).map(x => x = 'X')]);
exports.hideDealerCards = hideDealerCards;
