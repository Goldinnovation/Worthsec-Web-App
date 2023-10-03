'use client'
import { useState, useEffect} from 'react';
import Navbar from './Navbar';
import dictionary from '@utils/dbData';
import SearchBar from './SearchBar';
import Image from 'next/image';

const BackLayer = () => {
    
const totalItems = 40;
const numberOfItemsToShow = 7;

const [currentItems, setCurrentItems] = useState(getRandomItems());
const [starbar, setstarbar] = useState(false)




useEffect(() => {
    const interval = setInterval(() => {
        setCurrentItems(getRandomItems());
    }, 2500); 

    return () => clearInterval(interval);
}, []);

function getRandomItems() {
    
    const items = new Set();
    while (items.size < numberOfItemsToShow) {
        items.add(Math.floor(Math.random() * dictionary.length));
    }
    return [...items];
}

  return (
    <div>
        {/* loop for the background */}
        <div className="container">
        
        {currentItems.map(index => {
                const book = dictionary[index];
                return (
                    <div 
                        key={book.id} 
                        className="item"
                        style={{
                            gridRow: `${Math.floor(Math.random() * 4) + 1}`,
                            gridColumn: `${Math.floor(Math.random() * 10) + 1}`
                        }}
                    >
                        <a href={book.url} target="_blank" rel="noopener noreferrer">
                        <img src={book.image} alt={`Book ${book.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </a>
                    </div>
                );
            })}
        </div>

        {/* overlay for background */}
    <div className="blur-overlay"></div>

        {/* profilbar */}
        <div className="profil-area">
            <Navbar/>
        </div>


        <div className='search-container'>
        {starbar && (
                  <div className="star-area">4</div>
                )}
        </div>



        {/* search container */}
        <div className="top-container2">
           <SearchBar/>
        </div>
        
    
    </div>
  )
}

export default BackLayer
