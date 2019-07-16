/* Hook that tries to first find an object before creating one.
 *
 * @param queryCustomizer   Function that transforms the creation data into a query for the lookup.
 *
 * @return The existing object if found, otherwise continues with creating and returning the new object.
 */
const findOrCreate = (queryCustomizer = (data) => data) => async (context) => {
    const {data, service} = context;

    // This hook is only for single creations
    if (Array.isArray(data)) {
        return context;
    }

    const query = queryCustomizer(data);
    const response = await service.find({query});

    if (response.length || response.data && response.data.length) {
        context.result = response[0];
    }

    return context;
};

module.exports = findOrCreate;
