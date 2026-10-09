import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Cards from "./components/Cards";
import Home from "./Home"
import Register from "./components/Register"


function App() {


  return (
    <>
      <Link to="/">home</Link>
      <Link to="/card">カードへ</Link>
      <Link to="/register">新規登録はこちら</Link>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/card/:userId' element={<Cards />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </>
  )
}

export default App
