const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.set("Location", "https://liannus.github.io/Skillhub/");
    res.status(302);
    res.end();
});

const port = app.get("port") || 5000;
const server = app.listen(port);

server.on("listening", () => {
    console.log(`Application started on port ${port}`);
});
