import * as dotenv from "dotenv";
import { Server } from "./infra/Server";
import { ConsoleLogger, LogLevelFromString } from "./infra/ConsoleLogger";

dotenv.config();
const staticPath = process.env["STATIC_PATH"] || "./static";
const port = Number.parseInt(process.env["PORT"] || "3000");
const logLevel = LogLevelFromString(process.env["LOG_LEVEL"] || "Info");

const config = {
    staticPath
};

const logger = new ConsoleLogger(logLevel);
const deps = {
    logger
};

const server = new Server(config, deps);
server.startAsync(port).then();