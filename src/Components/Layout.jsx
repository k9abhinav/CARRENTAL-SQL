import React from 'react'
import Navbar from './Navbar/Navbar';
import Background from './Background/Background';

function Layout() {
    const layout = ({ children }) => {
        const isBackground = children.type.name === Background;
    
        return (
            <>
                {!isBackground && <Navbar />}
                {children}
            </>
        )
    }
}
export default Layout