const {performance} = require("perf_hooks");

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
