// src/components/EmissionsCalculator.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Calculator from './Calculator.jsx';
import CarbonNeutrality from './CarbonNeutrality.jsx';
import Chart2 from './Charts/Chart2';
import Content from './Content';
import Footer from './Footer';
import AboutUs from './About.jsx'; 
import EcoCoal from './Home.jsx';
import PerCapitaCoal from './PerCapita.jsx';
import CarbonCreditCalculatorPage from './CarbonCredit.jsx';
const Land = () => {
  const [activeComponent, setActiveComponent] = useState('home');

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 p-6">
      {activeComponent === 'home' && <EcoCoal />}
        {activeComponent === 'data' && <Calculator />}
        {activeComponent === 'About' && <AboutUs />}
        {activeComponent === 'Charts' && <Chart2 />}
        {activeComponent === 'PerCapita' && <PerCapitaCoal />}
        {activeComponent === 'CarbonCredit' && <CarbonCreditCalculatorPage />}
        {activeComponent === 'Carbon Neutrality' && < CarbonNeutrality/>}
        {/* {activeComponent !== 'data' && activeComponent !== 'Charts' && (
          <Content activeComponent={activeComponent} />
        )} */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Land;
