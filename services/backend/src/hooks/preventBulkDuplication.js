const {arrayToObject} = require("utils/helperFunctions");

/* Hook that, given a list of new objects to create, checks to make sure they don't already exist
 * before creating them; it only creates the objects that don't already exist, and returns those.
 *
 * @param uniqueProperty    The property on the objects that is used for uniquely identifying them
 *
 * @return The new objects that were created (not the whole input).
 */
const preventBulkDuplication = (uniqueProperty = "id") => async (context) => {
    const {data, service} = context;

    // This hook is only for handling duplication detection when doing a bulk (i.e. array) create
    if (!Array.isArray(data)) {
        return context;
    }

    const uniqueProperties = data.map((object) => object[uniqueProperty]);
    const existingObjects = await service.find({query: {[uniqueProperty]: {$in: uniqueProperties}}});

    if (data.length !== existingObjects.length) {
        // Convert the data list to an object for constant time property lookups, as opposed to linear array searches
        const objectsByUniqueProperty = existingObjects.reduce(arrayToObject({property: uniqueProperty}), {});

        // Keep only the objects that don't already exist
        context.data = data.filter((object) => !(object[uniqueProperty] in objectsByUniqueProperty));
    } else {
        // Empty out the data so that Feathers doesn't bother actually trying to create any objects
        context.data = [];
    }

    return context;
};

module.exports = preventBulkDuplication;
