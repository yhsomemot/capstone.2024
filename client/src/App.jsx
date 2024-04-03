import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Books } from './components/Books'
import { Navigations } from './components/Navigation'
import { SingleBook } from './components/SingleBook'
import { Register } from './components/Register'
import { Account } from './components/Account'


function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");

  return (
    <>
      <h1>BOOK STORE!</h1>
      <div>
        <Navigations />
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<SingleBook />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} email={email} setEmail={setEmail}/>} />
          <Route path="/account" element={<Account token={token} email={email} setEmail={setEmail}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
export const API_URL = "http://localhost:3000"
