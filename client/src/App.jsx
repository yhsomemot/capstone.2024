import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Books } from './components/Books'
import { Navigations } from './components/Navigation'
import { SingleBook } from './components/SingleBook'
import { Register } from './components/Register'
import { Account } from './components/Account'
import { GenreNav } from './components/GenreNav'
import { SingleGenre } from './components/SingleGenre'
import { FilterContext } from './components/FilterContext'
import { Cart } from './components/Cart'


function App() {
  const [login, setLogin] = useState("");
  const [register, setRegister] = useState("");
  const [filter, setFilter] = useState("");
  const [token, setToken] = useState()

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      <h1>BOOK STORE!</h1>
      <div><Navigations /></div>
      <br />
      <div><GenreNav /></div>

      <div>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<SingleBook token={token} />} />
          <Route path="/register" element={<Register token={token} />} />
          <Route path="/login" element={<Login login={ login } register={register} token={token} />} />
          <Route path="/account" element={<Account login={ login } register={register} token={token} />} />
          <Route path="/books/genre/:bookId" element={<SingleGenre />} />
          <Route path="/cart" element={<Cart token={token} />} />
        </Routes>
      </div>
    </FilterContext.Provider>
  )
}

export default App
export const API_URL = "http://localhost:3000"
