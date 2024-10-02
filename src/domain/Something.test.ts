import assert from "node:assert";
import { describe, it } from "node:test";

describe("do nothing", () => {
    it("does nothing", () => {
      assert.strictEqual(false, !true);
    });
});