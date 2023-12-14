"use client";
import React, { useState } from "react";
import GlobalNavbar from "@utils/globalnavbar/GlobalNavbar";
import GlobalLogo from "@utils/globallogo/GlobalLogo";

const GlobalHeader = () => {
  return (
    <div>
      <div className="GlobalHeader">
        <div className="globalHeaderLogoSection">
          <div className="globalHeaderLogo">
            <GlobalLogo />
          </div>
        </div>
        <div className="globalNavbarLogo">
          <GlobalNavbar />
        </div>
      </div>
    </div>
  );
};

export default GlobalHeader;
