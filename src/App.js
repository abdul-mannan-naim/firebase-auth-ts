import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './Components/Dashboard/AddProduct';
import AllUser from './Components/Dashboard/AllUser';
import Dashboard from './Components/Dashboard/Dashboard';
import MyOrders from './Components/Dashboard/MyOrders';
import Payment from './Components/Dashboard/Payment';
import Products from './Components/Dashboard/Products';
import Home from './Components/Home/Home';
import AllProducts from './Components/Hooks/AllProducts';
import Navbar from './Components/Hooks/Navbar';
import QuestionAnswer from './Components/Hooks/QuestionAnswer';
import RequireAdmin from './Components/Hooks/RequireAdmin';
import RequireAuth from './Components/Hooks/RequireAuth'; 
import Login from './Login/Login';
import SignIn from './Login/SignIn';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Routes>
  
          <Route path='/' element={ <Home></Home>} ></Route>
          <Route path='/home' element={<Home></Home> } ></Route>
          <Route path='/products' element={ <RequireAuth><AllProducts></AllProducts> </RequireAuth> } ></Route>
          <Route path='/questionAnswer' element={ <QuestionAnswer></QuestionAnswer>} ></Route>

          <Route path='/signIn' element={<SignIn></SignIn>} ></Route>

          <Route path='/dashboard' element={<Dashboard></Dashboard>} >
            <Route index element={<MyOrders></MyOrders>} ></Route>
            <Route path='/dashboard/myOrders' element={<MyOrders></MyOrders>} ></Route>
            <Route path='/dashboard/products' element={<Products></Products>} ></Route>
            <Route path='/dashboard/addProduct' element={<AddProduct></AddProduct>} ></Route>
            <Route path='/dashboard/payment/:id' element={<Payment></Payment>} ></Route>
            <Route path='/dashboard/users' element={<RequireAdmin><AllUser></AllUser></RequireAdmin>} ></Route>
            <Route  ></Route>
          </Route>
          <Route path='/logIn' element={<Login></Login>} ></Route>
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
