import { ILogger } from "../domain/ILogger";

export enum LogLevel {
    Debug = 1,
    Info = 2,
    Warning = 3,
    Error = 4, 
}

export function LogLevelFromString(str: string): LogLevel {
    switch(str.toLowerCase()) {
        case "debug": return LogLevel.Debug;
        case "information":
        case "info": return LogLevel.Info;
        case "warn":
        case "warning": return LogLevel.Warning;
        case "err":
        case "error": return LogLevel.Error;
        default: return LogLevel.Info;
    }
}

export class ConsoleLogger implements ILogger {
    constructor(private logLevel: LogLevel) {}

    debug(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel <= LogLevel.Debug) {
            console.debug(message, ...optionalParams);
        }
    }
    info(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel <= LogLevel.Info) {
            console.info(message, ...optionalParams);
        }
    }
    warning(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel <= LogLevel.Warning) {
            console.warn(message, ...optionalParams);
        }
    }
    error(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel <= LogLevel.Error) {
            console.error(message, ...optionalParams);
        }
    }

}