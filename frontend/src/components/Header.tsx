// import React from 'react'

import { AppBar, Toolbar } from "@mui/material"
import Logos from "./shared/Logos"
import { useAuth } from "./context/AuthContext"
import NavigationLink from "./shared/NavigationLink"

const Header = () => {
    const auth=useAuth()
  return (
    <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
        <Toolbar>
            <Logos />
            <div >{auth?.isLoggedIn? (<>
            
            <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" textColor="black" />
            <NavigationLink bg="#51538f" to="/" text="LogOut" textColor="white" onClick={auth.logout} />
              
             </>)
            :
            (<>
            <NavigationLink bg="#00fffc" to="/login" text="Login" textColor="black" />
            <NavigationLink bg="#51538f" to="/signup" text="SignUp" textColor="white"  />
          
            </>)} </div>
            
            
        </Toolbar>
        </AppBar>
  )
}

export default Header