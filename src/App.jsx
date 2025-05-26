import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Projects } from "./pages";
import { Navbar, TechStack, Experience, Contact, FAQ } from "./components";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="md:pl-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tech" element={<TechStack />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
