const identity = (x) => x;

export const arrayToObject = (objectProcessor = identity) => (acc, obj) => {
    if ("id" in obj) {
        acc[obj.id] = objectProcessor(obj);
    }

    return acc;
};
