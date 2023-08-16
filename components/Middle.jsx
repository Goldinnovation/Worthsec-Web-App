'use client'
import React from 'react'
import { useState } from 'react'


const Middle = () => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState(null)


   


    const handleSubmit = async(e) => {
        e.preventDefault(); 
    
        try {
            const res = await fetch('http://localhost:3000/api/prompt', {
                method: 'POST', 
                body: JSON.stringify({ question })
            });
            
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
    
            const newData = await res.json();
    
            // Check if the necessary fields are present in the response
            if (newData.body && newData.body.data && newData.body.data.choices && newData.body.data.choices[0]) {
                setAnswer(newData.body.data.choices[0].text.trim()); // The trim() removes leading and trailing whitespaces
                setQuestion(''); // clears the input field after getting the answer
            } else {
                setAnswer('Unexpected response format.');
            }
            
        } catch (error) {
            console.error('There is an error in the request:', error);
            setAnswer('Sorry, I could not fetch the answer');
        }   
    }
    

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" className="userPrompt" value = {question} onChange={(e) => setQuestion(e.target.value)} placeholder='Please enter the question'/>
        <button type='submit'>submit</button>
      </form>

      <div>
        <p>Answer:{answer}</p>
      </div>
      
    </div>
  )
}

export default Middle
