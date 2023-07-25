import { useInfiniteQuery } from "react-query";
import axios from "axios";
import React from "react";

const TestPage = () => {
  const LIMIT = 4;

  const fetchTransactions = async (page) => {
    const response = await axios.get(`/api/transactions/test/`, {
      params: { page },
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

  return (
    <div className="app">
      {isSuccess &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.transactions.map((transaction) => (
              <article className="article" key={transaction._id}>
                <h2>{transaction.title}</h2>
              </article>
            ))}
          </React.Fragment>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default TestPage;
