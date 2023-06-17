const { config } = require("dotenv");

config();

const PORT = process.env.PORT;

exports.ServerConfig = {
    PORT,
};
