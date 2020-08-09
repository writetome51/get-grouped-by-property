import { append } from '@writetome51/array-append-prepend';
import { getProperty } from '@writetome51/get-property';
import { getSortedByProperty } from '@writetome51/get-sorted-by-property';
import { isEmpty } from '@writetome51/is-empty-not-empty';


// Separates `objects` into sub-arrays with matching values of `property`.
// The value of `property` in each object must be a primitive type.
// `property` can contain dot-notation.

export function getGroupedByProperty(property, objects): Array<object[]> {
	objects = getSortedByProperty(property, objects);

	return getGroupedAdjacentObjectsByMatchingProperty(objects);


	function getGroupedAdjacentObjectsByMatchingProperty(objects): Array<object[]> {
		let groups = [], group = [];

		objects.forEach((obj) => {
			if (isEmpty(group) || objectPropertyMatchesLastItemInGroup(obj, property, group)) {
				append([obj], group);
			} else {
				append([group], groups);
				group = [obj];
			}
		});
		append([group], groups);
		return groups;


		function objectPropertyMatchesLastItemInGroup(obj, property, group) {

			// For making the 'identical' comparison, results are best when both items
			// being compared are converted to type 'string' and forced to lower-case, even if they
			// were not originally strings.  This has to do with comparing data of different types
			// that appear identical, like '1.0' and 1, or 'true' and true.
			let propertyValue = String(getProperty(property, obj)).toLowerCase();

			let lastItem = group.length - 1;
			let valueOfSameProperty_of_lastItemInGroup =
				String(getProperty(property, group[lastItem])).toLowerCase();

			return propertyValue === valueOfSameProperty_of_lastItemInGroup;
		}

	}


}
