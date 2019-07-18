const {createLogger, format, transports} = require("winston");

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
    // To see more detailed errors, change this to "debug"
    level: "info",
    format: format.combine(
        format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        format.splat(),
        format.json(),
        format.simple()
    ),
    defaultMeta: {service: "skillhub-scraper"},
    transports: [
        new transports.Console()
    ],
    exceptionHandlers: [
        new transports.Console()
    ]
});

module.exports = logger;
