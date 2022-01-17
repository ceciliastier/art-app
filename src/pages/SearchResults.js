import { useLocation } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useState, useEffect } from "react"
import React from 'react';

//components
import GalleryList from "../components/GalleryList"
import Pagination from '../components/Pagination'

export default function SearchResults() {
    //get query params
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')
    const currpage = queryParams.get('page')
    
    let uriParams = {
        page: currpage,
        q: query,
        fields: "id,title,image_id,artist_title,date_display,style_title,thumbnail",
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
    
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (currpage) { //if page is set, go to that page
            setUrl('https://api.artic.edu/api/v1/artworks/search?params=' + encoded)
        } else { //if page is not set, go to 1st page
            setUrl('https://api.artic.edu/api/v1/artworks/search?params=' + encoded)
        }
    }, [currpage, encoded])


    //fetch the url
    const {data} = useFetch(url)

    
    return (
        <div className="wrapper main">
            <p className="search-results-for">Search results for "{query}"</p>
            {data && <GalleryList gallery={data.data}  />}
            {data && <Pagination query={query} page={currpage} totalPages={data.pagination.total_pages} currentPage={data.pagination.current_page} />}
        </div>
    )
}