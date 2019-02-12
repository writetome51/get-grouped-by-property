"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEmpty_notEmpty_1 = require("basic-data-handling/isEmpty_notEmpty");
var get_sorted_by_property_1 = require("@writetome51/get-sorted-by-property");
var get_property_1 = require("@writetome51/get-property");
var array_append_prepend_1 = require("@writetome51/array-append-prepend");
// Separates objects into sub-arrays with matching values of property.
// The value of property in each object must be a primitive type.
// It decides how to do the initial sorting by checking the data type of property
// in the first object in objects. If it's a string or boolean, the sorting
// is done alphabetically.  If it's a number the sorting is done numerically.
// parameter property can contain dot-notation.
function getGroupedByProperty(property, objects) {
    objects = get_sorted_by_property_1.getSortedByProperty(property, objects);
    return getGroupedAdjacentObjectsByMatchingProperty(objects, property);
    function getGroupedAdjacentObjectsByMatchingProperty(objects, property) {
        var groups = [], group = [];
        objects.forEach(function (obj) {
            if (isEmpty_notEmpty_1.isEmpty(group) || objectPropertyMatchesLastItemInGroup(obj, property, group)) {
                array_append_prepend_1.append([obj], group);
            }
            else {
                array_append_prepend_1.append([group], groups);
                group = [obj];
            }
        });
        array_append_prepend_1.append([group], groups);
        return groups;
        function objectPropertyMatchesLastItemInGroup(obj, property, group) {
            var lastItem = group.length - 1;
            // For making the 'identical' comparison, results are best when both items
            // being compared are converted to type 'string' and forced to lower-case, even if they
            // were not originally strings.  This has to do with comparing data of different types
            // that appear identical, like '1.0' and 1, or 'true' and true.
            var propertyValue = String(get_property_1.getProperty(property, obj)).toLowerCase();
            var valueOfSameProperty_of_lastItemInGroup = String(get_property_1.getProperty(property, group[lastItem])).toLowerCase();
            return propertyValue === valueOfSameProperty_of_lastItemInGroup;
        }
    }
}
exports.getGroupedByProperty = getGroupedByProperty;
