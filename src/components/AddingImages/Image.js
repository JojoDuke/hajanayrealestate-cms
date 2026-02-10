import React, { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

/*CSS*/
import './AddingImages.css';

const Image = ({ active=false, onClick, src, alt }) => {

    return (
        <div className="image-instance" onClick={() => onClick()}>
            <img 
            src={src} 
            alt={alt} 
            style={active ? {outline: '7px solid #BDECB6'} : {}}/>
            {active && <span className="icon-span"><CheckCircleIcon size="large"/></span>}
        </div>
        
    );
}

export default Image;