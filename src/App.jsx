import { useEffect, useState } from 'react'
import './App.css'
import Login from './AuthModule/Components/Login/Login';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute';
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout';
import UserList from './UsersModule/Components/UserList/UserList';
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList';
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList';
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout';
import ChangePass from './AuthModule/Components/ChangePass/ChangePass';
import Home from './HomeModule/Components/Home/Home';
import NotFound from './SharedModule/Components/NotFound/NotFound';
import { jwtDecode } from 'jwt-decode';
import ResetPass from './AuthModule/Components/ResetPass/ResetPass';
import ResetPassRequest from './AuthModule/Components/ResetPassRequest/ResetPassRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [adminData, setAdminData] = useState(null); //useState 34an 3ndi data 3yza atklm m3ha so use "useState"


  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    // let decodedToken = jwtDecode(encodedToken);
    // setAdminData(decodedToken);
    
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setAdminData(decodedToken);
      console.log(setAdminData)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);

  const routes = createHashRouter([
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UserList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoriesList /> },
       
      ]
    },
    {
      path: "/",
      element: 
      
        <AuthLayout />
      ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "change-password", element: <ChangePass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "reset-pass-request", element: <ResetPassRequest /> },
        
 


      ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
