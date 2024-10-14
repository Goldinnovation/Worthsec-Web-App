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
  import userJoinEvent from "@/server/controller/handleJoinEvents";
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
        userJoinEvent: {
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
        joinEventId: "kudssio",
    }
  });
  
  // Mock Response Data
  const { res: mockResponse} = getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  });
  
  it("should store the event Id that user selected as joined", async () => {
    const mockedprismaResponse = {
        user_id: "sdfsdfopsd",
        event_id: "sdsdfsd",
        createdAt: new Date(),
        joinId : "1", // Simulate generated ID
    };
  
    await prisma.userJoinEvent.create.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance
  
    await userJoinEvent(mockRequest, mockResponse)
  
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "user successfully Join a event" ,
    });
  });
  