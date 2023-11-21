'use client'
import React from 'react'
import Image from 'next/image'
import searchIcon from '@assets/search.png'
import Link from 'next/link'
import HomeIcon from '@assets/home.png'
import BubbleIcon from '@assets/bubble.png'
import styles from '@styles/exploreStyle/explore.module.css'







const Navbar = () => {

  return (
    <>

          <nav className={styles['nav-area']}>
            <ul className={styles['nav-list']}>
                    <li>
                        <Link href={'/user'}>
                            <Image src={HomeIcon} alt='HomeIcon' className='HomeIcon' height={30} width={30} />
                        </Link>
                    </li>
                    <li>
                        <Link href={'/explore'}>
                        <Image src={BubbleIcon} alt='BubbleIcon' className='BubbleIcon' height={30} width={30}/>
                        </Link>
                    </li>
                
                    <li>
                        <Link href={'/search'}>
                            <Image src={searchIcon} alt='searchIcon' className='search-Icon' height={30} width={30}/>
                        </Link>
                    </li>
                    
                    <li>
                        <Link href={'/Community'}>
                        <Image src={BubbleIcon} alt='BubbleIcon' className='BubbleIcon' height={30} width={30}/>
                        </Link>
                    </li>
            </ul>
            <hr  id='in_line'/>
           </nav>

            

           
    </>
  )
}

export default Navbar
