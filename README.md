# getGroupedByProperty()
## getGroupedByProperty(property, objects): Array<Object[]>

Returns <b>objects</b> divided into sub-arrays, grouped by value of a particular <b>property</b>.  
<b>property</b> is a string that can include dot notation ( i.e,  `'property.subproperty.subsubproperty'` ) .  

Note:  <b>property</b> does not have to be an object key. It can also be an array index.  
If you are getting the value of a nested array index, here you need to use dot-notation and not  
square braces.  Example: `'1.0' instead of [1][0]`

## Examples
```

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
