import ReactDOM from 'react-dom/client'
import './index.css'
import App from'./App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage.tsx'
import Fruit from './components/Fruit.tsx'
import Vegetables from './components/Vegetables.tsx'
import Register from './components/Register.tsx'
import Pokemon from './components/Pokemon.tsx'
import PokemonID from './components/PokemonID.tsx'
import SearchPage from './pages/SearchPage.tsx'
import UserContextProvider from './context/UserContextProvider.tsx'
import Home from './components/Home.tsx'
import React from 'react'

const router= createBrowserRouter([{
  path:"/",
  element:<HomePage></HomePage>,
  errorElement:<div>404 error</div>
  
},{
  path:"/login",
  element:<LoginPage></LoginPage>

},{
  path:'/main/',
  element:<MainPage></MainPage>,
  children:[
    {
      path:"fruit",
      element:<Fruit></Fruit>
    },{
      path:"vegetables",
      element:<Vegetables></Vegetables>
    },{
      path:"register",
      element:<Register></Register>
    }

  ]
},{
  path:'/pokemon/',
  element:<Pokemon></Pokemon>,
  children: [{
    path: ":id",
    element: <PokemonID></PokemonID>
  }]
},{
  path:'/search',
  element:<SearchPage></SearchPage>
},{
  path: '/home',
  element: <Home></Home>
}]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <UserContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  </React.StrictMode>

)
