import React from 'react';
import {withRouter} from 'react-router-dom'
/* MATERIAL UI */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
/* OWN */
import CustomDrawer from "../Drawer/CustomDrawer";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appMain: {
        flexGrow: 1,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '64px',
          },
    },
}));

const Layout = (props) => {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <CustomDrawer />
                <CssBaseline />
                <main className={classes.appMain}>
                    {props.children}
                </main>
            </div>
        </div>
    );

}

export default withRouter(Layout);