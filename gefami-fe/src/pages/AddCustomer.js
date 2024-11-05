import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCustomer = () => {
  const [values, setValues] = useState({
    name: "",
    phone_number: "",
    book_title: "",
    in_date: "",
    out_date: "",
    is_late: false,
  });
  const [books, setBooks] = useState([]);
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
      setBooks(result);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.status === 422) {
        toast.error(result);
      } else {
        toast.success("Data Successfully Added");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <div className="body flex-grow-1 px-3 py-3">
        <div className="container-fluid">
          <div className="card p-4 mt-2">
            <div className="card-body">
              <h1>Tambah Daftar Peminjam Buku</h1>
              <hr />
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-lg-2 col-12">Judul Buku</div>
                  <div className="col-lg-4 col-12">
                    {books && books.length !== 0 && (
                      <>
                        <input
                          list="dataBooks"
                          className="form-control select"
                          name="book_title"
                          value={values.book_title}
                          onChange={onChange}
                        />
                        <datalist id="dataBooks">
                          {books.map((item) => (
                            <option key={item.id} value={item._title}>
                              {item.title}
                            </option>
                          ))}
                        </datalist>
                      </>
                    )}
                  </div>
                  <div className="col-lg-2 col-12">Nama</div>
                  <div className="col-lg-4 col-12">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={values.name}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-2 col-12">No Telp</div>
                  <div className="col-lg-4 col-12">
                    <input
                      type="text"
                      className="form-control"
                      name="phone_number"
                      value={values.phone_number}
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-lg-2 col-12">Tanggal Pinjam</div>
                  <div className="col-lg-4 col-12">
                    <input
                      type="date"
                      className="form-control"
                      name="in_date"
                      value={values.in_date}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-2 col-12">Tanggal Pengembalian</div>
                  <div className="col-lg-4 col-12">
                    <input
                      type="date"
                      className="form-control"
                      name="out_date"
                      value={values.out_date}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="justify-content-center text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary col-lg-6 col-12"
                  >
                    Tambah Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
