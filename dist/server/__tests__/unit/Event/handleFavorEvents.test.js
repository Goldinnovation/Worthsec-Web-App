import { describe, expect, it, } from "vitest";
import { vi } from "vitest";
import { getMockReq, getMockRes } from "vitest-mock-express";
import prisma from "../../../libs/__mocks__/prisma";
// import * as  handlesUserFriendsInterest from "@/server/controller/Event/handleExploreEvents";
import { getEventDetails } from "@/server/controller/Event/handleFavorEvent";
// mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma 
vi.mock("../../../libs/prisma", async () => {
    const actual = await vi.importActual("../../../libs/__mocks__/prisma");
    // console.log(actual);
    const mockedprismaResponse = [{
            eventId: "212",
            eventHost: "dsd",
            eventHostName: "dsdssd",
            eventTitle: "dsdfdsf",
            eventDate: new Date(),
            eventType: "dsfdd",
            eventDescriptionContent: "dsdfsdfdf",
            eventTime: "Dsfsdff",
            ImageCoverUpload: "sfedsfds",
            eventInviteType: 1,
            eventAddress: "sdfsddsf",
            eventZipcode: "dsfsdfsdfdsf",
            cityType: "DSfsddf",
            selectedRangeofEvents: 43,
            createdAt: new Date(),
        }];
    const mockedResponse = {
        currentUser_id: "sdfsdfopsd",
        event_id: "sdsdfsd",
        createdAt: new Date(),
        favourId: "1",
    };
    return {
        ...actual,
        default: {
            userFavourEvent: {
                create: vi.fn().mockResolvedValue,
                findMany: vi.fn().mockResolvedValue(mockedResponse)
            },
            event: {
                findMany: vi.fn().mockResolvedValue(mockedprismaResponse)
            }
        },
    };
});
// Created the Mock request data
const mockRequest = getMockReq({
    decodedUserId: "sdfsdfops",
    body: {
        favoreventId: "kudssio",
    }
});
describe("Post Method - Successful Request on getEventDetails function - should get event details ", () => {
    it("should get event details ", async () => {
        const { res: mockResponse } = getMockRes({
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        });
        const mockRequest = getMockReq({
            decodedUserId: "sdfsdfops",
            body: {
                favoreventId: "kudssio",
            }
        });
        const mockedprismaReq = [{
                eventId: "212",
                eventHost: "dsd",
                eventHostName: "dsdssd",
                eventTitle: "dsdfdsf",
                eventDate: new Date(),
                eventType: "dsfdd",
                eventDescriptionContent: "dsdfsdfdf",
                eventTime: "Dsfsdff",
                ImageCoverUpload: "sfedsfds",
                eventInviteType: 1,
                eventAddress: "sdfsddsf",
                eventZipcode: "dsfsdfsdfdsf",
                cityType: "DSfsddf",
                selectedRangeofEvents: 43,
                createdAt: new Date(),
            }];
        await prisma.event.findMany.mockResolvedValue(mockedprismaReq); //mocked Prisma Client instance
        await getEventDetails(mockedprismaReq, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toBeTypeOf("function");
        expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
        expect(mockResponse.json).toBeCalledWith(expect.arrayContaining([]));
    });
});
