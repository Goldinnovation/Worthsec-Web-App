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




const request = supertest(index);

describe('API Integration Tests', () => {


    beforeAll(async () => {
      await prisma.$connect(); 
    });

    // Clean up after all tests
    afterAll(async () => {
      await prisma.$disconnect(); // Disconnect Prisma after tests
    });

  const mockRequest = getMockReq<AuthenticatedRequest>({
    decodedUserId: "sdfsdfops",
    favoreventId: "kudssio",

  });

  it('should retunr an error status code of 400 ', async () => {

    const response = await request.post('/api/favorEventMobile')
      .send(mockRequest)

    expect(response.status).toBe(400);
  });



});
