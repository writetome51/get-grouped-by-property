import { getGroupedByProperty } from './index';
import { arraysMatch } from '@writetome51/arrays-match';


let arrays = [
	[1, 2], [3, 4, 5, 6, 7], [8, 9, 10], [11, 12], [13, 14, 15, 16], [17, 18, 19, 20, 21], [22, 23, 24, 25]
];
let groups = getGroupedByProperty('length', arrays);
if (arraysMatch(groups, [
	[[1, 2], [11, 12]],
	[[8, 9, 10]],
	[[13, 14, 15, 16], [22, 23, 24, 25]],
	[[3, 4, 5, 6, 7], [17, 18, 19, 20, 21]]
])) console.log('test 1 passed');
else console.log('test 1 FAILED');


let objs = [ {prop: 'the'}, {prop: '1.0000111', a: 1}, {prop: 2.0}, {prop: '2'}, {prop: 'THE'}, {prop: 1.00001111, a: 3}];
groups = getGroupedByProperty('prop', objs);
console.log(groups);