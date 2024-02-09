import React, { useEffect, useState } from "react";

function Pagination({ currentpage, totalPages, onPageChange }) {
  const Pagenumber = [];
  for (let i = 1; i <= totalPages; i++) {
    Pagenumber.push(i);
  }
  return (
    <div>
      {Pagenumber.map((Pagenumber) => (
        <button key={Pagenumber} onClick={() => onPageChange(Pagenumber)}>
          {Pagenumber}
        </button>
      ))}
    </div>
  );
}

export default function Searchh() {
  const [result, setResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  async function fetchData() {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentpage}&_limit=${itemsPerPage}`
    );
    const data = await response.json();
    setResult(data);

    const totalPosts = response.headers.get("x-total-count");
    const totalPages = Math.ceil(totalPosts / itemsPerPage);
    setTotalPages(totalPages);
  }

  useEffect(() => {
    fetchData();
  }, [currentpage]); // Refetch data when currentPage changes
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <h3>Test</h3>
      {result.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      <Pagination
        currentpage={currentpage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
      <button onClick={prevPage} disabled={currentpage === 1}>
        Previous Page{" "}
      </button>
      <button onClick={nextPage} disabled={currentpage === totalPages}>
        {" "}
        Next Page{" "}
      </button>
      <div></div>
    </div>
  );
}
