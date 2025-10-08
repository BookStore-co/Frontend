import React from "react";
import Example from "../components/Example";

const GraphPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Sales Analytics
          </h1>

          <div className="h-96 w-full">
            <Example />
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Interactive chart showing sales data across different pages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
