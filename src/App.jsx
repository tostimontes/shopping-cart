import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './routes/Home';
import Contact from './components/Contact';
import Shop from './routes/Shop';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="h-full w-full flex-col gap-8 bg-yellow-100">
        <Outlet />
      </main>
      <Contact />
    </div>
  );
}

export default App;
