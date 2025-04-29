import React from "react";


export async function LoginAPI(email, password) {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content-type to JSON
          },
  
          body: JSON.stringify({
            loginEmail: email,
            loginPassword: password,
          }),
        });
       
        return res
      } catch (error) {
        console.error("fetch error on LoginAPI", error);
      }
}