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

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.transactions);
  const { activeModalId } = useSelector((state) => state.transactions);

  const { keyword } = useParams();
  const [modalsData, setModalsData] = useState(null);

  const lastTransactionRef = useRef();

  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filterOptionMandate, setFilterOptionMandate] = useState('')
  const [filterOptionGeography, setFilterOptionGeography] = useState('')
  const [filterOptionIndustry, setFilterOptionIndustry] = useState('')

  const mandates = modalsData?.reduce((uniqueMandates, modal) => {
    if (!uniqueMandates.includes(modal.mandate)) {
      uniqueMandates.push(modal.mandate);
    }
    return uniqueMandates;
  }, []);

  const geographies = modalsData?.reduce((uniqueGeographies, modal) => {
    if (!uniqueGeographies.includes(modal.geography)) {
      uniqueGeographies.push(modal.geography);
    }
    return uniqueGeographies;
  }, []);

  const industries = modalsData?.reduce((uniqueIndustries, modal) => {
    if (!uniqueIndustries.includes(modal.industry)) {
      uniqueIndustries.push(modal.industry);
    }
    return uniqueIndustries;
  }, []);

  useEffect(() => {
    // This effect will be triggered after every render when filterOption changes
    if (filterOptionMandate && filterOptionMandate !== 'All') {
      navigate(`/transactions/search/${filterOptionMandate}`);
    } else if (filterOptionMandate === 'All') {
      navigate('/transactions');
    }
  }, [filterOptionMandate]);

  useEffect(() => {
    // This effect will be triggered after every render when filterOption changes
    if (filterOptionGeography && filterOptionGeography !== 'All') {
      navigate(`/transactions/search/${filterOptionGeography}`);
    } else if (filterOptionGeography === 'All') {
      navigate('/transactions');
    }
  }, [filterOptionGeography]);

  useEffect(() => {
    // This effect will be triggered after every render when filterOption changes
    if (filterOptionIndustry && filterOptionIndustry !== 'All') {
      navigate(`/transactions/search/${filterOptionIndustry}`);
    } else if (filterOptionIndustry === 'All') {
      navigate('/transactions');
    }
  }, [filterOptionIndustry]);

  const handleFilterMandateChange = (ev) => {
    setFilterOptionMandate(ev.target.value);
  };

  const handleFilterGeographyChange = (ev) => {
    setFilterOptionGeography(ev.target.value);
  };

  const handleFilterIndustryChange = (ev) => {
    setFilterOptionIndustry(ev.target.value);
  };

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

  useEffect(() => {
    // Fetch initial data
    fetchTransactions();
  }, [keyword, filterOptionMandate, filterOptionGeography, filterOptionIndustry]); // Update data when the keyword changes in the URL

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions`, {
        params: { keyword, filterOptionMandate, filterOptionGeography, filterOptionIndustry },
      });
      const newData = response.data;
      setModalsData(newData);
    } catch (error) {
      console.log(error.message || 'An error occurred while fetching data');
    } 
  };

  const handleReset = () => {
    setFilterOptionMandate('')
    setFilterOptionGeography('')
    setFilterOptionIndustry('')
    navigate('/transactions')
  }

  console.log(modalsData)

  if (!modalsData) {
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
                      
                      <div className='w-75'>
                        <h5 className="ms-3 mt-5">By Mandate</h5>
                        <Form>
                          <Form.Select
                            value={filterOptionMandate}
                            onChange={handleFilterMandateChange}
                            className='mr-sm-2 ml-sm-5 ps w-75 bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted'
                          >
                              <option value=""></option>
                            {mandates.map((mandate, index) => (
                              <option key={index} value={mandate}>
                                {mandate}
                              </option>))}
                          </Form.Select>
                        </Form>
                      </div>

                      <div className='w-75'>
                        <h5 className="ms-3 mt-5">By Geography</h5>
                        <Form>
                          <Form.Select
                            value={filterOptionGeography}
                            onChange={handleFilterGeographyChange}
                            className='mr-sm-2 ml-sm-5 ps w-75 bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted'
                          >
                              <option value=""></option>
                            {geographies.map((geography, index) => (
                              <option key={index} value={geography}>
                                {geography}
                              </option>))}
                          </Form.Select>
                        </Form>
                      </div>

                      <div className='w-75'>
                        <h5 className="ms-3 mt-5">By Industry</h5>
                        <Form>
                          <Form.Select
                            value={filterOptionIndustry}
                            onChange={handleFilterIndustryChange}
                            className='mr-sm-2 ml-sm-5 ps w-75 bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted'
                          >
                              <option value=""></option>
                            {industries.map((industry, index) => (
                              <option key={index} value={industry}>
                                {industry}
                              </option>))}
                          </Form.Select>
                        </Form>
                      </div>

                    </div>
                    <button onClick={handleReset} className='btn btn-outline-dark mt-5'>Reset Filters</button>

                  <div className="row mt-8">
                    {modalsData.map((modal, index) => (
                      <div className="col-md-3 text-center modal-buttons" key={index}>
                        <button
                          onClick={() => handleOpenModal(modal._id)}
                          className="modal-button square-button p-7 shadow bg-white rounded-1 mb-6"
                        >
                          {/* <img className="square-image" src={modal.imageSrc} alt="logo" /> */}
                          <img className="square-image" src={modal.imageSrc.includes('http') ? modal.imageSrc : `https://matumi-server.onrender.com/${modal.imageSrc}`} alt="logo" />
                        </button>
                        {/* Add a ref to the last transaction element */}
                        {index === modalsData.length - 1 && <div ref={lastTransactionRef} />}
                      </div>
                    ))}
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
          modalsData={modalsData} // Pass the modalsData to the Modal component
        />
      )}

    </>
  );
};

export default TransactionsPage;
