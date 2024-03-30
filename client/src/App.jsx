import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>BOOK STORE!</h1>

      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
