const useOnEnterKey = (callback) => (e) => {
    if (e.key === "Enter") {
        callback();
    }
};

export default useOnEnterKey;
