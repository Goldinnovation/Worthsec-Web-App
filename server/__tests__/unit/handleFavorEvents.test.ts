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
  import { userFavourEvent } from "@/server/controller/handleFavorEvent";
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
        userFavourEvent: {
          create: vi.fn().mockResolvedValue,
        },
      },
    };
  });
  
  // Created the Mock request data
  const mockRequest = getMockReq<AuthenticatedRequest>({
    user: {
      userId: "sdfsdfops",
    },
    body: {
      favoreventId: "kudssio",
    }
  });
  
  // Mock Response Data
  const { res: mockResponse} = getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  });
  
  it("should store the event Id that user selected as favored", async () => {
    const mockedprismaResponse = {
        currentUser_id: "sdfsdfopsd",
        event_id: "sdsdfsd",
        createdAt: new Date(),
        favourId : "1", // Simulate generated ID
    };
  
    await prisma.userFavourEvent.create.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance
  
    await userFavourEvent(mockRequest, mockResponse)
  
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "user successfully favored a event",
    });
  });
  