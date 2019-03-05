# getGroupedByProperty(property, objects): Array<any[]>

Returns `objects` divided into sub-arrays, grouped by matching value of a particular 
`property`.  
The value of `property` in each object must be a primitive type.  
The parameter `property` is a string that can include dot notation ( i.e,  `'property.subproperty.subsubproperty'` ) .   

When using this function you have to take some care with the 'number' data type.  
The algorithm first sorts the `objects` array by checking the data type of `property`  
in the first object in `objects`. If it's a string or boolean, all objects are sorted  
alphabetically. If it's a number, all objects are sorted numerically, and the algorithm  
expects that property in all `objects` to be type 'number'. If not, you get an error. 

Note:  `property` does not have to be an object key. It can also be an array index.  
If an array index, here you need to use dot-notation and not square braces.  
Example: `'1.0' instead of [1][0]`

## Examples
```
persons = [
	{person: {hair: 'red', name: 'tom'}},
	{person: {hair: 'brown', name: 'ron'}},
	{person: {hair: 'black', name: 'harry'}},
	{person: {hair: 'blue', name: 'barry'}},
	{person: {hair: 'brown', name: 'midge'}},
	{person: {hair: 'black', name: 'sandy'}}
];

groups = getGroupedByProperty('person.hair', persons);

/*************
groups is:
[
   [ {person: {hair: 'black', name: 'harry'}}, {person: {hair: 'black', name: 'sandy'}} ],
   [ {person: {hair: 'blue', name: 'barry'}} ],
   [ {person: {hair: 'brown', name: 'ron'}}, {person: {hair: 'brown', name: 'midge'}} ],
   [ {person: {hair: 'red', name: 'tom'}} ]
]
*************/


// What if some values are null or undefined?

persons = [
	{person: {hair: 'red', name: 'tom'}},
	{person: {hair: 'null', name: 'ron'}},
	{person: {name: 'harry'}}, // missing property means its value is undefined.
	{person: {hair: 'blue', name: 'barry'}},
	{person: {hair: null, name: 'midge'}},
	{person: {hair: undefined, name: 'sandy'}}
];

groups = getGroupedByProperty('person.hair', persons);

/*************
groups is:
[
   [ {person: {hair: 'blue', name: 'barry'}} ],
   [ {person: {hair: 'null', name: 'ron'}}, {person: {hair: null, name: 'midge'}} ],
   [ {person: {hair: 'red', name: 'tom'}} ],
   [ {person: {name: 'harry'}}, {person: {hair: undefined, name: 'sandy'}} ]
]
*************/


// group together arrays with the same number of items:

let arrays = [
	[1, 2], [3, 4, 5, 6, 7], [8, 9, 10], [11, 12], 
	[13, 14, 15, 16], [17, 18, 19, 20, 21], [22, 23, 24, 25]
];
let groups = getGroupedByProperty('length', arrays);

/*************
groups is:
[
   [[1, 2], [11, 12]],
   [[8, 9, 10]],
   [[13, 14, 15, 16], [22, 23, 24, 25]],
   [[3, 4, 5, 6, 7], [17, 18, 19, 20, 21]]
]
*************/


```

## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm install @writetome51/get-grouped-by-property
```
## Loading
```
// If using TypeScript:
import {getGroupedByProperty} from '@writetome51/get-grouped-by-property';
// If using ES5 JavaScript:
var getGroupedByProperty = 
	require('@writetome51/get-grouped-by-property').getGroupedByProperty;
```
