import React from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import styles from '@styles/calenderStyle.module.css'




// const css = `

// `

const CalenderContent = () => {
    const [startSelect, setStartSelect] = useState(Date)
    
   

  return (
    <div className={styles['calenderPickerStyle']}>

        {/* <style>{css}</style> */}
        <DayPicker
        mode="single"
        modifiersClassNames={styles['calenderPickerStyle']}
        
        selected={startSelect}
        onSelect={setStartSelect}
        numberOfMonths={2}
        showOutsideDays
        styles={{
            
            head_cell: {
              width: "180px",
              color: 'white',
              backgroundColor: '#c6c6c638',
              border: '1px solid white',
              marginHeight: "50px"
            },
            month:{
                color: 'white',
                fontSize: '50'
            },
            

            table: {
              maxWidth: "none",
            },
            day: {
              margin: "auto",
              color: "white"
            },

            row: {
                // backgroundColor: 'green',
                height: '110px'
                
            },

            cell: {
                // backgroundColor: 'orange',
                border: '1px solid white',
                marginTop: "50px"
                
                
                
            }

          }}
        />
      
    </div>
  )
}

export default CalenderContent
