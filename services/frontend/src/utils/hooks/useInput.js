import {useMemo, useCallback, useState} from "react";

const useInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((value) => {
        if (value === null || value === undefined) {
            setValue(initialValue);
        } else if (value && value.target) {
            if (value.target.value) {
                setValue(value.target.value);
            } else {
                setValue("");
            }
        } else {
            setValue(value);
        }
    }, [setValue, initialValue]);

    return useMemo(() => ({
        value,
        onChange
    }), [value, onChange]);
};

export default useInput;
