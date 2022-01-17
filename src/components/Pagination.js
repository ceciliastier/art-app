import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom'
import React from 'react';

export default function Pagination(props) {
    const navigate = useNavigate()

    const handlePageClick = (event) => {
        navigate(`/?page=${event.selected + 1}`) //set uri param to selected page
        props.query && navigate(`/search?q=${props.query}&page=${event.selected + 1}`) //if a search query exists, add that AND selected page to uri params

        window.scrollTo(0, 0)
    };

    //set max pages
    const actualTotalPages = props.totalPages;
    const maxTotalPages = (actualTotalPages > 50) ? 50 : actualTotalPages;
    return (
        <div className='pagination'>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<i className="fas fa-angle-right"></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={maxTotalPages}
                previousLabel={<i className="fas fa-angle-left"></i>}
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}
            />

        </div>
    )
}