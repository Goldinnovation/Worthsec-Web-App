import React from 'react'
import { useState } from 'react'
import GetEventContent from '@components/homeComponents/GetEventContent'
import OrangeAddbtn from '@assets/O-add-btn.png'
import Networkbtn from '@utils/Networkbtn'
import Image from 'next/image'
import DisplayJoinEvent from './DisplayJoinEvent'
import controleIcon from  '@assets/controle3d.png'



const UserFeedArea = () => {
    const [addArea, setAddArea] = useState(true)
    const [networkArea, setNetworkArea] = useState(false)



    // open up the Pop up of the create event area and closes all other toggle 

    const togglemodalAddArea = () => {

        setAddArea(true)
        setNetworkArea(false)

    }

    // open up the Pop up of the network area and closes all other toggle 

    const togglemodalnetwork = () => {
        setNetworkArea(true)
        setAddArea(false);


    }


    return (
        <div>

            {/* Represents the main layer of the feed. It includes the create and network sections */}
            <div className='feed-area'>
                <div className='user-feed-nav'>
                    {/* <div className='timeline-btn-area' onClick={togglemodalCalender}><TimeLayer/></div> */}
                    {/* <div className='network-btn-area' onClick={togglemodalnetwork}><Networkbtn /></div> */}
                    <div className='network-btn-area' onClick={togglemodalnetwork}><Networkbtn /></div>

                    <div className="btn-area">
                        {/* <button className='add-btn' onClick={togglemodalAddArea}><Image src={OrangeAddbtn} alt='imgbtn' height={20} width={20} /></button> */}
                       <Image src={controleIcon} alt='imgbtn' height={40} width={40}  onClick={togglemodalAddArea}></Image>

                    </div>


                </div>
            {/*  Create Section */}
                {addArea && (
                    <div className='AddEventContentArea'>
                        <div className='EventContentArea'>
                            <GetEventContent />

                        </div>
                    </div>
                )}
             {/*  Network Section, includes user Joined and favored Events  */}
                {networkArea && (
                    <div className='NetworkContentArea'>
                        <div className='ContentArea'>
                            <div className='joinandFavorArea'>
                                <DisplayJoinEvent />
                            </div>
                        </div>
                    </div>
                )}

            </div>


        </div>
    )
}

export default UserFeedArea
