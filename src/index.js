const express = require("express");
const cors = require("cors");
const { json } = require("express");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes/routes.js");

const app = express();

app.use(json());
app.use(cors());

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(
        `Successfully started the server on PORT : ${ServerConfig.PORT}`
    );
});
