import React from 'react';

export default function Lightbox(props) {
    return (
        <div className="lightbox-overlay" onClick={props.handleClose}>
            <div className="lightbox">
                <img src={'https://www.artic.edu/iiif/2/' + props.imgSrc + '/full/1686,/0/default.jpg'} alt="" />
                <button onClick={props.handleClose}>X</button>
            </div>
        </div>
    )
}
