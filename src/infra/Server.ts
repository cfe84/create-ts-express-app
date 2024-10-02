import express from "express";
import { ILogger } from "../domain/ILogger";

export interface ServerConfig {
    staticPath: string;
}

export interface ServerDependencies {
    logger: ILogger;
}

export class Server {
    private app: express.Express;
    constructor(config: ServerConfig, deps: ServerDependencies) {
        this.app = express();
        this.app.use(express.static(config.staticPath));
        this.app.get("/api/something", this.getSomething.bind(this));
    }

    getSomething(req: express.Request, res: express.Response) {
        res.json({message: "Hello world"});
    }

    startAsync(port: number): Promise<void> {
        return new Promise(resolve => this.app.listen(port, () => resolve()));
    }
}