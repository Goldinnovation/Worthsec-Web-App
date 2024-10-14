import {
    describe,
    expect,
    test,
    beforeEach,
    afterEach,
    it,
    beforeAll,
  } from "vitest";
  import { vi } from "vitest";
  import userGetCategoryEvent from "@/server/controller/handleEventCategoryReq";
  import { getMockReq, getMockRes } from "vitest-mock-express";
  import { Request, Response } from "express";
  import prisma from "../../libs/__mocks__/prisma";
  
  interface AuthenticatedRequest extends Request {
    user?: any;
  }
  
  // mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma 
  vi.mock("../../libs/prisma", async () => {
   
    const actual = await vi.importActual<
      typeof import("../../libs/__mocks__/prisma")
    >("../../libs/__mocks__/prisma");
    // console.log(actual);
    return {
      ...actual,
      default: {
        event: {
          findMany: vi.fn().mockResolvedValue,
        },
      },
    };
  });

  const mockedprismaResponse = [{
    eventId: "212",
    eventHost: "dsd",
    eventHostName: "dsdssd",
    eventTitle: "dsdfdsf",
    eventDate:  new Date(),
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
  
  // Created the Mock request data
  const mockRequest = getMockReq<AuthenticatedRequest>({
    user: {
        decodedUserId: "sdfsdfops",
    },
    body: {
        cateogory: "kudssio",
    }
  });
  
  // Mock Response Data
  const { res: mockResponse} = getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  });

  beforeEach(() => {
    // Reset the mocks before each test
 
    prisma.event.findMany.mockClear();
  });

  
  it("should store the event Id that user selected as joined", async () => {
  
  
    await prisma.event.findMany.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance
  
   await userGetCategoryEvent(mockRequest, mockResponse)
  
    expect(mockResponse.status).toHaveBeenCalledWith(200); 
    expect(mockResponse.json).toBeTypeOf("function")
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    // expect(mockResponse.json).toHaveBeenCalledWith(mockedprismaResponse)
    // expect(mockResponse.json).([...mockedprismaResponse])
    // console.log(typeof )

  });
  