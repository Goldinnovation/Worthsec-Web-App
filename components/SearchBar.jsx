'use client'
import React from 'react'
import { useState } from 'react'








const SearchBar = () => {

    const [tags, setTags] = useState([])


    const colorOptions = 
        [
        '#82beffdc', '#ec9532dc', '#98ff79dc', 
        '#ec90dcdc', '#11b8b8dc', '#eaff00dc', '#fe319edc', 
        '#ff3b3bdc', '#bd4002dc', 'skyblue','#82beffdc',
        '#98ff79dc', '#ec90dcdc', '#11b8b8dc', '#ec9532dc',
        '#eaff00dc', '#fe319edc', '#ff3b3bdc','#bd4002dc',
        '#6A5ACD', '#FF6347', '#40E0D0', '#FFD700', 
        '#7CFC00', '#FF4500', '#2E8B57', '#ADFF2F', 
        '#32CD32', '#FA8072', '#FFA500', '#800080',
        '#556B2F', '#FF69B4', '#CD5C5C'
        ]
       
    function getRandomColor(){
        const randomIndex = Math.floor(Math.random() * colorOptions.length)
        return colorOptions[randomIndex]

    }

    const Colors = getRandomColor();

    function handleKeyDown(e){

        // checks if the client pressed Enter to create the tag if not, no return 
        if(e.key !== 'Enter' ) return

        // get the value of the input 
        const value = e.target.value
        
        // checks if the value is empty or just a whitespace 
        if(!value.trim()) return 

        // checks if the tag array has 10 value 
        if(tags.length >= 10){
            alert('you can only add up to 10 tag')
            return 
        }

        const Colors = getRandomColor();
        // add the value to the tags array 
        setTags([...tags, {value: value, color: Colors} ])

        
        e.target.value =""
    }



    function removeTag(index){
        setTags(tags.filter((_, i) => i !== index))
    }
  return (
    <div>
         <div className="content-area">

            <div className="title-area">
                <div className="title-content">
                <h1>Trinity</h1>
                </div>
            </div>
            <div className="search-area"> 
            <input type="text" className="search-input" placeholder='Enter your inspiration' />
            <select className='Genre-Opt'>
                    <option value="0">Genre</option>
                    <option value="red">Books</option>
                    <option value="green">green</option>
                    <option value="pink">pink</option>
                    <option value="blue">blue</option>
                </select>

        </div>

        <div className="tag-container">
            {/* <div className="tag-item">
                <span className='text'>hello</span>
                <span className='close'>&times;</span>
            </div> */}

            {tags.map((tag, index) => (
                 <div className="tag-item" key={index} style={{backgroundColor: tag.color}}>
                 <span className='text'>{tag.value}</span>
                 <span className='close' onClick={() => removeTag(index)}>&times;</span>
             </div>
            ))}

            <input  onKeyDown={handleKeyDown}type="text" className="tags-input"   placeholder='Specify your search'/>
               
        </div>

        <div className="btn-area">
            <button className='submit-btn'>submit</button>
        </div>
        </div>
      
    </div>
  )
}

export default SearchBar
