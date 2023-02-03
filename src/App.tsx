import React from "react";
import "./App.css";
import HomePage from "./pages/home";

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen mx-auto">
      <HomePage />
    </div>
  );
};

export default App;
