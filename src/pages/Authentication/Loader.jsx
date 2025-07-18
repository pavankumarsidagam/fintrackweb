import React from "react";

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" aria-hidden="true" >
          <div className="relative w-12 h-12 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-r-4 border-green-500 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-b-4 border-yellow-500 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-l-4 border-red-500 rounded-full"></div>
          </div>
        </div>
    );
}

export default Loader;