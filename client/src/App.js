import HomePage from './components/HomePage';
import './App.css';
// import RegisterForm from './components/Register/RegisterForm';
import Caroussel from './components/Caroussel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import myContext from './components/Context';
import { useState } from 'react';
// import Login from './components/Register/Login';
// import AdminPanel from './components/Register/AdminPanel';
import { ShoeDetails } from './components/ShoeDetails';
import Search from './components/Search/SearchBar.jsx';
import SearchResults from './components/Search/SearchResults';
import Wishlist from './components/User/Wishlist';
// import Cart from './components/User/Cart';
import Cart2 from './components/User/Cart2';
import Brands from './components/Brands/Brands';
import Addidas from './components/Brands/Addidas';
import Nike from './components/Brands/Nike';
import Jordans from './components/Brands/Jordans';
import Puma from './components/Brands/Puma';
import Navbar3 from './components/Navbar3';
import UpdateShoes from './components/UpdateShoes';
import RegisterForm from './components/Register/RegisterForm';
import Login from './components/Register/Login';
import UserProfile from './components/User/UserProfile.jsx';
import AdminLogin from './components/Admin/AdminLogin.jsx';
import { useCookies } from 'react-cookie';
import AdminNav from './components/Admin/AdminNav.jsx';
import UserList from './components/Admin/UserList.jsx';
import ProductList from './components/Admin/ProductList.jsx';
import AddProduct from './components/Admin/AddProduct.jsx';
import SuccessPage from './components/SuccessPage.jsx';
import CancelPage from './components/CancelPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './components/User/Orders.jsx';
import Review from './components/Reviews/Review.jsx';
// import UpdateUser from './components/Register/UpdateUser';


function App() {
  const [FormValues,setFormValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const [userData,setUserData] = useState([])
  const [isLogged,setIsLogged] = useState(false)
  const [srch,setSrch] = useState('')
  const [wishlist,setWishList] = useState([])
  const [cart,setCart] = useState([])
  const [amount,setamount] = useState()
  const [adminlog,setAdminLog] = useState(false)
  const[isAdded,setIsAdded] = useState(false)
  const[isAddedW,setIsAddedW] = useState(false)
  const[users,setUsers] = useState({})
  const [orders,setOrders] = useState([])
  const[cookies,setCookies] = useCookies(["admin_token"])

  const value = {orders,setOrders,FormValues,setFormValues,userData,setUserData,isLogged,setIsLogged,srch,setSrch,wishlist,setWishList,cart,setCart,amount,setamount,adminlog,setAdminLog,isAdded,setIsAdded,isAddedW,setIsAddedW,users,setUsers}
  return (
    <BrowserRouter>
      <div className="App">
        
        <div className='contents'>
          <myContext.Provider value={value}>
          {cookies.admin_token ? <AdminNav/> : <Navbar3/>}
            <Routes>
              {/* new project additions */}
              <Route path='/register' element={<RegisterForm/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/user-profile' element={<UserProfile/>}></Route>
              <Route path='/admin-login' element={<AdminLogin/>}></Route>
              <Route path='/user-list' element={<UserList/>}></Route>
              <Route path='/product-list' element={<ProductList/>}></Route>
              <Route path='/add-product' element={<AddProduct/>}></Route>
              <Route path='/success' element={<SuccessPage/>}></Route>
              <Route path='/cancel' element={<CancelPage/>}></Route>
              <Route path='/cancel' element={<CancelPage/>}></Route>
              <Route path='/orders' element={<Orders/>}></Route>
              <Route path='/review' element={<Review/>}></Route>



              <Route path='/' element={<HomePage/>}></Route>
              {/* <Route path='/register' element={<RegisterForm/>}></Route> */}
              {/* <Route path='/login' element={<Login/>}></Route>
              <Route path='/admin' element={<AdminPanel/>}></Route> */}
              <Route path='/shoes/:productID' element={<ShoeDetails/>}></Route>
              <Route path='/search' element={<Search/>}></Route>
              <Route path='/search-results' element={<SearchResults/>}></Route>
              <Route path='/wishlist' element={<Wishlist/>}></Route>
              {/* <Route path='/cart' element={<Cart/>}></Route> */}
              <Route path='/cart' element={<Cart2/>}></Route>
              <Route path='/brands' element={<Brands/>}></Route>
              <Route path='/addidas' element={<Addidas/>}></Route>
              <Route path='/nike' element={<Nike/>}></Route>
              <Route path='/jordans' element={<Jordans/>}></Route>
              <Route path='/puma' element={<Puma/>}></Route>
              <Route path='/update/:id' element={<UpdateShoes/>}></Route>

              {/* <Route path='/user-profile' element={<UpdateUser/>}></Route> */}
            </Routes>
            
          </myContext.Provider>
        </div>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;

// {username: 'gvsfg', email: 'asdf@123', password: 'asdf123#', confirmPassword: 'asdf123#'},{username: 'goku', email: 'sfgs@dsq', password: 'asdf123#', confirmPassword: 'asdf123#'}

