import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';

//pages
import Home from './pages/Home'
import ArtDetails from './pages/ArtDetails'
import SearchResults from './pages/SearchResults'

//components
import Navbar from './components/NavBar'

//styles
import './App.scss';
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="artwork/:id" element={<ArtDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;