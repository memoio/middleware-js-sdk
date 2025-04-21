/* eslint-disable no-undef */
import { Challenge } from "./server.js";

describe("Challenge", () => {
  test("should return the challenge message", async () => {
    const address = "0x2Dc689e597fA3545F0c5f6aF2f4c1De2d334C8EC";
    const chainID = 985;
    const uri = "http://localhost:8081";
    const domain = "https://memo.io";

    const result = await Challenge(uri, address, chainID, domain);

    expect(result).toEqual("Your expected challenge message");
  });

  test("should handle error", async () => {
    const address = "0x2Dc689e597fA3545F0c5f6aF2f4c1De2d334C8EC";
    const chainID = 985;
    const uri = "http://localhost:8081";
    const domain = "https://memo.io";

    try {
      await Challenge(uri, address, chainID, domain);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toBe("Your expected error message");
    }
  });
});
