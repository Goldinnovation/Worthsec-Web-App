import React from 'react'
import DisplayJoinEvent from './DisplayJoinEvent';
import DisplayEventobj from './DisplayEventobj';

const eventContainer = () => {

    const [eventData, setEventData] = useState(null);

    const handleEventDisplay = (event) => {
        // Add your logic here to handle event data
        setEventData(event);
      };
  return (
    <div>
         <DisplayJoinEvent onEventDisplay={handleEventDisplay} />
        <DisplayEventobj eventData={eventData} />
      
    </div>
  )
}

export default eventContainer
