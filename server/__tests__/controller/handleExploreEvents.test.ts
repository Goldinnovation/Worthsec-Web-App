import server from "../../app";
import { describe, expect, test, beforeEach, afterEach, it } from "vitest";
import supertest, { SuperTest, Test } from "supertest";
import nock from "nock";
import app from "../../index";

// calling multiple events that user might be interested in
//should get a list of selected interests from the account table with the help of an inner join from userInterest table
//should respond with a json object containing the list of events
// Should respond with a 404 status code

describe("POST /api/userInterest", () => {
  test("should access endpoint", async () => {
    const response = await supertest(app)
      .post("/api/userInterest")
      .set("Content-Type", "application/json");

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual({ message: "connected" });
  });
});
