import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BooksList = () => {
  const [bookList, setBookList] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("jwtToken"),
        },
      });
      const result = await response.json();
      setBookList(result);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <div className="body flex-grow-1 px-3 py-3">
        <div className="container-fluid">
          <div className="card p-4 mt-2">
            <div className="card-body">
              <h1>Daftar Buku</h1>
              <hr />
              <div className="justify-content-center text-center">
                <button
                  onClick={() => navigate("/books/add")}
                  className="btn btn-primary col-lg-6 col-12 mt-2 mb-4"
                >
                  Tambah Data
                </button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Judul Buku</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  {bookList &&
                    bookList.length !== 0 &&
                    bookList.map((item, idx) => (
                      <tbody key={item.id}>
                        <tr>
                          <th scope="row">{idx + 1}</th>
                          <td>{item.title}</td>
                          <td>{item.is_returned ? "Ada" : "Dipinjam"}</td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksList;
