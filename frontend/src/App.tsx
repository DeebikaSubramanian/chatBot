
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Chats from "./pages/Chats"
import NotFound from "./NotFound"
import { useAuth } from "./components/context/AuthContext"
import SignUp from "./pages/SignUp"
import Footer from "./components/footer/Footer"



function App() {
  const auth=useAuth()

  return (
    <>
    <main>
      
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/signup' element={<SignUp />} /> 
        {
          (auth?.isLoggedIn&&auth?.user&&
        <Route path='/chat' element={<Chats />} /> )
        }
        
        <Route path='*' element={<NotFound />} /> 
      </Routes>
       
    </main>
    </>
  )
}

export default App
