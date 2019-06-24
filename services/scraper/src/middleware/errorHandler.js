const statuses = require("statuses");

const errorHandler = () => (err, req, res, next) => {  // eslint-disable-line
    let status = err.status || err.statusCode || 500;

    if (status < 400) {
        status = 500;
    }

    res.statusCode = status;
    const body = {status};

    // Send the stacktrace when not in production
    if (!process.env.NODE_ENV === "production") body.stack = err.stack;

    // Internal server errors
    if (status >= 500) {
        console.error(err.stack);
        body.message = statuses[status];

        res.json(body);
        return;
    }

    // Client errors
    body.message = err.message;

    if (err.code) body.code = err.code;
    if (err.name) body.name = err.name;
    if (err.type) body.type = err.type;

    res.json(body);
};

module.exports = errorHandler;
