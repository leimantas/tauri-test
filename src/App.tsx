import React from "react";
import TestComponent from "components/Test";

const App = () => {
  return (
    <div className="bg-blue-500">
      <header className="p-8">
        <p className="text-2xl text-center text-white">Hello Vite + React!</p>
        <input name="input" className="border-4 border-red-200" autoFocus />
        <TestComponent />
      </header>
    </div>
  );
};

export default App;
