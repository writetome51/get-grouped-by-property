import { append } from '@writetome51/array-append-prepend';
import { getArrayCopy } from '@writetome51/get-array-copy';
import { getProperty } from '@writetome51/get-property';
import { sortByProperty } from '@writetome51/sort-by-property';
import { toStr } from '@writetome51/to-str';


// Returns `objects` divided into sub-arrays, grouped by matching value of `property`.
// Does not modify `objects`.
// You can customize how a match is determined with optional callback `matchFound(a, b)`.
// The value of `property` in each object must be either number, boolean, or string.
// `property` can contain dot-notation.

export function getGroupedByProperty<T>(
	property: string,
	objects: T[],
	matchFound = (a, b) => toStr(a) === toStr(b)
): Array<T[]> {
	let sortedObjects = getSortedByProperty(property, objects);

	return getAdjacentObjectsGroupedByMatchingProperty(sortedObjects);


	function getSortedByProperty(property, objects) {
		objects = getArrayCopy(objects);
		sortByProperty(property, objects);
		return objects;
	}


	function getAdjacentObjectsGroupedByMatchingProperty(objects): Array<T[]> {
		let groups = [], group = [objects[0]];

		for (let i = 1, length = objects.length; i < length; ++i) { // skipping first item.
			let obj = objects[i];
			if (objectMatchesItemInGroup(obj, group)) append(obj, group);
			else {
				append(group, groups);
				group = [obj];
			}
		}
		append(group, groups);
		return groups;


		function objectMatchesItemInGroup(obj, group) {
			let propertyValue = getProperty(property, obj);
			let valueOfSameProperty_of_itemInGroup = getProperty(property, group[0]);

			return matchFound(propertyValue, valueOfSameProperty_of_itemInGroup);
		}

	}

}
