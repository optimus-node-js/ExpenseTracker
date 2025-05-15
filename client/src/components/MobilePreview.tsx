import React from 'react';

const MobilePreview: React.FC = () => {
  return (
    <div className="relative w-64 h-auto shadow-xl rounded-xl overflow-hidden mx-auto">
      {/* Phone frame */}
      <div className="relative bg-black rounded-xl overflow-hidden pb-[200%]">
        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 h-6 bg-black flex items-center justify-between px-4 z-10">
          <div className="text-white text-xs">9:41</div>
          <div className="flex space-x-1">
            <div className="w-4 h-3 bg-white opacity-80 rounded-sm"></div>
            <div className="w-3 h-3 bg-white opacity-80 rounded-full"></div>
            <div className="w-3 h-3 bg-white opacity-80 rounded-full"></div>
          </div>
        </div>
        
        {/* App content */}
        <div className="absolute inset-0 top-6 bg-gray-900 flex flex-col">
          {/* Nav bar */}
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-blue-400 text-xl mr-2">●</span>
              <span className="font-bold">FinTrackr</span>
            </div>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <div className="w-4 h-0.5 bg-white mb-1"></div>
              <div className="w-4 h-0.5 bg-white"></div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="flex flex-1">
            <div className="w-3/4 bg-gray-900 border-r border-gray-800 flex flex-col p-4 space-y-6">
              <div className="flex items-center text-blue-400 font-medium">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                Dashboard
              </div>
              <div className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Transactions
              </div>
              <div className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;