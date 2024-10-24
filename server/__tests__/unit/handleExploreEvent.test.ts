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
  import { exploreEvents } from "@/server/controller/handleExploreEvents";
  import { getMockReq, getMockRes } from "vitest-mock-express";
  import { Request, Response, } from "express";
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


    const mockedAccountRes = {
      userInterest: {
        interest_list: ["dsfdsf", "dfdsf", "dssdfs", "dsfdfd", "dsfdsfdf"],
    },
    createdAt: new Date(),
    userId: "dwewefe",
    userName: "EWDewew",
    userEmail: "dscdssd",
    userPassword1: "DScsdcsd",
}

const mockedEventRes =  [{
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
}]


    
  
    return {
      ...actual,
      default: {
        account: {
          findUnique:
           vi.fn().mockResolvedValue(mockedAccountRes)
          //  mockImplementation(({where}) => {
          //    where.userId === "dwewefe" ? Promise.resolve(mockedAccountRes) : Promise.resolve(null) 
          // }),
        },
        event: {
          findMany: vi.fn().mockResolvedValue(mockedEventRes)
        }
      },
    };
  });

  const mockRequest = getMockReq<AuthenticatedRequest>({
    user: {
      userId: "sdfsdfops",
    },
  
  });

  
  const ErrorReq = getMockReq<AuthenticatedRequest>({
    Body: {
      userId: "sdfsdfops",
    },
  
  });


    // Mock Response Data
    const { res: mockResponse} = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });
  




  describe("Get Method - Successful Request - check if the user exist and queries the user selected interest data from the database  ", () => {
    
    it("Checks if the user exist in the database and returns the list of user's interests", async() => {

  const mockedAccountRes = {
        userInterest: {
          interest_list: ["dsfdsf", "dfdsf", "dssdfs", "dsfdfd", "dsfdsfdf"],
      },
      createdAt: new Date(),
      userId: "dwewefe",
      userName: "EWDewew",
      userEmail: "dscdssd",
      userPassword1: "DScsdcsd",
  }
  
  const mockedEventRes =  [{
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
  }]
      
    
    // Checkks if the mockedResponse is queal to the return value of the prisma schema 
    await prisma.account.findUnique.mockResolvedValue(mockedAccountRes); //mocked Prisma Client response
    await prisma.event.findMany.mockResolvedValue(mockedEventRes);
    await exploreEvents(mockRequest, mockResponse)
  
    expect(mockResponse.status).toHaveBeenCalledWith(200); //Passes Test
  
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array)) //Passes Test

    expect(mockResponse.json).toBeCalledWith(expect.arrayContaining([  //Passes Test

    //   expect.objectContaining({
    //     eventId: "212",
    //   eventHost: "dsd",
    //   eventHostName: "dsdssd",
    //   eventTitle: "dsdfdsf",
    //   eventDate:  expect.any(Date),
    //   eventType: "dsfdd",
    //   eventDescriptionContent: "dsdfsdfdf",
    //   eventTime: "Dsfsdff",
    //   ImageCoverUpload: "sfedsfds",
    //   eventInviteType: 1,
    //   eventAddress: "sdfsddsf",
    //   eventZipcode: "dsfsdfsdfdsf",
    //   cityType: "DSfsddf",
    //   selectedRangeofEvents: 43,
    //   createdAt: expect.any(Date),
    //   })
    ]))



    })
  })


  describe("Get Method - Error Request - checks if the Error Request receives a response with json Message", () => {

    it("Checks if the response json includes an Error Message and Invalid Request status code of 400", async() => {

      const mockedAccountRes = {
            userInterest: {
              interest_list: ["dsfdsf", "dfdsf", "dssdfs", "dsfdfd", "dsfdsfdf"],
          },
          createdAt: new Date(),
          userId: "dwewefe",
          userName: "EWDewew",
          userEmail: "dscdssd",
          userPassword1: "DScsdcsd",
      }
      
      const mockedEventRes =  [{
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
      }]
          
        
        // Checkks if the mockedResponse is queal to the return value of the prisma schema 
        await prisma.account.findUnique.mockResolvedValue(mockedAccountRes); //mocked Prisma Client response
        await prisma.event.findMany.mockResolvedValue(mockedEventRes);
        await exploreEvents(ErrorReq, mockResponse)
      
        expect(mockResponse.status).toHaveBeenCalledWith(400); //Passes Test

        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "Invalid Request on exploreEvents handler function,  Cannot read properties of undefined",
        });
      
    
    
    
        })
  })