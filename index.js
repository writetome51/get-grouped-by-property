"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEmpty_notEmpty_1 = require("basic-data-handling/isEmpty_notEmpty");
var isString_notString_1 = require("basic-data-handling/isString_notString");
var array_append_prepend_1 = require("@writetome51/array-append-prepend");
var get_sorted_by_property_1 = require("@writetome51/get-sorted-by-property");
var get_property_1 = require("@writetome51/get-property");
// Separates objects into sub-arrays with matching values of property.
// parameter property can contain dot-notation.
// For properties to have matching values, they cannot be objects.  Arrays are allowed.
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
            var propertyValue = get_property_1.getProperty(property, obj);
            var valueOfSameProperty_of_lastItemInGroup = get_property_1.getProperty(property, group[lastItem]);
            if (isString_notString_1.isString(propertyValue) && isString_notString_1.isString(valueOfSameProperty_of_lastItemInGroup)) {
                return propertyValue.toLowerCase() === valueOfSameProperty_of_lastItemInGroup.toLowerCase();
            }
            return propertyValue === valueOfSameProperty_of_lastItemInGroup;
        }
    }
}
exports.getGroupedByProperty = getGroupedByProperty;
