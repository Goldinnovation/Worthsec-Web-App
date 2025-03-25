import React from 'react';
import '@/styles/global.css';
// import '@/globals.css'
import 'tailwindcss/tailwind.css';
const layout = ({ children }) => {
    return (<>
    <html>
        <body>
            {children}
        </body>
    </html>
      
    </>);
};
export default layout;
