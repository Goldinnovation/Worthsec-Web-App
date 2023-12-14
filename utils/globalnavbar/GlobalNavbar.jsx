"use client"
import React, { useState } from "react";
import DisplayProfiIImage from "@utils/homeUtils/DisplayProfiIImage";
import Link from "next/link";
import HomeIcon from "@assets/home.png";
import Image from "next/image";
import BubbleIcon from "@assets/bubble.png";
import searchIcon from "@assets/search.png";

const GlobalNavbar = () => {
    const [showNav, setShowNav] =  useState(true)


    const handleToggle = () => {
        setShowNav(!showNav)
    }

    return (
        <div>

            <div className="NavbarLayer">
                {showNav && (
                          <div className="leftNavbar">
                          <Link rel="preload" href={"/user"}>
                              <Image
                                  src={HomeIcon}
                                  alt="HomeIcon"
                                  className="HomeIcon"
                                  height={30}
                                  width={30}
                              />
                          </Link>
      
                          <Link href={"/explore"}>
                              <Image
                                  src={BubbleIcon}
                                  alt="BubbleIcon"
                                  className="BubbleIcon"
                                  height={30}
                                  width={30}
                              />
                          </Link>
                      </div>
                )}
              
                <div className="middleNavbar" onClick={handleToggle}>
                    <DisplayProfiIImage />
                </div>
                {showNav && (
                    <div className="rightNavbar">
                    <Link href={"/search"}>
                        <Image
                            src={searchIcon}
                            alt="searchIcon"
                            className="search-Icon"
                            height={30}
                            width={30}
                        />
                    </Link>
                    <Link href={"/Community"}>
                        <Image
                            src={BubbleIcon}
                            alt="BubbleIcon"
                            className="BubbleIcon"
                            height={30}
                            width={30}
                        />
                    </Link>
                </div>

                )}

                
            </div>
        </div>
    );
};

export default GlobalNavbar;
