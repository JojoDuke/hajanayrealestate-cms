import React, { useState, useEffect } from 'react';

/* MUI */
import { Grid } from '@material-ui/core';

/* OWN */
import BackendRequest from '../../utils/BackendRequest';
import Image from './Image';
import Controls from '../controls/Controls';

import './AddingImages.css';

const AddingImages = ({name="images", updateImages, initialImages, maxImages=30, minImages=1}) => {

    const [imagesToDisplay, setImagesToDisplay] = useState([]);
    const [addedImages, setAddedImages] = useState(initialImages);

    const fetchImages = () => {
    
        const onSuccess = (response) => {
           /*dispatch({
               type: FETCH_BLOGPOSTS,
               blogposts: response.data.blogpost
           })*/
           setImagesToDisplay(response.data.images);
         }
     
         const onError = (error) => {
             console.log('error in /images', error);
         }
         
         BackendRequest("get", "/images", null, onSuccess, onError);
     };
    
     useEffect(() => {
        fetchImages();
    }, [])

    const addOrRemoveImage = (image) => {
        if (addedImages.includes(image)) {
            let newArray = addedImages.filter(x => x !== image);
            setAddedImages(newArray)
        } else if (addedImages.length >= maxImages) {
            let tempArray = [...addedImages];
            tempArray.shift();
            tempArray.push(image);
            setAddedImages([...tempArray]);
        } else {
            let array = [...addedImages];
            array.push(image)
            setAddedImages([...array])
        }
    }

    const handleSubmit = () => {
        if (addedImages.length < minImages) {
            alert(`Vybral jste málo obrázků. Musíte vybrat ještě alespoň ${minImages - addedImages.length}.`)
            return null;
        } else {
                updateImages(addedImages, name);            
        }
    }

    return (
        <div>
            <section id="photos">  
                {imagesToDisplay.length !== 0 && imagesToDisplay.map(image => {
                    let alt = image.image.split(".")[0];
                    return (
                        <div className="img-cell">
                            <Image 
                                src={"https://api.moderni-zelesice.cz" + image.image} 
                                alt={alt} 
                                active={addedImages.includes(image.image)}
                                onClick={() => addOrRemoveImage(image.image)}/>
                        </div>
                    )
                })}
                    
            </section>    
            <Grid container>
                <Grid item xs={12} >
                    <div>
                        <Controls.Button
                        text="Uložit"
                        color="primary"
                        onClick={handleSubmit} />
                        <Controls.Button
                        text="Vrátit změny"
                        color="default"
                        onClick={()=>setAddedImages(initialImages)} />
                    </div>                    
                </Grid>
            </Grid>
        </div>
    );
}

export default AddingImages;