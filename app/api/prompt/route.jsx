import { NextResponse } from "next/server";
import { headers } from "@next.config";


export async function GET(){
    
    return NextResponse.json({res: "succes"})
}

export async function POST(request) {
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        // console.log(body.question); // shows the input body
  
        const res = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: 'write the title and author of the results inside a square brackets:' + body.question,
            temperature: 0,  // how much randomness to inject into the text
            max_tokens: 100
          })
        });
  
        if (!res.ok) {
          throw new Error(`OpenAI API returned an error: ${res.statusText}`);
        }
  
        const resData = await res.json();
  
        // console.log('OpenAI Res:', resData);
  
        return NextResponse.json({ status: 200, body: { result: 'successful message', data: resData } });
  
      } catch (error) {
        console.error('Error:', error);
        return { status: 500, body: { error: 'Internal Server Error' } };
      }
    }
  
    return { status: 405, body: { error: 'Method Not Allowed' } };
  }
  