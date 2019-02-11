import { getAndRemoveHead } from '@writetome51/array-get-and-remove-head-tail';
import { isEmpty } from 'basic-data-handling/isEmpty_notEmpty';
import { isString } from 'basic-data-handling/isString_notString';
import { append } from '@writetome51/array-append-prepend';
import { getSortedByProperty } from '@writetome51/get-sorted-by-property';
import { getProperty } from '@writetome51/get-property';
import { arraysMatch } from '@writetome51/arrays-match';


// Separates objects into sub-arrays with matching values of property.
// parameter property can contain dot-notation.
// For properties to have matching values, they cannot be objects.  Arrays are allowed.

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

			let propertyValue = getProperty(property, obj);
			let valueOfSameProperty_of_lastItemInGroup = getProperty(property, group[lastItem]);

			if (isString(propertyValue) && isString(valueOfSameProperty_of_lastItemInGroup)) {
				return propertyValue.toLowerCase() === valueOfSameProperty_of_lastItemInGroup.toLowerCase();
			}
			return propertyValue === valueOfSameProperty_of_lastItemInGroup;
		}

	}


}