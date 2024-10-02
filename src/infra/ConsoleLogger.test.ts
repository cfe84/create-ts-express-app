import assert from "node:assert";
import { describe, it } from "node:test";
import { LogLevel, LogLevelFromString } from "./ConsoleLogger";

describe("ConsoleLogger", () => {
    describe("LogLevelFromString", () => {
        const testCases = [
            { input: "debug", expected: LogLevel.Debug },
            { input: "deBug", expected: LogLevel.Debug },
            { input: "info", expected: LogLevel.Info },
            { input: "warn", expected: LogLevel.Warning },
            { input: "Warning", expected: LogLevel.Warning },
            { input: "Err", expected: LogLevel.Error },
            { input: "Error", expected: LogLevel.Error },
        ];
        testCases.forEach(testCase => {
            it(`Converts ${testCase.input}`, () => {
                const actual = LogLevelFromString(testCase.input);
                assert.equal(actual, testCase.expected, `Conversion of ${testCase.input} failed`);    
            });
        })
    });
});