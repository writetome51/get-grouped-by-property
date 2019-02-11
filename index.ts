import { getAndRemoveHead } from '@writetome51/array-get-and-remove-head-tail';
import { getMergedArrays } from '@writetome51/array-get-merged-arrays';
import { isEmpty } from 'basic-data-handling/isEmpty_notEmpty';
import { isArray } from 'basic-data-handling/isArray_notArray';
import { append } from '@writetome51/array-append-prepend';
import { getSortedByProperty } from '@writetome51/get-sorted-by-property';
import { getProperty } from '@writetome51/get-property';
import { arraysMatch } from '@writetome51/arrays-match';


// Separates objects into sub-arrays with matching values of property.
// property can contain dot-notation.

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

			let propertyValue = String(getProperty(property, obj)).toLowerCase();
			let valueOfSameProperty_of_lastItemInGroup =
				String(getProperty(property, group[lastItem])).toLowerCase();

			if (isArray(propertyValue) && isArray(valueOfSameProperty_of_lastItemInGroup)) {
				return arraysMatch(propertyValue, valueOfSameProperty_of_lastItemInGroup);
			}
			else return propertyValue === valueOfSameProperty_of_lastItemInGroup;
		}

	}


}