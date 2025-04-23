import React from 'react';

const NavTabs = ({ activeTab, setActiveTab, isDayTime = true }) => {
  // Define color schemes for day and night
  const dayColors = {
    border: 'border-gray-700',
    activeBorder: 'border-white',
    text: 'text-gray-800',
    activeText: 'text-white',
    hover: 'hover:text-white'
  };
  
  const nightColors = {
    border: 'border-gray-600',
    activeBorder: 'border-blue-300',
    text: 'text-gray-400',
    activeText: 'text-blue-300',
    hover: 'hover:text-blue-300'
  };
  
  // Select the appropriate color scheme
  const colors = isDayTime ? dayColors : nightColors;

  return (
    <div className={`flex mb-6 border-b ${colors.border}`}>
      <button 
        className={`px-4 py-2 transition-colors 
          ${activeTab === 'today' 
            ? `border-b-2 ${colors.activeBorder} ${colors.activeText}` 
            : `${colors.text} ${colors.hover}`}`
        }
        onClick={() => setActiveTab('today')}
      >
        Today
      </button>
      <button 
        className={`px-4 py-2 transition-colors 
          ${activeTab === 'tomorrow' 
            ? `border-b-2 ${colors.activeBorder} ${colors.activeText}` 
            : `${colors.text} ${colors.hover}`}`
        }
        onClick={() => setActiveTab('tomorrow')}
      >
        Tomorrow
      </button>
      <button 
        className={`px-4 py-2 transition-colors 
          ${activeTab === 'monthly' 
            ? `border-b-2 ${colors.activeBorder} ${colors.activeText}` 
            : `${colors.text} ${colors.hover}`}`
        }
        onClick={() => setActiveTab('monthly')}
      >
        Monthly Forecast
      </button>
    </div>
  );
};

export default NavTabs;