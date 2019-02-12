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


let objs: any[] = [{prop: 'the'}, {prop: '1.00001111'}, {prop: 2.0}, {prop: '2'}, {prop: 'THE'}, {prop: 1.00001111}];
groups = getGroupedByProperty('prop', objs);
if (groups[0][0].prop === '1.00001111' && groups[0][1].prop === 1.00001111
	&& groups[1][0].prop === 2 && groups[1][1].prop === '2'
	&& groups[2][0].prop === 'THE' && groups[2][1].prop === 'the') console.log('test 2 passed');
else console.log('test 2 FAILED');


objs = [
	{person: {hair: 'red', name: 'tom'}},
	{person: {hair: 'brown', name: 'ron'}},
	{person: {hair: 'black', name: 'harry'}},
	{person: {hair: 'blue', name: 'barry'}},
	{person: {hair: 'brown', name: 'midge'}},
	{person: {hair: 'black', name: 'sandy'}}
];

groups = getGroupedByProperty('person.hair', objs);
if (groups[0][0].person.hair === 'black' && groups[0][1].person.hair === 'black'
	&& groups[1].length === 1 && groups[1][0].person.hair === 'blue' && groups[2][0].person.hair === 'brown'
&& groups[2][1].person.hair === 'brown' && groups[3].length === 1  && groups[3][0].person.hair === 'red')
	console.log('test 3 passed');
else console.log('test 3 FAILED');


objs = [
	{person: {hair: 'red', name: 'tom'}},
	{person: {hair: 'null', name: 'ron'}},
	{person: {name: 'harry'}},
	{person: {hair: 'blue', name: 'barry'}},
	{person: {hair: null, name: 'midge'}},
	{person: {hair: undefined, name: 'sandy'}}
];

groups = getGroupedByProperty('person.hair', objs);
if (groups[0].length === 1 && groups[0][0].person.hair === 'blue'
	&& groups[1][0].person.hair === 'null' && groups[1][1].person.hair === null
	&& groups[2].length === 1 && groups[2][0].person.hair === 'red'
	 && groups[3][0].person.hair === undefined && groups[3][1].person.hair === undefined)
	console.log('test 4 passed');
else console.log('test 4 FAILED');
