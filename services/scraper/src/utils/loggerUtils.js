const {performance} = require("perf_hooks");

/* Wrapper function that can be used to log how long a function takes to run,
 * along with logging various other metadata about the function.
 *
 * It is partially-applied on a `logger` so that a module can reuse it's module-specific logger,
 * instead of relying on the default one without any extra identifying metadata.
 *
 * @param logger    The module-specific logger to use.
 * @return The partially-applied `logExecutionTime`.
 *
 * @param functionName  The name of the function being wrapped (used for logging).
 * @param metadata      An arbitrary object of values to log (usually something like function arguments).
 * @param callback      The function being wrapped.
 * @return The result of `callback`.
 */
const logExecutionTime = (logger) => async (functionName, metadata, callback) => {
    const t0 = performance.now();
    logger.info({message: `Starting '${functionName}'`, functionName, ...metadata});

    const result = await callback();

    const t1 = performance.now();
    logger.info({message: `Finished '${functionName}'`, functionName, ...metadata, time: (t1 - t0) / 1000});

    return result;
};

module.exports = {
    logExecutionTime
};
