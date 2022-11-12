"use strict";
const app = require("./app");

const account = require("./routes/account");
const users = require("./routes/users");
const robots = require("./routes/robots");

app.use("/api/account", account);
app.use("/api/users", users);
app.use("/api/robots", robots);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
