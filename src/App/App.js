import React, { useState, useEffect } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Switch, Redirect } from 'react-router-dom';




/* OWN */
import Layout from '../components/hoc/Layout';

import AuthScene from "../Scenes/AuthScene";
import DashBoardScene from '../Scenes/DashBoardScene';
import BlogPostsScene from "../Scenes/BlogPostsScene";
import PagesScene from '../Scenes/PagesScene';
import HousesScene from '../Scenes/HousesScene';
import EmailLogsScene from '../Scenes/EmailLogsScene';
import GalleryScene from '../Scenes/GalleryScene';
import DrawerProvider from '../Context/DrawerContext';

import AuthApiContext from '../Context/AuthApiContext';
import { getTokenFromLocalStorage } from '../utils/localStorage';
import { ProtectedLogin } from '../utils/ProtectedLogin';
import { PrivateRoute } from '../utils/PrivateRoute';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    },
    MUIRichTextEditor: {
      root: {
          border: "1px solid #ccc",
          borderRadius: "4px"
      },
      container: {
          display: "flex",
          flexDirection: "column",
          marginTop: 0
      },
      editor: {
          padding: "10px 20px 20px 20px",
          height: "200px",
          maxHeight: "200px",
          overflow: "auto"
      },
      toolbar: {
          backgroundColor: "#f7faff",
          borderRadius: "4px",
          paddingTop: '5px'
      },
      placeHolder: {
          paddingLeft: 20,
          width: "inherit",
          position: "absolute",
          top: "65px"
      },
      anchorLink: {
          color: "#333333",
          textDecoration: "underline"
      }
  }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})


const App = () => {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    
    if (getTokenFromLocalStorage() !== null) {
      setAuth(true);
    }
    else {
      setAuth(false);
    }
  }, [])

  if (auth !== null) {
    return (
      <ThemeProvider theme={theme}>
        <AuthApiContext.Provider value={{auth, setAuth}}>
          <Switch>
    
          <ProtectedLogin path="/prihlaseni" component={AuthScene} auth={auth} />
    

                <PrivateRoute path="/aktuality" exact component={BlogPostsScene} auth={auth} />
                <PrivateRoute path="/nastenka" exact component={DashBoardScene} auth={auth} />
                <PrivateRoute path="/domy" exact component={HousesScene} auth={auth} />
                <PrivateRoute path="/stranky" exact component={PagesScene} auth={auth} />
                <PrivateRoute path="/galerie" exact component={GalleryScene} auth={auth} />
                <PrivateRoute path="/formulare" exact component={EmailLogsScene} auth={auth} />
    
                <Redirect to={auth ? "/nastenka" : "/prihlaseni"} />

          </Switch>
        </AuthApiContext.Provider>
      </ThemeProvider>
    );
  }
  else
    return null;
}

export default App;

