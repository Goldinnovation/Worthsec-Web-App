
// data.js
const dictionary = [
    {
      id: 1,
      url: "https://www.amazon.de/Die-Mitternachtsbibliothek-SPIEGEL-Bestseller-Taschenbuch/dp/3426308258/ref=sr_1_3?keywords=Romane+Bestseller&qid=1692290527&s=books&sr=1-3",
      image: "https://m.media-amazon.com/images/I/71Ezvjb4yLL.jpg",
    },
    {
      id: 2,
      url: "https://www.amazon.de/Gesang-Flusskrebse-Bestseller-Taschenbuch-Zauberhaft/dp/3453424018/ref=sr_1_5?keywords=Romane+Bestseller&qid=1692290527&s=books&sr=1-5",
      image: "https://d1b14unh5d6w7g.cloudfront.net/3453424018.01.S001.JUMBOXXX.jpg?Expires=1692376994&Signature=YOVzLWqoXhIFRV1NWZqlnrVnoV5vSufCjr3Q~nHMZrGSF-z7TxEFGpj2MdptgLAGTPwYn-cwpt5kklV07~SzTuTWWJYHuGDKA322igI8P-AoN1sDHC9pcsLJIvjMDDE5y4c1q9eXG7PT2Axk20bB2yF8YYri~LcvOIhhZuXzbYI_&Key-Pair-Id=APKAIUO27P366FGALUMQ"
    },
    
    {
        id: 3,
        url: "https://www.amazon.de/Gespr%C3%A4che-mit-Gott-ungew%C3%B6hnlicher-Dialog/dp/3442217865/ref=pd_bxgy_img_sccl_1/259-5535510-7329060?pd_rd_w=atp8E&content-id=amzn1.sym.1fd66f59-86e9-493d-ae93-3b66d16d3ee0&pf_rd_p=1fd66f59-86e9-493d-ae93-3b66d16d3ee0&pf_rd_r=DG2P02XS1H2QWDAN1PWW&pd_rd_wg=yAXKo&pd_rd_r=e59c50b6-7e5c-4beb-8ceb-54ceb2349071&pd_rd_i=3442217865&psc=1",
        image: "https://m.media-amazon.com/images/P/3442217865.01._SCLZZZZZZZ_SX500_.jpg",
      },
      {
        id: 4,
        url: "https://www.amazon.de/Gl%C3%BCcklicher-als-Gott-Verwandle-au%C3%9Fergew%C3%B6hnliche/dp/3899011643/ref=d_bmx_dp_h86ffsto_sccl_2_3/259-5535510-7329060?pd_rd_w=7IBPE&content-id=amzn1.sym.ba4f6a0a-de5c-4b7e-a504-3f2e1bc19383&pf_rd_p=ba4f6a0a-de5c-4b7e-a504-3f2e1bc19383&pf_rd_r=4BWQEPAT5V1NM4ZJ4486&pd_rd_wg=WOxvc&pd_rd_r=b0280c61-81af-4169-b4cc-c2ed3ad6c27d&pd_rd_i=3899011643&psc=1",
        image: "https://d1b14unh5d6w7g.cloudfront.net/3442164435.01.S001.JUMBOXXX.jpg?Expires=1692377209&Signature=E5XszWNJwUvSlrNYl-I5NH5HW2Qq66ERecjLHCYMUSnK9tJwxiYuBAYHvrHjtH6bcMB~26oXs1AEa7fYkKzeYq1x6LtdHpeZTqGsBoLrcwLg874lZJRFWVpsNQfO1pu~OMRMnpO2zw6fo2X~kGqvcCfV5aty8r1NqPBgmefNyDU_&Key-Pair-Id=APKAIUO27P366FGALUMQ"
      },
      {
        id: 5,
        url: "https://www.amazon.de/EAST-Auf-tiefem-Grund-Durchbruch/dp/3423218681/ref=sr_1_1_sspa?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SR7FH542HWX&keywords=krimi+roman&qid=1692292048&sprefix=chrimi+romane%2Caps%2C113&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        image: "https://d1b14unh5d6w7g.cloudfront.net/3423218681.01.S001.JUMBOXXX.jpg?Expires=1692378454&Signature=RcODEKYYvo8BZarwoSJYruAm1dv1O34eUBUdtJ23IW33gllK1u9aao6tVK0rhIRmUAm20O2umE~9MR60CqBi4jGvCdjlUGR42y1kUAM2wb6s3rmPDJVdcOrX~EmsicvbOksbcotRn4R0vnsYemaC0xJHcPXcESSDwfpdtl3qwXI_&Key-Pair-Id=APKAIUO27P366FGALUMQ",
      },
      {
        id: 6,
        url: "https://www.amazon.de/letzte-Spur-Kriminalroman-Charlotte-Link/dp/3442383714/ref=sr_1_4?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SR7FH542HWX&keywords=krimi+roman&qid=1692292116&sprefix=chrimi+romane%2Caps%2C113&sr=8-4",
        image: "https://d1b14unh5d6w7g.cloudfront.net/3442383714.01.S001.JUMBOXXX.jpg?Expires=1692378525&Signature=IoFZYX7JtZpqTuN8vBAqC70lHsRgVJ~S-v2sgmlNRuP2kma~VYgmiae5IMhYv7s1rVSyOL1n~2aQrBpYr8KvAPxuPBbHbhQ8FdgiqGOmSRQ~8c9d5ywyk9Ct72lIqYPK3goRFDDNLJ5g3qdZO7qb1qgbbi1~Iw5hwDLyOaLmlB4_&Key-Pair-Id=APKAIUO27P366FGALUMQ"
      },
      {
        id: 7,
        url: "https://www.amazon.de/Die-Mitternachtsbibliothek-SPIEGEL-Bestseller-Taschenbuch/dp/3426308258/ref=sr_1_3?keywords=Romane+Bestseller&qid=1692290527&s=books&sr=1-3",
        image: "https://m.media-amazon.com/images/I/81KcNjqAE3L.jpg",
      },
      {
        id: 8,
        url: "https://www.amazon.de/kleine-Seele-Erde-Parabel-Kinder/dp/3934647928/ref=pd_bxgy_img_sccl_2/259-5535510-7329060?pd_rd_w=Mubgo&content-id=amzn1.sym.1fd66f59-86e9-493d-ae93-3b66d16d3ee0&pf_rd_p=1fd66f59-86e9-493d-ae93-3b66d16d3ee0&pf_rd_r=8T1F7HBFZ24F83MG4ZRX&pd_rd_wg=aJfNF&pd_rd_r=3d85bcf8-7df1-4604-9386-06322b742039&pd_rd_i=3934647928&psc=1",
        image: "https://m.media-amazon.com/images/P/B08ZD8BKGK.01._SCLZZZZZZZ_SX500_.jpg"
      },
      {
        id: 9,
        url: "https://www.amazon.de/Ich-bin-das-Licht-Sternenprinz/dp/3929475898/ref=d_bmx_dp_hga2qp1n_sccl_2_1/259-5535510-7329060?pd_rd_w=tE2Jb&content-id=amzn1.sym.ba4f6a0a-de5c-4b7e-a504-3f2e1bc19383&pf_rd_p=ba4f6a0a-de5c-4b7e-a504-3f2e1bc19383&pf_rd_r=2VYA3ZGMSRQJF6ASSAHV&pd_rd_wg=kDFNi&pd_rd_r=6fd0ad75-cf7c-4e70-b063-9e781da4f503&pd_rd_i=3929475898&psc=1",
        image: "https://m.media-amazon.com/images/I/81P0S3Ym3GL.jpg",
      },
   
              
  ];
  
  export default dictionary;
  