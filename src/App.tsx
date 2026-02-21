import React from "react";
import { Route, Routes } from "react-router-dom";
import { About, Home, Contact, Projects } from "./pages";
import { Footer, Header, NotFound } from "./components";

const App: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-400">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
