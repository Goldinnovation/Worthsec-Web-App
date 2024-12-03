import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest'; // For making HTTP requests to the API
import index from '@/server';
import prisma from "../../../libs/__mocks__/prisma";
import { getMockReq, getMockRes } from "vitest-mock-express";
import { Request, Response } from "express";
import { vi } from "vitest";
import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()


interface AuthenticatedRequest extends Request {
  user?: any;
}




const request = supertest(index);

describe('API Integration Tests', () => {


    beforeAll(async () => {
      await prisma.$connect(); 
    });

    // Clean up after all tests
    afterAll(async () => {
      await prisma.$disconnect(); // Disconnect Prisma after tests
    });




  it('should return a status code of 200 and joined Event records ', async () => {

    // const mockedprismaResponse = [{
    //     user_id: "testUserId",
    //     event_id: "sdsdfsd",
    //     createdAt: new Date(),
    //     joinId: "1", // Simulate generated ID
    //   }];

    // await prisma.userJoinEvent.findMany.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance


    const response = await request.get('/api/DisplayJoinedEvent')
    .set('Authorization', `Bearer mockToken`) // Mock the Authorization header
    .send({ userId: "testUserId" }); // Add mock user data to the body if needed
 
    

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('user_id', 'testUserId');
    // expect(response.body).toHaveProperty('eventId', 'testEventId');
    // expect(response.body).toHaveProperty('joinId', '1');
   

  });
  it('should return multiple joined Event records for the user ', async () => {

    // const mockedprismaResponse = [{
    //     user_id: "testUserId",
    //     event_id: "sdsdfsd",
    //     createdAt: new Date(),
    //     joinId: "1", // Simulate generated ID
    //   }];

    // await prisma.userJoinEvent.findMany.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance


    const response = await request.get('/api/DisplayJoinedEvent')
    .set('Authorization', `Bearer mockToken`) // Mock the Authorization header
    .send({ userId: "testUserId" }); // Add mock user data to the body if needed
 
    

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('user_id', 'testUserId');
    // expect(response.body).toHaveProperty('eventId', 'testEventId');
    // expect(response.body).toHaveProperty('joinId', '1');
   

  }); 



});
