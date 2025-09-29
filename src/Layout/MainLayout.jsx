import React from 'react';

import { Outlet } from 'react-router';


import Footer from '../Components/Footer';

import Navbar from '../Components/Home/Navbar';


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;