import { isEmpty } from 'basic-data-handling/isEmpty_notEmpty';
import { getSortedByProperty } from '@writetome51/get-sorted-by-property';
import { getProperty } from '@writetome51/get-property';
import { arraysMatch } from '@writetome51/arrays-match';
import { append } from '@writetome51/array-append-prepend';
import { getAndRemoveHead } from '@writetome51/array-get-and-remove-head-tail';


// Separates objects into sub-arrays with matching values of property.
// The value of property in each object must be a primitive type.
// It decides how to do the initial sorting by checking the data type of property
// in the first object in objects. If it's a string or boolean, the sorting
// is done alphabetically.  If it's a number the sorting is done numerically.
// parameter property can contain dot-notation.

export function getGroupedByProperty(property, objects): Array<Object[]> {
	objects = getSortedByProperty(property, objects);

	return getGroupedAdjacentObjectsByMatchingProperty(objects, property);


	function getGroupedAdjacentObjectsByMatchingProperty(objects: Object[], property): Array<Object[]> {
		let groups = [], group = [];

		objects.forEach((obj) => {
			if (isEmpty(group) || objectPropertyMatchesLastItemInGroup(obj, property, group)) {
				append([obj], group);
			}
			else {
				append([group], groups);
				group = [obj];
			}
		});
		append([group], groups);
		return groups;


		function objectPropertyMatchesLastItemInGroup(obj, property, group) {
			let lastItem = group.length - 1;

			// For making the 'identical' comparison, results are best when both items
			// being compared are converted to type 'string' and forced to lower-case, even if they
			// were not originally strings.  This has to do with comparing data of different types
			// that appear identical, like '1.0' and 1, or 'true' and true.
			let propertyValue = String(getProperty(property, obj)).toLowerCase();
			let valueOfSameProperty_of_lastItemInGroup =
				String(getProperty(property, group[lastItem])).toLowerCase();

			return propertyValue === valueOfSameProperty_of_lastItemInGroup;
		}

	}


}