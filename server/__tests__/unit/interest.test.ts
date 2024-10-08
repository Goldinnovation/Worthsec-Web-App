import { describe, expect, test, beforeEach, afterEach, it, beforeAll } from "vitest";
import { vi, } from 'vitest'
import storeInterestData from "@/server/controller/handleuserInterestData";
import { getMockReq, getMockRes } from 'vitest-mock-express'
import { Request, Response } from "express";
// import Mockprisma from "@/server/libs/__mocks__/prisma";
import libs from "../../libs/prisma"
// import prisma from "../../libs/prisma";
import serverTest from "../../controller/handleuserInterestData"
import prisma from "../../libs/__mocks__/prisma"


const  SECRET_KEY=  process.env.SECRET_KEY as string

const tokenKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
interface AuthenticatedRequest extends Request{
  user?: any, 

}


// Mocking the token to create an effect of decoding to return the encoded user information


vi.mock("../../libs/prisma", async(importOriginal) => {
  return{
    ...await importOriginal<typeof import('../../libs/prisma')>(),
  }
});


// Created the Mock request data
  const mockRequest = getMockReq<AuthenticatedRequest>({
    decodedUserId:  "sdfsdfops", 
    userSelectedInterests: ["time", "Movie", "Festival"], 
  })

  // Mock Response Data
  const {res: mockResponse} =  getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  })
  


  it("storeUserSelectedInterestData should return generated stored data row with list of interest ",async () => {
  


    const mockStoredData = {
      user_interest_id: "sdfsdfopsd",
      interest_list: ["time", "Movie", "Festival"],
      IntersetId: "some-generated-id",
      id: 1, // Simulate generated ID
    };

   const callofMock = prisma.userInterest.create.mockResolvedValue(mockStoredData)
  //  console.log(callofMock);
    // const storeData = await storeInterestData(mockRequest, mockResponse)
    // console.log("StoredData:",storeData);
    

 })



