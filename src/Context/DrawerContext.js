import React from 'react';

export const DrawerContext = React.createContext();

const DrawerProvider = ({children}) => {

    const [drawerState, toggleDrawer] = React.useState(false);

    return <DrawerContext.Provider
        value={{drawerState, toggleDrawer}}>
        {children}
    </DrawerContext.Provider>
};

export default DrawerProvider;