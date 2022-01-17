import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'

export default function SearchBar() {

    const [term, setTerm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?q=${term}`)
        setTerm('')
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="search" 
                aria-label="Search" 
                onChange={(e) => {
                    setTerm(e.target.value)
                }}
                required
                value={term}
                autoComplete="off"
            />
            <button type="submit"><i className="fas fa-search"></i></button>
        </form>
    )
}
