import {useMemo, useCallback, useState} from "react";

const useInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((value) => {
        if (value === null || value === undefined) {
            // Reset to initialValue when null/undefined is passed
            // This acts as a good breakout when you don't/can't pass the initialValue again
            setValue(initialValue);
        } else if (value && value.target) {
            // For handling event objects (from an <input> element)
            if (value.target.value) {
                // The event object actually has a value
                setValue(value.target.value);
            } else {
                // The event object has a null/undefined/empty value; more of an edge case
                setValue("");
            }
        } else {
            // For handling values passed straight to the onChange (i.e. not from an <input> element)
            setValue(value);
        }
    }, [setValue, initialValue]);

    return useMemo(() => ({
        value,
        onChange
    }), [value, onChange]);
};

export default useInput;
