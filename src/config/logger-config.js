import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs.log" }),
    ],
    prettyPrint,
});

export default logger;
