const identity = (x) => x;

export const arrayToObject = ({processor = identity, property = "id"} = {}) => (acc, obj) => {
    if (property in obj) {
        acc[obj[property]] = processor(obj);
    }

    return acc;
};

export const sortObjectsByProperty = (objects, property) => (
    objects.sort((a, b) => a[property].localeCompare(b[property]))
);

export const parseDateStringToYMD = (dateString) => {
    if (!dateString) {
        return "";
    } else {
        const epochDate = Date.parse(dateString);
        const dateObject = new Date(epochDate);

        return new Date(
            dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000 )
        ).toISOString().split("T")[0];
    }
};

export const reduceLoadingStates = (slices, state) => (
    slices.reduce((acc, slice) => (
        acc || slice.fetchAll.selectors.getLoading(state)
    ), false)
);
