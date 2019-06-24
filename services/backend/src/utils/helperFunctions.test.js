const {arrayToObject} = require("./helperFunctions");

describe("arrayToObject", () => {
    const arbitraryObjectGenerator = (key, value) => ({[key]: value, other: "prop"});
    const objectGenerator = (id) => arbitraryObjectGenerator("id", id);
    const newObjectGenerator = (id) => ({...objectGenerator(id), thing: "prop"});

    const arrayOfObjects = [objectGenerator(1), objectGenerator(2), objectGenerator(3)];

    it("can reduce an array of objects into an object of objects keyed by ID", () => {
        const objectOfObjects = {1: objectGenerator(1), 2: objectGenerator(2), 3: objectGenerator(3)};

        expect(arrayOfObjects.reduce(arrayToObject(), {})).toEqual(objectOfObjects);
    });

    it("can apply a transform to the objects while reducing them", () => {
        const newObjectOfObjects = {1: newObjectGenerator(1), 2: newObjectGenerator(2), 3: newObjectGenerator(3)};

        const transformation = (obj) => ({...obj, thing: "prop"});
        expect(arrayOfObjects.reduce(arrayToObject({processor: transformation}), {})).toEqual(newObjectOfObjects);
    });

    it("can reduce an array of objects into an object of objects keyed by an arbitrary object property", () => {
        const arbitraryObject1 = arbitraryObjectGenerator("aKey", 1);
        const arbitraryObject2 = arbitraryObjectGenerator("aKey", 2);

        const arbitraryArrayOfObjects = [arbitraryObject1, arbitraryObject2];
        const arbitraryObjectOfObjects = {1: arbitraryObject1, 2: arbitraryObject2};

        expect(
            arbitraryArrayOfObjects.reduce(arrayToObject({property: "aKey"}), {})
        ).toEqual(
            arbitraryObjectOfObjects
        );
    });

    it("returns an empty object if the objects in the array don't have an ID property", () => {
        const invalidArrayOfObjects = [{test: "test"}, {test: "test"}];

        expect(invalidArrayOfObjects.reduce(arrayToObject(), {})).toEqual({});
    });

    it("returns an empty object if the array is empty", () => {
        expect([].reduce(arrayToObject(), {})).toEqual({});
    });
});
