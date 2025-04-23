import React from 'react';

const NavTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex mb-6 border-b border-gray-700">
      <button 
        className={`px-4 py-2 ${activeTab === 'today' ? 'border-b-2 border-white' : ''}`}
        onClick={() => setActiveTab('today')}
      >
        Today
      </button>
      <button 
        className={`px-4 py-2 ${activeTab === 'tomorrow' ? 'border-b-2 border-white' : ''}`}
        onClick={() => setActiveTab('tomorrow')}
      >
        Tomorrow
      </button>
      <button 
        className={`px-4 py-2 ${activeTab === 'monthly' ? 'border-b-2 border-white' : ''}`}
        onClick={() => setActiveTab('monthly')}
      >
        Monthly Forecast
      </button>
    </div>
  );
};

export default NavTabs;