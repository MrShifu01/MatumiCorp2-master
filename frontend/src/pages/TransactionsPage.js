import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import Loader from "../components/Loader";
import Modal from "../components/transactions/Modal";
import { openModal, closeCurrentModal } from "../redux/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useInfiniteQuery } from "react-query";

const TransactionsPage = () => {

  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.transactions);
  const { activeModalId } = useSelector((state) => state.transactions);
  const [modalsData, setModalsData] = useState([]);
  const [selectedMandateFilter, setSelectedMandateFilter] = useState("");
  const [allMandates, setAllMandates] = useState(true);
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState("");
  const [allIndustries, setAllIndustries] = useState(true);

  const { keyword } = useParams();
  // const lastTransactionRef = useRef();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  // Move the useEffect inside the component and add keyword as a dependency
  useEffect(() => {
    const fetchModalsData = async () => {
      const response = await axios.get(`/api/transactions/`, {
        params: {
          keyword,
          page: 1, // Assuming you want to fetch the first page of modal data
          limit: 1000,
        },
      });
      setModalsData(response.data.transactions);
    };
    fetchModalsData();
  }, [keyword, selectedMandateFilter, selectedIndustryFilter]);

  const LIMIT = selectedMandateFilter !== "" && selectedIndustryFilter !== "" ? 1000 : 14;
  const fetchTransactions = async (page) => {
    const response = await axios.get(`/api/transactions/paginate`, {
      params: {
        keyword,
        page,
        limit: LIMIT,
        mandate: selectedMandateFilter,
        industry: selectedIndustryFilter,
      },
    });
    return response.data;
  };

  const { data, isSuccess, isLoading, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["transactions", selectedMandateFilter, selectedIndustryFilter],
      ({ pageParam = 1 }) => fetchTransactions(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage.transactions.length === LIMIT
              ? allPages.length + 1
              : undefined;
          return nextPage;
        },
      },
    );

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      setSearchKeyword("");
      navigate(`/transactions/search/${searchKeyword}`);
    } else {
      navigate("/transactions");
    }
  };

  const handleOpenModal = (id) => {
    dispatch(openModal(id));
  };

  const handleCloseModal = () => {
    dispatch(closeCurrentModal());
  };

  const handleMandateFilter = async (mandate) => {
    setAllMandates(false);
    setSelectedMandateFilter((prevFilter) =>
      prevFilter === mandate ? "" : mandate
    );
    fetchNextPage();
    navigate(`/transactions?mandate=${mandate}`);
  };

  const handleIndustryFilter = async (industry) => {
    setAllIndustries(false);
    setSelectedIndustryFilter((prevFilter) =>
      prevFilter === industry ? "" : industry
    );
    fetchNextPage();
    navigate(`/transactions?industry=${industry}`);
  };

  const handleAllMandates = () => {
    setAllMandates((prev) => !prev);
    setSelectedMandateFilter("");
    fetchNextPage();
    navigate(`/transactions`);
  };

  const handleAllIndustries = () => {
    setAllIndustries((prev) => !prev);
    setSelectedIndustryFilter("");
    fetchNextPage();
    navigate(`/transactions`);
  };

  const hanldeGoBack = () => {
    navigate('/');
  };

  // Filter transactions based on the selectedFilter
  const filteredTransactions = data
    ? data?.pages?.flatMap((page) => page.transactions)
    : [];

  // Filter transactions based on the selectedFilter and selectedMandateFilter
  const filteredData = filteredTransactions?.filter((transaction) => {
    // Check if both the selectedMandateFilter and selectedIndustryFilter are present
    if (selectedMandateFilter && selectedIndustryFilter) {
      return (
        transaction.mandate === selectedMandateFilter &&
        transaction.industry === selectedIndustryFilter
      );
    }
    // Check if only the selectedMandateFilter is present
    else if (selectedMandateFilter) {
      return transaction.mandate === selectedMandateFilter;
    }
    // Check if only the selectedIndustryFilter is present
    else if (selectedIndustryFilter) {
      return transaction.industry === selectedIndustryFilter;
    }
    // If neither filter is present, return all transactions
    return true;
  });

  return (
    <>
      {!isModalOpen && (
        <>
          <section className="transactions bg-light h-100">
            <div className="container-fluid position-relative transaction-hero">
              <div className="container transaction-text-wrapper position-relative">
                <div className="row pt-8">
                  <div className="col text-center">
                    <h1 className="ms-3 display-3">Transactions</h1>
                  </div>
                </div>
                <div className="row ps-5 mt-4">
                  <div className="col">
                    <button className="btn btn-outline-secondary" onClick={hanldeGoBack}>
                      Go Back
                    </button>
                  </div>
                </div>
                <div className="row ps-3 pb-8 mt-6">
                <div className="col">
                    <h2 className="ms-3">Search</h2>
                    <Form onSubmit={handleSearch} className="d-flex">
                      <Form.Control
                        type="text"
                        value={searchKeyword}
                        onChange={(ev) => setSearchKeyword(ev.target.value)}
                        placeholder="Search Transactions..."
                        className="mr-sm-2 ml-sm-5 ps w-25 bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted"
                      />
                      <Button type="submit" variant="transparent" className="py-2 px-4 mx-2">
                        <img src="/search.png" alt="search" />
                      </Button>
                    </Form>
  {/* FILTERS */}
                    <div className="d-flex justify-content-between mt-6 ps-3 pe-5">
                      <div>
                        <button
                          className={`btn ${allMandates ? "btn-primary" : ""}`}
                          onClick={handleAllMandates}
                          disabled={allMandates}
                        >
                          All Mandates
                        </button>
                        <button
                          className={`btn ${
                            selectedMandateFilter === "Sell-Side"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) => handleMandateFilter("Sell-Side")}
                          disabled={selectedMandateFilter === "Sell-Side"}
                        >
                          Sell-Side
                        </button>
                        <button
                          className={`btn ${
                            selectedMandateFilter === "Buy-Side"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) => handleMandateFilter("Buy-Side")}
                          disabled={selectedMandateFilter === "Buy-Side"}
                        >
                          Buy-Side
                        </button>
                        <button
                          className={`btn ${
                            selectedMandateFilter === "Capital Raising"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) => handleMandateFilter("Capital Raising")}
                          disabled={selectedMandateFilter === "Capital Raising"}
                        >
                          Capital Raising
                        </button>
                      </div>
                      <div>
                        <button
                          className={`btn ${allIndustries ? "btn-primary" : ""}`}
                          onClick={handleAllIndustries}
                          disabled={allIndustries}
                        >
                          All Industries
                        </button>
                        <button
                          className={`btn ${
                            selectedIndustryFilter === "Industrial"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) => handleIndustryFilter("Industrial")}
                          disabled={selectedIndustryFilter === "Industrial"}
                        >
                          Industrial
                        </button>
                        <button
                          className={`btn ${
                            selectedIndustryFilter === "Financial Services"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) =>
                            handleIndustryFilter("Financial Services")
                          }
                          disabled={
                            selectedIndustryFilter === "Financial Services"
                          }
                        >
                          Financial Services
                        </button>
                        <button
                          className={`btn ${
                            selectedIndustryFilter === "Logistics"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) => handleIndustryFilter("Logistics")}
                          disabled={selectedIndustryFilter === "Logistics"}
                        >
                          Logistics
                        </button>
                        <button
                          className={`btn ${
                            selectedIndustryFilter === "Technology"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) => handleIndustryFilter("Technology")}
                          disabled={selectedIndustryFilter === "Technology"}
                        >
                          Technology
                        </button>
                        <button
                          className={`btn ${
                            selectedIndustryFilter === "Other"
                              ? "btn-primary"
                              : ""
                          }`}
                          onClick={(ev) => handleIndustryFilter("Other")}
                          disabled={selectedIndustryFilter === "Other"}
                        >
                          Other
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  
{/* MAPPING */}
            <div className="container">       
                <div className="row ps-3 mt-6">
                  {isFetching && <Loader />}
                  <div className="row mt-5">
                    {isSuccess &&
                      filteredData?.map((modal, index) => (
                        <div
                          className="col-md-3 text-center modal-buttons"
                          key={index}
                        >
                          <button
                            onClick={() => handleOpenModal(modal._id)}
                            className="modal-button square-button p-7 shadow bg-white rounded-1 mb-6"
                          >
                            <img
                              className="square-image"
                              src={
                                modal.imageSrc.includes("http")
                                  ? modal.imageSrc
                                  : `https://matumi-server.onrender.com${modal.imageSrc}`
                              }
                              alt="logo"
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="d-flex justify-content-center mb-8">
                    <button
                      className="border-0 bg-transparent load-button"
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                      {isFetchingNextPage ? (
                        "Loading more..."
                      ) : hasNextPage ? (
                        <img src="/plus.png" width={"40px"} alt="load more" />
                      ) : (
                        "No More Matching Data"
                      )}
                    </button>
                  </div>
                </div>
            </div>
          </section>
        </>
      )}
{/* MODAL */}
      {isModalOpen && (
        <Modal
          closeModal={handleCloseModal}
          activeModalId={activeModalId}
          modalsData={modalsData}
          selectedMandateFilter={selectedMandateFilter} // Pass selectedMandateFilter as prop
          selectedIndustryFilter={selectedIndustryFilter} // Pass selectedIndustryFilter as prop
        />
      )}
    </>
  );
};

export default TransactionsPage;
