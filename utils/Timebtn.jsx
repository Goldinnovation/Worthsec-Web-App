import React from 'react'
import Image from 'next/image'
import TimeLineIcon from '@assets/Timeicon.png'


const TimeLayer = () => {
  return (
    <div>
       <button className='Timeline-btn'><Image src={TimeLineIcon} height={24} width={24}/></button>
    </div>
  )
}

export default TimeLayer
