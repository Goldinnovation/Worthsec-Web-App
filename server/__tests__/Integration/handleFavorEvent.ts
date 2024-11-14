import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest'; // For making HTTP requests to the API
import index from '@/server';
import prisma from "../../libs/__mocks__/prisma";
import { getMockReq, getMockRes } from "vitest-mock-express";
import { Request, Response } from "express";
import { vi } from "vitest";


interface AuthenticatedRequest extends Request {
  user?: any;
}



vi.mock("../../libs/prisma", async () => {
  const actual = await vi.importActual<
    typeof import("../../libs/__mocks__/prisma")
  >("../../libs/__mocks__/prisma");
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
  }]

  const mockedResponse = {
    currentUser_id: "sdfsdfopsd",
    event_id: "sdsdfsd",
    createdAt: new Date(),
    favourId: "1",
  }
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



const request = supertest(index);

describe('API Integration Tests', () => {


  //   beforeAll(async () => {
  //     await prisma.$connect(); 
  //   });

  //   // Clean up after all tests
  //   afterAll(async () => {
  //     await prisma.$disconnect(); // Disconnect Prisma after tests
  //   });

  const mockRequest = getMockReq<AuthenticatedRequest>({
    decodedUserId: "sdfsdfops",
    favoreventId: "kudssio",

  });

  it('should retunr an error status code of 400 ', async () => {

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
    }]

    await prisma.event.findMany.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance

    const response = await request.post('/api/favorEventMobile')
      .send(mockRequest)

    expect(response.status).toBe(400);
  });



});
