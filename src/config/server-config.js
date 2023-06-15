import { config } from "dotenv";

config();

const PORT = process.env.PORT;

export const ServerConfig = {
    PORT,
};
