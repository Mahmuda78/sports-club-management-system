import React from 'react';

import FancyBanner from './FancyBanner';
import Navbar from './Navbar';
import AboutSection from './AboutSection';
import CouponsSection from './CouponsSection ';
import LocationSection from './LocationSection';
const Home = () => {
    return (
        <div>
         <Navbar></Navbar>
         <FancyBanner></FancyBanner>
         <AboutSection></AboutSection>
         <CouponsSection></CouponsSection>
         <LocationSection></LocationSection>
        </div>
    );
};

export default Home;