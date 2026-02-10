import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
/* MATERIAL UI */
import { withStyles } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HouseIcon from '@material-ui/icons/House';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import PhotoIcon from '@material-ui/icons/Photo';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/* OWN */
import { localStorage } from '../utils/localStorage';
import AuthApiContext from '../Context/AuthApiContext';


const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        width: '240px',
        height: '100%',
        backgroundColor: '#253053',
        color: 'white',
    },
    active: {
        background: 'rgba(255, 255, 255, .05)',
        '& .MuiTypography-body1': {
            fontWeight: '900'
        }
    },
    drawerPaper: {
        width: '240px',
        backgroundColor: '#253053',
        color: 'white'
    },
    drawerContainer: {
        overflow: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '40px'
    },
    listItem: {
        paddingLeft: '32px'
    }
}

const SideMenu = (props) => {
    
    const { classes } = props;
    const Auth = useContext(AuthApiContext);

    return (
        <Drawer 
            className={classes.sideMenu}
            //variant={drawerBreakpoint ? 'permanent' : 'temporary'}
            variant={'permanent'}
            //open={drawerState}
            //onClose={() => toggleDrawer(false)}
            //onOpen={() => toggleDrawer(true)}
            classes={{paper: classes.drawerPaper}}
        >
            <div className={classes.drawerContainer}>
                <List >
                    <ListItem 
                        className={classes.listItem}
                        button 
                        to="/nastenka"
                        component={NavLink}
                        activeClassName={classes.active}
                        //onClick = {() => toggleDrawer(false)}
                    >
                        <DashboardIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText>Nástěnka</ListItemText>
                    </ListItem>
                    <ListItem 
                        className={classes.listItem}
                        button 
                        to="/aktuality"
                        component={NavLink}
                        activeClassName={classes.active}
                        //onClick = {() => toggleDrawer(false)}
                    >
                        <PostAddIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText>Aktuality</ListItemText>
                    </ListItem>
                    <ListItem 
                        className={classes.listItem}
                        button 
                        to="/domy"
                        component={NavLink}
                        activeClassName={classes.active}
                        //onClick = {() => toggleDrawer(false)}
                    >
                        <HouseIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText>Domy</ListItemText>
                    </ListItem>
                    <ListItem 
                        className={classes.listItem}
                        button 
                        to="/stranky"
                        component={NavLink}
                        activeClassName={classes.active}
                        //onClick = {() => toggleDrawer(false)}
                    >
                        <MenuBookIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText>Stránky</ListItemText>
                    </ListItem>
                    <ListItem 
                        className={classes.listItem}
                        button 
                        to="/galerie"
                        component={NavLink}
                        activeClassName={classes.active}
                        //onClick = {() => toggleDrawer(false)}
                    >
                        <PhotoIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText>Galerie</ListItemText>
                    </ListItem>
                    <ListItem 
                        className={classes.listItem}
                        button 
                        to="/formulare"
                        component={NavLink}
                        activeClassName={classes.active}
                        //onClick = {() => toggleDrawer(false)}
                    >
                        <EmailIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText>Emaily</ListItemText>
                    </ListItem>
                </List>


                <List>
                    <ListItem 
                        className={classes.listItem}
                        button 
                        to="/prihlaseni"
                        component={NavLink}
                        activeClassName={classes.active}
                        //onClick = {() => toggleDrawer(false)}
                        onClick = {() => {
                            localStorage.clear();
                            Auth.setAuth(false);
                        }}
                    >
                        <ExitToAppIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText>Odhlášení</ListItemText>
                    </ListItem>
                </List>
            </div>
    
        </Drawer>
    )
}

export default withStyles(style)(SideMenu);
