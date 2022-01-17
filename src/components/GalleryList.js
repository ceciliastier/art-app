import { Link } from 'react-router-dom'
import React from 'react';

export default function GalleryList({gallery}) {
// console.log(pagination)
    if(gallery.length === 0){
        return <div>No search results found...</div>
    }
    // console.log(query)
    return (
        <div className='gallery'>
            {gallery.map(artwork => (
                <Link to={`/artwork/${artwork.id}`} key={artwork.id}>
                    <div key={artwork.id} className='item'>
                    {artwork.image_id !== null && <img src={"https://www.artic.edu/iiif/2/" + artwork.image_id + "/full/400,/0/default.jpg"} alt={artwork.thumbnail.alt_text} />}
                        {artwork.image_id === null && <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="not available" />}
                        <div className='title'>
                            <h3>{artwork.title.substring(0, 25)}, {artwork.date_display}</h3>
                            <p>{artwork.artist_title}</p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
    )
}
