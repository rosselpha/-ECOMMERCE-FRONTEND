
import {Home, Cart, Login, Product, ProductList, Register, Success } from "./pages"
import  {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  const user  = useSelector((state) => state.user.currentUser)
  return (
    <Router>
      <Routes>
        
        {user ? <Route path="/" element={<Home />} />: <Route path="/" element={<Navigate replace to="/login" />} />}

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />

        <Route path="/cart" element={<Cart />} >
          
        
        </Route>
        <Route path="/success" element={<Success />} />  

        <Route path="/login" element={ <Login/>}  />
      </Routes>
    </Router>
  )
}

export default App;
 