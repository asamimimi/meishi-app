import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Cards from "./components/Cards";
import Home from "./Home"
import Register from "./components/Register"


function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/card/:userId' element={<Cards />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </>
  )
}

export default App
