import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../components/hoc/Layout';
import DrawerProvider from '../Context/DrawerContext';


export const PrivateRoute = ({auth, component:Component, ...rest}) => {
    
    return(
        <Route
            {...rest}
            render = {(props) => auth ? <Layout><DrawerProvider><Component  {...props} {...rest} /></DrawerProvider></Layout> : <Redirect to="/prihlaseni" />}
        />
    )
}