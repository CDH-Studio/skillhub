const combineMiddleware = (middlewares) => (
    middlewares.reduce((acc, middleware) => (
        (req, res, next) => {
            acc(req, res, (err) => {
                if (err) {
                    return next(err);
                }

                middleware(req, res, next);
            });
        }
    ))
);

module.exports = combineMiddleware;
