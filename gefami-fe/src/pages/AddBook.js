import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBook = () => {
  const [values, setValues] = useState({
    title: "",
    is_returned: true,
  });
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/book", {
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
        navigate("/books");
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
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={values.title}
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

export default AddBook;
