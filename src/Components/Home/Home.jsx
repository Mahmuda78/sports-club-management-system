import React from 'react';

import FancyBanner from './FancyBanner';

import AboutSection from './AboutSection';
import CouponsSection from './CouponsSection ';
import LocationSection from './LocationSection';
const Home = () => {
    return (
        <div>
         
         <FancyBanner></FancyBanner>
         <AboutSection></AboutSection>
         <CouponsSection></CouponsSection>
         <LocationSection></LocationSection>
        </div>
    );
};

export default Home;