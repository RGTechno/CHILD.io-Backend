const express = require("express");
const { json } = require("express");
const { ServerConfig } = require("./config/index.js");
const apiRoutes = require("./routes/routes.js");

const app = express();

app.use(json());
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(
        `Successfully started the server on PORT : ${ServerConfig.PORT}`
    );
});
