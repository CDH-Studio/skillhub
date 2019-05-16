const {service: usersService} = require("./users");

// eslint-disable-next-line no-unused-vars
const services = (app) => {
    app.configure(usersService);
};

module.exports = {
    services
};
