import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Books } from './components/Books'
import { Navigations } from './components/Navigation'
import { SingleBook } from './components/SingleBook'


function App() {

  return (
    <>
      <h1>BOOK STORE!</h1>
      <div>
        <Navigations />
        </div>

      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />}/>
          <Route path="/books/:bookId" element={<SingleBook />} />
        </Routes>
      </div>
    </>
  )
}

export default App
export const API_URL = "http://localhost:3000"
