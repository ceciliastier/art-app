import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import React, { useEffect, useState } from "react"
// import React, { Component }  from 'react';

//components
import Lightbox from "../components/Lightbox"


export default function ArtDetails() {
    const { id } = useParams() //get artwork id from uri param
    //concatinate id in urls
    const detailsUrl = 'https://api.artic.edu/api/v1/artworks/' + id + '/manifest.json'
    const infoUrl = 'https://api.artic.edu/api/v1/artworks/' + id
    //fetch data from urls
    const { data: details } = useFetch(detailsUrl)
    const { data: info } = useFetch(infoUrl)


    //**need to fix this logic */
    //if has img, display img; if does not have img, display placeholder
    const imgSrc = info ? 'https://www.artic.edu/iiif/2/' + info.data.image_id + '/full/843,/0/default.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'

    //lightbox
    const [showLightbox, setShowLightbox] = useState(false)
    const handleClose = (e) => {
        const img = document.querySelector('.lightbox img')
        if (e.target !== img) {
            setShowLightbox(false)
            document.body.classList.remove('lightbox-open') //remove class added on lightbox open click
        }
    }

    //scroll to top when id changes (user selects more by artist)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    //display variables
    const dateDisplay = info && info.data.date_display !== null ? info.data.date_display : 'N/A'
    const originDisplay = info && info.data.place_of_origin !== null ? info.data.place_of_origin : 'N/A'
    const styleDisplay = info && info.data.style_title !== null ? info.data.style_title : 'N/A'
    const deptDisplay = info && info.data.department_title !== null ? info.data.department_title : 'N/A'
    const creditDisplay = info && info.data.credit_line !== null ? info.data.credit_line : 'N/A'

    return (
        <>
            <div className="details wrapper main">
                {details && (
                    <>
                        <div className="img-container">
                            <img src={imgSrc} alt="" />
                            <button onClick={() => {
                                setShowLightbox(true)
                                window.scrollTo(0, 0)
                                document.body.classList.add('lightbox-open') //add class to body //TODO: make reusable
                            }}>
                                <i className="fas fa-expand"></i>
                            </button>
                        </div>
                    </>
                )}
                <div className="text-container">
                {details && (
                    <>
                        <div className="details-title">
                            <h1>{details.label}</h1>
                            <h3 dangerouslySetInnerHTML={{ __html: details.metadata[0].value }}></h3>
                            <p className="italisize">{details.metadata[1].value}</p>
                        </div>
                    </>
                )}
                    {info && (
                        <>
                            <ul className="meta-details">
                                <li>
                                    <span className="bold">Date: </span>
                                    <span>{dateDisplay}</span>
                                </li>
                                <li>
                                    <span className="bold">Origin: </span>
                                    <span>{originDisplay}</span>
                                </li>
                                <li>
                                    <span className="bold">Style: </span>
                                    <span>{styleDisplay}</span>
                                </li>
                                <li>
                                    <span className="bold">Department: </span>
                                    <span>{deptDisplay}</span>
                                </li>
                                <li>
                                    <span className="bold">Credit Line: </span>
                                    <span>{creditDisplay}</span>
                                </li>
                            </ul>
                        </>
                    )}
                    {details && details.description[0].value && (
                        <div className="about">
                            <h2>About {details.label}</h2>
                            <p dangerouslySetInnerHTML={{ __html: details.description[0].value }}></p>
                        </div>
                    )}
                </div>
            </div>
            {showLightbox && <Lightbox handleClose={handleClose} imgSrc={info.data.image_id} />}
        </>
    )
}
