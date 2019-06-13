const identity = (x) => x;

export const arrayToObject = (objectProcessor = identity) => (acc, obj) => {
    acc[obj.id] = objectProcessor(obj);
    return acc;
};
