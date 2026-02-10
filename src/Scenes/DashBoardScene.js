import React from 'react';
import { NavLink } from 'react-router-dom';
/* MATERIAL UI */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HouseIcon from '@material-ui/icons/House';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import PhotoIcon from '@material-ui/icons/Photo';
import EmailIcon from '@material-ui/icons/Email';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        padding: '16px',
        margin: '0 40px',
        marginTop: '40px',
        display: 'flex',
        flexWrap: 'wrap',

    },
    card: {
      width: 250,
      height: 250,
      margin: '8px',
      textDecoration: 'none',
      boxShadow: '5px 5px 10px #3c44b126', //primary.main
      backgroundImage: 'linear-gradient(135deg, #3c44b126 50%, white 50%)',
      backgroundSize: '300% 100%',
      backgroundPosition: 'bottom right',
      transition: 'background-position .3s ease',
      '&:hover': {
        cursor: 'pointer',
        backgroundPosition: 'top left',
      }
    },
    cardContent: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    icon: {
        fontSize: 56
    },
    title: {
      fontSize: 28,
    },
  });

const DashBoardScene = () => {
    
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Card className={classes.card} to="/aktuality" component={NavLink}>
                <CardContent className={classes.cardContent}>
                    <PostAddIcon className={classes.icon} color="primary" />
                    <Typography className={classes.title} color="primary" gutterBottom>
                        Aktuality
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}  to="/domy" component={NavLink}>
                <CardContent className={classes.cardContent}>
                    <HouseIcon className={classes.icon} color="primary" />
                    <Typography className={classes.title} color="primary" gutterBottom>
                        Domy
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}  to="/stranky" component={NavLink}>
                <CardContent className={classes.cardContent}>
                    <MenuBookIcon className={classes.icon} color="primary" />
                    <Typography className={classes.title} color="primary" gutterBottom>
                        Stránky
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}  to="/osobni-info" component={NavLink}>
                <CardContent className={classes.cardContent}>
                    <PersonIcon className={classes.icon} color="primary" />
                    <Typography className={classes.title} color="primary" gutterBottom>
                        Osobní info
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}  to="/galerie" component={NavLink}>
                <CardContent className={classes.cardContent}>
                    <PhotoIcon className={classes.icon} color="primary" />
                    <Typography className={classes.title} color="primary" gutterBottom>
                        Galerie
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}  to="/formulare" component={NavLink}>
                <CardContent className={classes.cardContent}>
                    <EmailIcon className={classes.icon} color="primary" />
                    <Typography className={classes.title} color="primary" gutterBottom>
                        Emaily
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default DashBoardScene;