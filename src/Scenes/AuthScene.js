import React, { useContext, useState } from 'react';
import {useHistory} from "react-router-dom";

/* MATERIAL UI */
import { Paper, Card, Typography, makeStyles } from '@material-ui/core';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

/* OWN */
import AuthForm from '../Forms/AuthForm';
import AuthApiContext from '../Context/AuthApiContext';
import BackendRequest from '../utils/BackendRequest';
import { setToken, setRefreshToken } from '../utils/localStorage';
import Notification from "../components/Notification";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw", 
        height: "100vh", 
        display: "grid", 
        placeItems: "center", 
        background: '#f4f5fd'
    },
    formContainer: {
        padding: theme.spacing(5),
        paddingTop: theme.spacing(2)     
    }, 
    pageHeader:{
        padding:theme.spacing(4),
        paddingLeft: theme.spacing(0),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#3c44b1'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    },       
}))


const AuthScene = () => {

    const classes = useStyles();
    const history = useHistory();
    const Auth = useContext(AuthApiContext);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    
    
    /* HANDLE LOGIN */
    const login = (props) => {
        
        const onSuccess = (response) => {
            setNotify({isOpen: true, message: 'Přihlášení proběhlo úspěšně', type: 'success'});
            setToken(response.data.access);
            setRefreshToken(response.data.refresh)
            Auth.setAuth(true);
            history.push('/nastenka');
        }

        const onError = (error) => {
            console.log("------------------", error);
            setNotify({isOpen: true, message: 'Chybně zadané přihlašovací údaje', type: 'error'});
        }
        
        BackendRequest("post", "/token/", {"username": props.username, "password": props.password}, onSuccess, onError);
    };
    
    return(
        <div className={classes.root}>
            
            <Paper elevation={1} className={classes.formContainer} >
                <Paper elevation={0} square className={classes.header}>
                    <div className={classes.pageHeader}>
                        <Card className={classes.pageIcon}>
                            <AccountBoxOutlinedIcon />
                        </Card>
                        <div className={classes.pageTitle}>
                            <Typography variant="h6" component="div">
                                Moderní Želešice
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                Redakční systém webu
                            </Typography>
                        </div>
                    </div>
                </Paper>
                <AuthForm loginRequest={login} />
            </Paper>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            
        </div>
    )
}

export default AuthScene;