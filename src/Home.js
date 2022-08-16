import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Layout from './components/layout.js';
import QueryResult from './components/query-result.js';
import CardsQuery from './components/cards.js';
import ReactPaginate from "react-paginate";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BOOKS } from './utils/grapQueries.js';
import './index.css'


export const Home = () => {
  const [newData, setNewData] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const { loading, error, data, fetchMore } = useQuery(BOOKS);
  const perPage = 5

  useEffect(() => {
    setNewData(data);
    setPageCount(Math.ceil(data?.all_list_of_books?.total / perPage));
  }, [data]);

  if (loading) return 'Loading';

  if (error) return `Error ${error.message}`;

  const handlePageClick = async (event) => {
    const newOffset = event.selected;

    const endOffset = newOffset === 0 ? 0 : newOffset * perPage;
    fetchMore({
      variables: { offset: endOffset },
    }).then((fetchMoreResult) => {
      setNewData(fetchMoreResult?.data)
    });
  };

  return <>
    <Layout grid>{
      newData?.all_list_of_books?.items?.map((el) => (
        <QueryResult
          error={error}
          loading={loading}
          data={newData}
          key={el?.system?.uid}
        >
          <CardsQuery cards={el} />
        </QueryResult>
      ))

    }
      <div style={{ position: "absolute", bottom: "-30px" }}>
        < ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
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
        />
      </div>
    </Layout>
  </>
}