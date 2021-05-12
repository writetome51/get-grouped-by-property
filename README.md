# getGroupedByProperty\<T\>(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;property: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objects: T[],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchFound? = (a, b) => String(a) === String(b)<br>): Array<T[]>

Returns `objects` divided into sub-arrays, grouped by matching value of `property`.  
The original `objects` array is not modified.  
You can customize how a match is determined with optional callback `matchFound(a, b)`  
(by default it returns `String(a) === String(b)` ).  
Based on the data type of `objects[0][property]`, this function decides how to sort  
all `objects`. That type must be either number (sorting will be numeric), string or  
boolean (sorting will be alphabetical for both). After sorting, adjacent objects are  
grouped together if `matchFound(a, b)` returns true.

Note: `property` is a string that can include dot-notation ( i.e.,  
`'property.subproperty.subsubproperty'` ).  Even if `property` is an array index,  
here you need to use dot-notation and not square braces, i.e., `'1.0' // instead of [1][0]`  

## Examples
```js
persons = [
	{person: {hair: 'red', name: 'tom'}},
	{person: {hair: 'brown', name: 'ron'}},
	{person: {hair: 'black', name: 'harry'}},
	{person: {hair: 'blue', name: 'barry'}},
	{person: {hair: 'brown', name: 'midge'}},
	{person: {hair: 'black', name: 'sandy'}}
];
getGroupedByProperty('person.hair', persons);
/*************
Returns:
[
   [ {person: {hair: 'black', name: 'harry'}}, {person: {hair: 'black', name: 'sandy'}} ],
   [ {person: {hair: 'blue', name: 'barry'}} ],
   [ {person: {hair: 'brown', name: 'ron'}}, {person: {hair: 'brown', name: 'midge'}} ],
   [ {person: {hair: 'red', name: 'tom'}} ]
]
*************/


// If any values are null or undefined, they will be treated as if they
// were strings 'null' and 'undefined':

persons = [
	{person: {hair: 'red', name: 'tom'}},
	{person: {hair: 'null', name: 'ron'}},
	{person: {name: 'harry'}}, // missing property means its value is undefined.
	{person: {hair: null, name: 'midge'}},
	{person: {hair: undefined, name: 'sandy'}}
];
getGroupedByProperty('person.hair', persons);
/*************
Returns:
[
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
getGroupedByProperty('length', arrays);
/*************
Returns:
[
   [ [1, 2], [11, 12] ],
   [ [8, 9, 10] ],
   [ [13, 14, 15, 16], [22, 23, 24, 25] ],
   [ [3, 4, 5, 6, 7], [17, 18, 19, 20, 21] ]
]
*************/


// By default, matching is case-sensitive:

objs = [{prop: 'V'}, {prop: 'v'}, {prop: 'V'}, {prop: 'A'}, {prop: 'a'}, {prop: 'a'}];
getGroupedByProperty('prop', objs);
/*************
Returns:
[
   [ { prop: 'A' } ],
   [ { prop: 'a' }, { prop: 'a' } ],
   [ { prop: 'V' }, { prop: 'V' } ],
   [ { prop: 'v' } ]
]
 *************/

// Make matching case-insensitive:
objs = [{prop: 'V'}, {prop: 'v'}, {prop: 'V'}, {prop: 'A'}, {prop: 'a'}, {prop: 'a'}];
getGroupedByProperty(
    'prop', objs, (a, b) => String(a).toLowerCase() === String(b).toLowerCase()
);
/************
Returns:
[
  [ { prop: 'A' }, { prop: 'a' }, { prop: 'a' } ],
  [ { prop: 'V' }, { prop: 'V' }, { prop: 'v' } ]
]
*************/


// These last 2 examples show the different ordering of results based on what object
// comes first in the array.

// Since the value of objs[0]['prop'] is a number, groups will be ordered
// numerically:
objs = [{prop: 1}, {prop: '1.0001'}, {prop: '2.0'}, {prop: '1'}, 
        {prop: '00100'}, {prop: '03'}];
getGroupedByProperty('prop', objs);
/***************
Returns:
[
   [ { prop: 1 }, { prop: '1' } ],
   [ { prop: '1.0001' } ],
   [ { prop: '2.0' } ],
   [ { prop: '03' } ],
   [ { prop: '00100' } ]
]
***************/

// Since the value of objs[0]['prop'] is a string, groups will be ordered
// alphabetically:
objs = [{prop: '1.0001'}, {prop: 1}, {prop: '2.0'}, {prop: '1'}, 
        {prop: '00100'}, {prop: '03'}];
getGroupedByProperty('prop', objs);
/***************
Returns:
[
   [ { prop: '00100' } ],
   [ { prop: '03' } ],
   [ { prop: 1 }, { prop: '1' } ],
   [ { prop: '1.0001' } ],
   [ { prop: '2.0' } ]
]
***************/
```

## Installation

```bash
npm i @writetome51/get-grouped-by-property
```
## Loading
```js
import {getGroupedByProperty} from '@writetome51/get-grouped-by-property';
```
