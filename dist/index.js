import {getArrayCopy} from '@writetome51/get-array-copy';
import {getProperty} from '@writetome51/get-property';
import {sortByProperty} from '@writetome51/sort-by-property';


// Separates `objects` into sub-arrays with matching values of `property`.  Does not modify `objects`.
// The value of `property` in each object must be either number, boolean, or string.
// `property` can contain dot-notation.

export function getGroupedByProperty(property, objects) {
	let sortedObjects = getSortedByProperty(property, objects);

	return getAdjacentObjectsGroupedByMatchingProperty(sortedObjects);


	function getSortedByProperty(property, objects) {
		objects = getArrayCopy(objects);
		sortByProperty(property, objects);
		return objects;
	}


	function getAdjacentObjectsGroupedByMatchingProperty(objects) {
		let groups = [], group = [objects[0]], length = objects.length, i = 0;

		while (++i < length) { // skipping first item.
			let obj = objects[i];
			if (objectMatchesLastItemInGroup(obj, group)) group.push(obj);
			else {
				groups.push(group);
				group = [obj];
			}
		}
		groups.push(group);
		return groups;


		function objectMatchesLastItemInGroup(obj, group) {
			let propertyValue = String(getProperty(property, obj));
			let lastItem = group.length - 1;
			let valueOfSameProperty_of_lastItemInGroup = String(getProperty(property, group[lastItem]));
			return propertyValue === valueOfSameProperty_of_lastItemInGroup;
		}
	}
}
