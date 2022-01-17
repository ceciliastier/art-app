import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from "react"
import Random from './Random'

export default function NavBar() {
    const [term, setTerm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?q=${term}`)
        setTerm('')
        document.body.classList.remove('lightbox-open') //remove class added on lightbox open click
    }
    

    // const handleClose = (e) => {
    //     const sforminp = document.querySelector('.search-form input')
    //     const sformbtni = document.querySelector('.search-form button i')
    //     const sformbtn = document.querySelector('.search-form button')
    //     console.log(e.target)
    //     if (e.target !== sforminp && e.target !== sformbtn && e.target !== sformbtni) {
    //         setShowSearch(false)
    //         // setTerm('')
    //         // document.body.classList.remove('lightbox-open') //remove class added on lightbox open click
    //     }
    // }

    return (
        <>
            <header>
                <Link to='/' className="logo">
                    <h1>Art Gallery</h1>
                </Link>
                <div className='random-btn'>
                    <Random />
                </div>
                <div className="form-wrapper">
                    {/* <div className="form-wrapper" onClick={handleClose}> */}
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input
                            type="search"
                            name="search"
                            aria-label="Search"
                            onChange={(e) => {
                                setTerm(e.target.value)
                            }}
                            required
                            value={term}
                            autoComplete="off"
                            placeholder='Search...'
                        />
                        <i className="fas fa-search"></i>
                    </form>
                </div>
            </header>

        </>
    )
}
