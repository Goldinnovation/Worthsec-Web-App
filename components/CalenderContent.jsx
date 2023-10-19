'use client'
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import style from '@styles/day-picker.module.css'
import { set } from 'date-fns';



export const getData = async() => {
  try{
    const res = await fetch('http://localhost:3000/api/events', {
        method: 'GET',
        cache: 'no-store'
    })

    if(!res.ok){
        
     throw new Error('res IS NOT OK,ERROR')
    
    }


    const data =  await res.json()
    
    return data 

  }catch(error){
    console.error('Fetch Problem')
    return[]
  }
}

// fetches the date and image name and displays it inside the specfic calender areas 



const CalenderContent = () => {
    
  
    const [selectedDateandImage, setselectedDateandImage] = useState([])
   

    
    
    useEffect(() => {
        const newData = async() => {
            const allEvents =  await getData();
        
            const ImagewithDates = allEvents.map(event => ({
                date: new Date(event.eventDate),
                image: event.ImageCoverUpload
            }))

            setselectedDateandImage(ImagewithDates)
           
            
        }
        
       
         newData();
         const intervalId = setInterval(newData, 2000)
         return () => clearInterval(intervalId)

    }, []);

    const modifiers = {
        selected: selectedDateandImage.map(event => event.date)
    };


    const generateDynamicStyles = () => {
        
        let styles = '';
        selectedDateandImage.forEach(event => {
            const dateString = event.date.toISOString().split('T')[0]; 

   
           

            styles += `

            @media screen and (max-width:2000px){
                .rdp-day_selected {
                    background: url('/${event.image}') !important;
                    background-size: cover !important; 
                    height: 60px !important;
                    width: 60% !important;
                    border-radius: 10%;
                }
            }
            
            @media screen and (min-width:2000px){
                .rdp-day_selected {
                    background: url('/${event.image}') !important;
                    background-size: cover !important; 
                    height: 90px !important;
                    width: 70% !important;
                    border-radius: 10%;
                }
            }
           

            `;
        });
        return styles;
    };


    const generatedStyles = generateDynamicStyles();
  
   


   

    return (
        <div>

           

            
            <style>{generatedStyles}</style>
            <DayPicker
                id="EventCalender"
                // onSelect={(range)=>{console.log(range)}}
                numberOfMonths={2}
                showOutsideDays
                weekStartsOn={1}
                modifiers={modifiers}
                modifiersClassNames={{
                    selected: style.selectedImage,
                    

                }}
                
                styles={{

                   
                  
 
                    day_Hover: {
                        color: 'black',
                    },
                   
                    day: {
                        margin: "auto",
                        color: "white",
                    },

                    row: {
                        height: '100px',
                        margin: '10px',
                        // backgroundColor: 'orange'
                    },
                    cell: {
                       
                        border: '1px solid white',
                       
                    }
                }}
            />
        </div>
    )
}

export default CalenderContent;
