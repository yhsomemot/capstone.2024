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
import { OrderHistory } from './components/OrderHistory'
import { Checkout } from './components/Checkout'
import { UpdateProfile } from './components/UpdateProfile'


function App() {
  // const [login, setLogin] = useState("");
  // const [register, setRegister] = useState("");
  const [filter, setFilter] = useState("");
  const [token, setToken] = useState();
  // const [user, setUser] = useState("") 

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
          <Route path="/register" element={<Register token={token} setToken={setToken} />} />
          <Route path="/login" element={<Login token={token} setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} setToken={setToken}  />} />
          <Route path="/books/genre/:bookId" element={<SingleGenre />} />
          <Route path="/cart" element={<Cart token={token} setToken={setToken} />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/checkout" element={<Checkout token={token} />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
      </div>
    </FilterContext.Provider>
  )
}

export default App
// export const API_URL = "http://localhost:3000"
export const API_URL = "https://capstone-2024.onrender.com"
