const identity = (x) => x;

const arrayToObject = ({processor = identity, property = "id"} = {}) => (acc, obj) => {
    if (property in obj) {
        acc[obj[property]] = processor(obj);
    }

    return acc;
};

module.exports = {
    arrayToObject
};
