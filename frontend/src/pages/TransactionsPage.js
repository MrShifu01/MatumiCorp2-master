import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import Modal from '../components/transactions/Modal';
import { openModal, closeCurrentModal } from '../redux/transactionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useInfiniteQuery } from 'react-query';

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.transactions);
  const { activeModalId } = useSelector((state) => state.transactions);

  const { keyword } = useParams();
  const lastTransactionRef = useRef();
  const navigate = useNavigate()
  const [allData, setAllData] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await axios.get(`/api/transactions/`, {
        params: {
          limit: 1000,
        },
      });
      console.log(response.data)
      setAllData(response.data)
    }
    fetchAllData()
  }, [])

  const LIMIT = 4;

  const fetchTransactions = async (page) => {
    const response = await axios.get(`/api/transactions/test/`, {
      params: {
        keyword,
        page,
        limit: LIMIT,
      },
    });
    return response.data;
  };
  
  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "transactions",
    ({ pageParam = 1 }) => fetchTransactions(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.transactions.length === LIMIT
            ? allPages.length + 1
            : undefined;
        return nextPage;
      },
    }
  );

  const handleSearch = () => {
      if(searchKeyword.trim()) {
          setSearchKeyword('')
          navigate(`/transactions/search/${searchKeyword}`)
      } else {
          navigate('/transactions')
      }
  }

  const handleOpenModal = (id) => {
    dispatch(openModal(id));
  };

  const handleCloseModal = () => {
    dispatch(closeCurrentModal());
  };

  const handleReset = () => {
    navigate('/transactions')
  }

  if (!data) {
    // Handle initial data loading
    return <Loader />;
  }

  return (
    <>
      {!isModalOpen && (
        <>
          <Navigation bg={'bg-light'} />

          <section className="transactions pt-6 bg-light h-100">
            <div className="container">
              <div className="row mt-8">
                <div className="col">
                {/* <button className='btn btn-outline-primary'><Link className='text-decoration-none text-dark' to='/'>Go Back</Link></button> */}
                  <h2 className="ms-3">Search</h2>
                  <Form onSubmit={handleSearch} className="d-flex">
                      <Form.Control
                          type="text"
                          name="q"
                          value={searchKeyword}
                          onChange={(ev) => setSearchKeyword(ev.target.value)}
                          placeholder="Search Transactions..."
                          className="mr-sm-2 ml-sm-5 ps w-25 bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted"
                      ></Form.Control>
                      <Button type="submit" variant="light" className="p-2 mx-2">
                          <img src="/search.png" alt="search" />
                      </Button>
                  </Form>
                  
                  <h2 className="ms-3 mt-7">Filter</h2>

                    <div className='d-flex justify-content-between'>
                      filters
                    </div>
                    <button onClick={handleReset} className='btn btn-outline-dark mt-5'>Reset Filters</button>

                    <div className="row mt-8">
                    {isSuccess && data.pages.map((page, pageIndex) => (
                      <React.Fragment key={pageIndex}>
                        {page.transactions.map((modal, index) => (
                          <div className="col-md-3 text-center modal-buttons" key={index}>
                            <button
                              onClick={() => handleOpenModal(modal._id)}
                              className="modal-button square-button p-7 shadow bg-white rounded-1 mb-6"
                            >
                              <img
                                className="square-image"
                                src={modal.imageSrc.includes('http') ? modal.imageSrc : `https://matumi-server.onrender.com${modal.imageSrc}`}
                                alt="logo"
                              />
                            </button>
                            {pageIndex === data.pages.length - 1 && index === page.length - 1 && (
                              <div ref={lastTransactionRef} />
                            )}
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className='d-flex justify-content-center mb-8'>
                    <button className='btn btn-light rounded-5 border' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                      {isFetchingNextPage ? 'Loading more...' : hasNextPage ? '+' : 'No More Data'}
                    </button>
                  </div>
                </div>
                </div>
              </div>
          </section>
        </>
      )}
      {isModalOpen && (
        <Modal
          closeModal={handleCloseModal}
          activeModalId={activeModalId}
          modalsData={allData.transactions} // Pass the modalsData to the Modal component
        />
      )}

    </>
  );
};

export default TransactionsPage;
