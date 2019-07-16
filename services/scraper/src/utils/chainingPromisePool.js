// Adapted from https://itnext.io/node-js-handling-asynchronous-operations-in-parallel-69679dfae3fc
const chainingPromisePool = async (iterable, asyncOperation, {concurrencyLimit = 5} = {}) => {
    // Enhance arguments array to have an index of the argument at hand
    const iterableWithIndexes = [].concat(iterable.map((value, index) => ({value, index})));
    const results = new Array(iterable.length);
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());

    // Recursively chain the next Promise to the currently executed Promise
    const chainNext = (promise) => {
        if (iterableWithIndexes.length) {
            const argument = iterableWithIndexes.shift();

            return promise.then(() => {
                // Store the result into the array upon Promise completion
                const operationPromise = asyncOperation(argument.value).then((result) => {
                    results[argument.index] = result;
                }).catch((error) => {
                    console.log(error);
                    results[argument.index] = null;
                });

                return chainNext(operationPromise);
            });
        }

        return promise;
    }

    await Promise.all(promises.map(chainNext));

    return results;
}

module.exports = chainingPromisePool;
