"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var arrays = [
    [[1, 2]], [[3, 4, 5, 6, 7]], [[8, 9, 10]], [11, 12], [13, 14, 15, 16], [17, 18, 19, 20, 21], [22, 23, 24, 25]
];
var groups = index_1.getGroupedByProperty('length', arrays);
console.log(groups);
/***************
 [
 [ [ 1, 2 ], [ 11, 12 ] ],
 [ [ 8, 9, 10 ] ],
 [ [ 13, 14, 15, 16 ], [ 22, 23, 24, 25 ] ],
 [ [ 3, 4, 5, 6, 7 ], [ 17, 18, 19, 20, 21 ] ]
 ]
 ***************/
var objs = [{ prop: 1.0000111, a: 1 }, { prop: 2.0 }, { prop: 3.4444411 }, { prop: 2 }, { prop: 3.444411 }, { prop: 1.00001111, a: 3 }];
groups = index_1.getGroupedByProperty('prop', objs);
console.log(groups);
