import React, { useState, useEffect, useContext } from 'react';
import { FilePond } from 'react-filepond';
import axios from 'axios';
/* MATERIAL UI */
import PhotoIcon from '@material-ui/icons/Photo';
import { Paper, makeStyles, Grid } from '@material-ui/core';
/* OWN */
import { Form } from '../components/useForm';
import Controls from "../components/controls/Controls";
import PageHeader from "../components/PageHeader";
import Notification from "../components/Notification";

import BackendRequest from '../utils/BackendRequest';
import BackendDataContext from '../Context/BackendDataContext';
import { UPDATE_GALLERY } from '../Containers/backendDataReducer';
import { getTokenFromLocalStorage } from '../utils/localStorage';
/* CSS */
import 'filepond/dist/filepond.min.css'
import './GalleryScene.css';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const GalleryScene = () => {

    const classes = useStyles();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { currentState, dispatch } = useContext(BackendDataContext);
    const [files, setFiles] = useState([])


    /* ADD BLOGPOST */
    /*const addBlogPost = (formData, reset) => {
        console.log("formData", formData);

        const onSuccess = (response) => {
            console.log("added", response.data);
            dispatch({
                type: ADD_BLOGPOST,
                blogpost: response.data.blogpost,
            });
            setNotify({isOpen: true, message: 'Aktualita vytvořena.', type: 'success'})
          }
      
          const onError = (error) => {
              console.log('error in /blogposts', error);
          }
          
          BackendRequest("post", "/blogposts", formData, onSuccess, onError);
    }*/

    /* DELETE BLOGPOST */
    /*const deleteBlogPost = (id) => {

        const onSuccess = (response) => {
            dispatch({
                type: DELETE_BLOGPOST,
                id: id,
            })
            setConfirmDialog({...confirmDialog, isOpen: false});
            setNotify({isOpen: true, message: 'Aktualita odstraněna.', type: 'error'})
          }
      
          const onError = (error) => {
              console.log('error in /blogpost/' + id, error);
          }
          
          BackendRequest("delete", "/blogpost/" + id, null, onSuccess, onError);
    }*/

    /* FETCH BLOGPOSTS */
    const fetchImages = () => {

        const onSuccess = (response) => {
            /*dispatch({
                type: FETCH_BLOGPOSTS,
                blogposts: response.data.blogpost
            })*/
            for (let i = 0; i < response.data.images.length; i++) {
                if (!currentState.gallery.includes(response.data.images[i].image)) {
                    dispatch({
                        type: UPDATE_GALLERY,
                        image: response.data.images[i].image,
                    });
                }
            }
        }

        const onError = (error) => {
            console.log('error in /images', error);
        }

        BackendRequest("get", "/images", null, onSuccess, onError);
    };

    const handleUploadImages = (event) => {
        event.preventDefault();

        if (files.length !== 0) {
            files.map(file => {
                let formData = new FormData();
                formData.append('file', file.file)

                axios.post("https://api.moderni-zelesice.cz/image-upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                    }
                })
                    .then(function (response) {
                        if (!currentState.gallery.includes(response.data.upload.image)) {
                            dispatch({
                                type: UPDATE_GALLERY,
                                image: response.data.upload.image,
                            });
                        }
                        setNotify({ isOpen: true, message: 'Obrázky vloženy.', type: 'success' })
                        setFiles([]);
                    })
                    .catch(function (error) {
                        setNotify({ isOpen: true, message: 'Obrázky se nepodařilo vložit', type: 'error' })
                        if (error.response.status === 409) {
                            console.log("existing image", error.response);
                            setNotify({ isOpen: true, message: `Pokoušíte se vložit obrázek s již existujícím názvem ${error.response.data.filename}.`, type: 'error' });
                        }
                    });
            })
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])


    return (
        <>
            <Form onSubmit={handleUploadImages}>
                <PageHeader
                    title="Galerie"
                    subTitle="Všechny nahrané obrázky a fotografie"
                    icon={<PhotoIcon fontSize="large" />}
                />
                <Paper className={classes.pageContent}>

                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={10}
                        //server="/api"
                        name="files"
                        labelIdle='Přetáhněte obrázky nebo <span class="filepond--label-action">vyberte</span> (max. 10 najednou)'
                    />

                    <br /><br />
                    <Grid container spacing={1}>
                        <Grid item xs={12} spacing={3} style={{ padding: 0, margin: 0 }}>
                            <section id="photos">
                                {currentState.gallery.map(image => {
                                    return (
                                        <div className="img-item">
                                            <img src={"https://api.moderni-zelesice.cz" + image} alt="Random" style={{ maxWidth: '100%' }} />
                                        </div>
                                    )
                                })}
                            </section>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Controls.Button
                                type="submit"
                                text="Uložit" />
                        </div>
                    </Grid>
                </Paper>
            </Form>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default GalleryScene;