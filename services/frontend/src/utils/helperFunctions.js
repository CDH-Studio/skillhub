const identity = (x) => x;

export const reduceToObject = (objectProcessor = identity) => (acc, obj) => {
    acc[obj.id] = objectProcessor(obj);
    return acc;
};
