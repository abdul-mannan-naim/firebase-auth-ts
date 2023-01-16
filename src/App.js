import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './Components/Dashboard/AddProduct';
import AllUser from './Components/Dashboard/AllUser';
import Dashboard from './Components/Dashboard/Dashboard';
import MyOrders from './Components/Dashboard/MyOrders';
import Products from './Components/Dashboard/Products';
import Home from './Components/Home/Home';
import About from './Components/Hooks/About';
import Navbar from './Components/Hooks/Navbar';
import Product from './Components/Hooks/Product';
import RequireAdmin from './Components/Hooks/RequireAdmin';
import RequireAuth from './Components/Hooks/RequireAuth';
import Login from './Login/Login';
import SignIn from './Login/SignIn';

function App() {
  return (
    <div className="App">
      {/* <div>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/signIn" >Sign In</NavLink>
        <NavLink to="/logIn" >LogIn</NavLink>
      </div> */}
      <Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/home' element={<Home></Home>} ></Route>
          <Route path='/about' element={<RequireAuth><About></About></RequireAuth>} ></Route>
          <Route path='/product' element={<RequireAuth> <Product></Product> </RequireAuth>} ></Route>

          <Route path='/signIn' element={<SignIn></SignIn>} ></Route>

          <Route path='/dashboard' element={<Dashboard></Dashboard>} > 
            <Route index element={<MyOrders></MyOrders>} ></Route>
            <Route path='/dashboard/myOrders' element={<MyOrders></MyOrders>} ></Route>
            <Route path='/dashboard/products' element={<Products></Products>} ></Route>
            <Route path='/dashboard/addProduct' element={<AddProduct></AddProduct>} ></Route>
            <Route path='/dashboard/users' element={<RequireAdmin><AllUser></AllUser></RequireAdmin>} ></Route>
          </Route>
          <Route path='/logIn' element={<Login></Login>} ></Route>
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
