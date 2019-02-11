"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEmpty_notEmpty_1 = require("basic-data-handling/isEmpty_notEmpty");
var isArray_notArray_1 = require("basic-data-handling/isArray_notArray");
var array_append_prepend_1 = require("@writetome51/array-append-prepend");
var get_sorted_by_property_1 = require("@writetome51/get-sorted-by-property");
var get_property_1 = require("@writetome51/get-property");
var arrays_match_1 = require("@writetome51/arrays-match");
// Separates objects into sub-arrays with matching values of property.
// property can contain dot-notation.
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
            var propertyValue = String(get_property_1.getProperty(property, obj)).toLowerCase();
            var valueOfSameProperty_of_lastItemInGroup = String(get_property_1.getProperty(property, group[lastItem])).toLowerCase();
            if (isArray_notArray_1.isArray(propertyValue) && isArray_notArray_1.isArray(valueOfSameProperty_of_lastItemInGroup)) {
                return arrays_match_1.arraysMatch(propertyValue, valueOfSameProperty_of_lastItemInGroup);
            }
            else
                return propertyValue === valueOfSameProperty_of_lastItemInGroup;
        }
    }
}
exports.getGroupedByProperty = getGroupedByProperty;
