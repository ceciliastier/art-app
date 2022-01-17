import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch'

export default function Random() {

    const randomPage = Math.floor(Math.random() * 1000)

    let uriParams = {

        page: randomPage,
        fields: "id",
        limit: 1,
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

    const [url, setUrl] = useState('https://api.artic.edu/api/v1/artworks/search?params=' + encoded)

    const { data } = useFetch(url)

    const random = () => {
        setUrl('https://api.artic.edu/api/v1/artworks/search?params=' + encoded)
    }

    return (
        <div>
            {data && (
                <Link to={`/artwork/${data.data[0].id}`} >
                    <button onClick={random}>
                        <i className="fas fa-random"></i>
                    </button>
                </Link>
            )}

        </div>
    )
}
