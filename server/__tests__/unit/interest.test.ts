import { describe, expect, test, beforeEach, afterEach, it, beforeAll } from "vitest";
import { vi, } from 'vitest'
import storeInterestData from "@/server/controller/handleuserInterestData";
import { getMockReq, getMockRes } from 'vitest-mock-express'
import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from "jsonwebtoken";
import isAuthenticated from "@/server/Middlware/isAuth";


const  SECRET_KEY=  process.env.SECRET_KEY as string

const tokenKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
interface AuthenticatedRequest extends Request{
  user?: any, 

}


// Mocking the token to create an effect of decoding to return the encoded user information

  




// need to call a mockfucntion


describe("POST /api/userInterest", () => {
 
  beforeAll( () => {
    console.log('hello');
    const  SECRET_KEY=  process.env.SECRET_KEY as string

  vi.mock(import('jsonwebtoken',  ), async(importOriginal) => {
      
      const JwtPayload = await importOriginal()
      const mockImplent = vi.fn().mockImplementation((token: string , SECRET: string) => {
        console.log("Mock verify called"); 
        if(token === tokenKey && SECRET === SECRET_KEY ){
          return {
            userId: "caro1"
          }      
        }
        throw new Error("Invalid Tokenn")
      })
      console.log("MockImplement Data", JwtPayload);
      // const jwt = await import('jsonwebtoken');
       return {
        ...JwtPayload,
        verify: mockImplent}
      })
})

afterEach(() => {
  vi.restoreAllMocks(); // Restore all mocks to their original state
});
  
  // Creating a MockRequest which uses vitest-mock-express Express to handle the Authentification 
  // request and passes a req.body containing and userId, token, and pickedInterestData

  const mockRequest = getMockReq<AuthenticatedRequest>({
    
    body: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      secret: SECRET_KEY,
      pickedInterest: ["time", "Movie", "Festival"]
    }
  })
// Creating a Mock Response


  const {res: mockResponse} =  getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
 })

 afterEach(() => {
  vi.restoreAllMocks();
});

  
  it("acces the handler Function with JWT token",async () => {
    //  await  storeInterestData(mockRequest , mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    

      // expect(mockResponse.sendStatusCode).toEqual(200)
      expect(mockResponse.json).toHaveBeenCalledWith({message: "connected"})


  })


});
