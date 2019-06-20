const identity = (x) => x;

export const arrayToObject = ({processor = identity, property = "id"} = {}) => (acc, obj) => {
    if (property in obj) {
        acc[obj[property]] = processor(obj);
    }

    return acc;
};
