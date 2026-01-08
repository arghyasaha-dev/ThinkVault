import React from 'react'
import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import toast from 'react-hot-toast';
import ShowAndUpdatePage from './pages/ShowAndUpdatePage.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/notes" element={<HomePage />} />
        <Route path="/notes/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<ShowAndUpdatePage />} />
      </Routes>
    </div>
  )
}

export default App