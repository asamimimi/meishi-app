import { Routes, Route, Link } from 'react-router';
import './App.css'
import Cards from "./components/Cards";
import Home from "./Home"
import Register from "./components/Register"
import { useState, useEffect } from 'react';

// supabase
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


function App() {


  return (
    <>
      <Link to="/">home</Link>
      <Link to="/card">カードへ</Link>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/card' element={<Cards />} />
        <Route path='/card/register' element={<Register />} />
      </Routes>

    </>
  )
}

export default App
