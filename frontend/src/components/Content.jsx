import React from 'react';



const Content = ({ activeComponent }) => {
  const renderContent = () => {
    switch (activeComponent) {
      case 'home':
        return (
          <div>
            <h2 className="text-2xl font-bold">Home</h2>
            <p>This is the home component, where you can find an overview of coal mine emissions data.</p>
          </div>
        );
      case 'methodology':
        return (
          <div>
            <h2 className="text-2xl font-bold">Methodology</h2>
            <p>This component explains the methodology used for calculating emissions.</p>
          </div>
        );
      case 'about':
        return (
          <div>
            <h2 className="text-2xl font-bold">About</h2>
            <p>This component provides information about the project and its objectives.</p>
          </div>
        );

        case 'Visualization':
          return (
            <div>
              <h2 className="text-2xl font-bold">Charts</h2>


              
              <p>Welcome to the data analysis and Visualization</p>
            </div>
          );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default Content;