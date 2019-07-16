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
