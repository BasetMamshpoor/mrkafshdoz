import React from 'react';
import MiddleNavbar from './MiddleNavbar';
import NavbarLinks from './NavbarLinks';

const Navbar = () => {
    return (
        <>
            <header className='overflow-hidden py-24'>
                <div className='fixed w-screen top-0 left-0 right-0 z-[999]'>
                    <MiddleNavbar />
                    <NavbarLinks />
                </div>
            </header >
        </>
    );
};

export default React.memo(Navbar);