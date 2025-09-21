import React from 'react';

import { Outlet } from 'react-router';


import Footer from '../Components/Footer';
import Home from '../Components/Home/Home';


const MainLayout = () => {
    return (
        <div>
            <Home></Home>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;