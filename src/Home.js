import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Layout from './components/layout.js';
import QueryResult from './components/query-result.js';
import CardsQuery from './components/cards.js';
import ReactPaginate from "react-paginate";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BOOKS } from './utils/grapQueries.js';
import './index.css'
import { pageChanger } from './store/slices/currentPage.js';
import { useDispatch, useSelector } from 'react-redux';
import { setNewListOfBooks } from './store/slices/listOfBookSlice.js';


export const Home = () => {
  const perPage = 5;
  const { loading, error, data, fetchMore } = useQuery(BOOKS);
  const [pageCount, setPageCount] = useState(0)
  const dispatch = useDispatch();
  const languageDefinder = useSelector((state) => state.currentPage.language)
  const listOfBooks = useSelector((state) => state.allBooks.data)
  const currentPage = useSelector((state) => state.currentPage.page)

  useEffect(() => {
    dispatch(setNewListOfBooks(data));
    setPageCount(Math.ceil(data?.all_list_of_books?.total / perPage));
  }, [data]);

  if (loading) return 'Loading';

  if (error) return `Error ${error.message}`;

  const handlePageClick = async (event) => {
    const newOffset = event.selected;
    const endOffset = newOffset * perPage;
    dispatch(pageChanger(endOffset))
    fetchMore({
      variables: {
        offset: endOffset,
        locale: languageDefinder
      },
    }).then((fetchMoreResult) => {
      dispatch(setNewListOfBooks(fetchMoreResult?.data))
    });
  };

  return <>
    <Layout
      grid>{
        listOfBooks?.all_list_of_books?.items?.map((el) => (
          <QueryResult
            error={error}
            loading={loading}
            data={listOfBooks}
            key={el?.system?.uid}
          >
            <CardsQuery cards={el} />
          </QueryResult>
        ))

      }
      <div style={{ position: "absolute", bottom: "-30px" }}>
        < ReactPaginate
          nextLabel={languageDefinder === "ru" ? "следующая >" : "next >"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={languageDefinder === "ru" ? "< предыдущая" : "< previous"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="activation"
          renderOnZeroPageCount={null}
          forcePage={currentPage / perPage}
        />
      </div>
    </Layout>
  </>
}