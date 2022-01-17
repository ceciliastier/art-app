import { useFetch } from '../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import React from 'react';

//components
import GalleryList from '../components/GalleryList'
import Pagination from '../components/Pagination'
import { useEffect, useState } from 'react'

export default function Home() {

    //get query params
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const currpage = queryParams.get('page')

    let uriParams = {
        page: currpage,
        fields: "id,title,image_id,artist_title,date_display,style_title,thumbnail,style_ids,style_titles,subject_ids,artist_id",
        limit: 20,
        query: {
            bool: {
                must: [
                    {
                        term: {
                            is_public_domain: true
                        }
                    }
                ]
            }
        }
    };

    const jsnStrg = JSON.stringify(uriParams)
    const encoded = encodeURI(jsnStrg)

    //update page based on search params
    //condition allows for pagination to restart to page=1 when home button is clicked
    useEffect(() => {
        if (currpage) { //if page is set, go to that page
            setUrl('https://api.artic.edu/api/v1/artworks/search?params=' + encoded)
        } else { //if page is not set, go to 1st page
            setUrl('https://api.artic.edu/api/v1/artworks/search?params=' + encoded)
        }
    }, [currpage, encoded])

    // //set initial url
    const [url, setUrl] = useState('https://api.artic.edu/api/v1/artworks/search?params=' + encoded)

    //fetch the url
    const { data } = useFetch(url)
    
    return (
        <div className='wrapper main'>
            {data && <GalleryList gallery={data.data} />}
            {data && <Pagination page={currpage} totalPages={data.pagination.total_pages} currentPage={data.pagination.current_page} />}
        </div>
    )
}