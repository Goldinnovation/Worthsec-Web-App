import { describe, expect, it, } from "vitest";
import { vi } from "vitest";
import updatetoNewEventData from "@/server/controller/Event/handleUpdateToNewExploreData";
import { getMockReq, getMockRes } from "vitest-mock-express";
vi.mock("../../../../libs/prisma", async () => {
    const actual = await vi.importActual("../../../../libs/__mocks__/prisma");
    return {
        ...actual,
        default: {
            event: {
                findMany: vi.fn().mockImplementation(() => {
                    throw new Error("Internal Server Error");
                })
            },
        },
    };
});
const { res: serverResponse } = getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
});
describe("Post method - Error Request ", () => {
    it("Should receive an incomplete list of event IDs and return an 'Invalid Request' error with a status code of 400", async () => {
        const ErrorRequest = getMockReq({
            decodedUserId: "sdfsdfops",
            body: {
                EventDataId: ["time", "Movie", "Festival", "Movie", "Techno"]
            }
        });
        await updatetoNewEventData(ErrorRequest, serverResponse);
        expect(serverResponse.status).toHaveBeenCalledWith(400);
        expect(serverResponse.json).toHaveBeenCalledWith({
            message: "Invalid Request: eventId length does not match the requirements",
        });
    });
    it("Should receive a bad request where the user ID is missing and return an 'Invalid Request' error with a status code of 400", async () => {
        const ErrorRequest = getMockReq({
            body: {
                EventDataId: ["time", "Movie", "Festival", "Movie", "Techno"]
            }
        });
        await updatetoNewEventData(ErrorRequest, serverResponse);
        expect(serverResponse.status).toHaveBeenCalledWith(400);
        expect(serverResponse.json).toHaveBeenCalledWith({
            message: "Invalid Request, userId does not exist",
        });
    });
    it("Should simulate an error in the database and respond with an error message and a status code of 500", async () => {
        const eventList = Array.from({ length: 24 }, (_, index) => {
            return `data`;
        });
        const ErrorRequest = getMockReq({
            decodedUserId: "sdfsdfops",
            body: {
                EventDataId: eventList
            }
        });
        await updatetoNewEventData(ErrorRequest, serverResponse);
        expect(serverResponse.status).toHaveBeenCalledWith(500);
        expect(serverResponse.json).toHaveBeenCalledWith({
            message: "Internal Server Error",
        });
    });
});
