import express from "express";

import { ServerConfig } from "./config/config.js";

const app = express();

app.listen(ServerConfig.PORT, () => {
    console.log(
        `Successfully started the server on PORT : ${ServerConfig.PORT}`
    );
});
