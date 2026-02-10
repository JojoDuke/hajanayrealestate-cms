import React, { useState, useContext, useEffect } from 'react';
/* MATERIAL UI */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
/*OWN*/
import PageHeader from '../components/PageHeader';
import Popup from '../components/Popup';
import BackendRequest from '../utils/BackendRequest';
import BackendDataContext from '../Context/BackendDataContext';
import { FETCH_PAGES, UPDATE_PAGE } from '../Containers/backendDataReducer';
import SectionForm from "../Forms/SectionForm";
import HomeSections from '../components/HomeSections';
import Notification from "../components/Notification";

const useStyles = makeStyles((theme)=>({
    cardsContainer: {
        padding: '16px',
        margin: '0 40px',
        marginTop: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            flexWrap: 'nowrap',
            margin: '20px auto'
          },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
          },
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
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        height: 'auto',
        flex: '1 1 auto',
        padding: '20px 0'
      },
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
      justifyContent: 'center'
    },
    icon: {
        fontSize: 56
    },
    title: {
      fontSize: 36,
      fontWeight: 500,
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
    subtitle: {
        opacity: .5,
      }
  }));

const PagesScene = () => {
    const classes = useStyles();
    const [currentComponent, setCurrentComponent] = useState(0);
    const [pages, setPages] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const { currentState, dispatch } = useContext(BackendDataContext);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

     /* UPDATE SECTION */
     const updateSection = (formData, reset) => {
        const onSuccess = (response) => {
            dispatch({
                type: UPDATE_PAGE,
                section: response.data.section,
                sectionId: response.data.section.id,
                pageId: pages.find(page=>currentComponent === page.id).id
            });
            setOpenPopup(false);
            setNotify({isOpen: true, message: 'Sekce upravena.', type: 'success'})
        }
        const onError = (error) => {
            console.log('error in /section/:id', error);
        }
          
          BackendRequest("put", "/section/" + formData.id, formData, onSuccess, onError);
    }

    /* FETCH BLOGPOSTS */
    const fetchPagesWithSections = () => {
    
        const onSuccess = (response) => {
          dispatch({
              type: FETCH_PAGES,
              pages: response.data.pages
          })
        }
    
        const onError = (error) => {
            console.log('error in /pages', error);
        }
        
        BackendRequest("get", "/pages", null, onSuccess, onError);
    };
    
    useEffect(() => {
        fetchPagesWithSections();
    }, [])

    useEffect(() => {
        setPages(currentState.pages);
    }, [currentState])
    
    return (
    <div className={classes.root}>
        <PageHeader
                title="Stránky"
                subTitle="Úprava obsahu jednotlivých stránek a jejich sekcí"
                icon={<PostAddIcon fontSize="large" />}
            />
        <div className={classes.cardsContainer}>
            <Card className={classes.card} onClick={()=>{currentComponent === 1 ? setCurrentComponent(0) : setCurrentComponent(1)}}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.subtitle} color="primary" >
                        stránka 
                    </Typography>
                    <Typography className={classes.title} color="primary" >
                        Domů
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card} onClick={()=>{setCurrentComponent(2); setOpenPopup(true);}}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.subtitle} color="primary" >
                        stránka 
                    </Typography>
                    <Typography className={classes.title} color="primary" >
                        O projektu
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card} onClick={()=>{setCurrentComponent(3); setOpenPopup(true);}}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.subtitle} color="primary" >
                        stránka
                    </Typography>
                    <Typography className={classes.title} color="primary" >
                        Lokalita
                    </Typography>
                </CardContent>
            </Card>
        </div>
            {(currentComponent !== 0 && pages.length !==0) && 
            <div>
                {currentComponent === 1 ? 
                    <HomeSections 
                        sections={pages.find(page => page.id === currentComponent).sections}
                        updateSection={updateSection}
                    /> : 
                    <Popup
                        title={"Úprava stránky " + pages.find(page => page.id === currentComponent).name}
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <SectionForm
                            recordForEdit={pages.find(page => page.id === currentComponent).sections[0]}
                            submitMethod={updateSection}
                            type={pages.find(page => page.id === currentComponent).id === 2 ? "aboutproject" : "locality"}
                        />
                </Popup>
                }
            </div>}
        
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
    );
}

export default PagesScene;