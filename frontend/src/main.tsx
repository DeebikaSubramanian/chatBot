import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext.tsx'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'

axios.defaults.baseURL="https://chatbot-y49i.onrender.com/api/v1"
axios.defaults.withCredentials=true;  //Allows Axios to send cookies and authentication headers along with requests.

//Especially useful when you're communicating with a backend that uses sessions or cookies for login.

//Without this,Cookies won’t be sent.Session-based login may not work.

const theme=createTheme({typography:{fontFamily:"Work Sans,serif",allVariants:{color:"white"}}})

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    
    <ThemeProvider theme={theme} >
      <Toaster position="top-right"/>
    <App />
    </ThemeProvider>
    </AuthProvider>
    </BrowserRouter>
    
  </StrictMode>,
  
)
