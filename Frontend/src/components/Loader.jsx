import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-4 border-t-4 border-white border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;