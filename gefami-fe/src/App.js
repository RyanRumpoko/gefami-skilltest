import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthRoute, AuthLogin } from "./util/AuthRoute";
import CustomerList from "./pages/CustomerList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import AddCustomer from "./pages/AddCustomer";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path="/login"
          name="Login Page"
          element={
            <AuthLogin>
              <Login />
            </AuthLogin>
          }
        />
        <Route
          exact
          path="/register"
          name="Register Page"
          element={
            <AuthLogin>
              <Register />
            </AuthLogin>
          }
        />
        <Route
          exact
          path="/books/add"
          name="Add Books"
          element={
            <AuthRoute>
              <Navbar />
              <AddBook />
            </AuthRoute>
          }
        />
        <Route
          exact
          path="/books"
          name="Books List"
          element={
            <AuthRoute>
              <Navbar />
              <BooksList />
            </AuthRoute>
          }
        />
        <Route
          exact
          path="/customer/add"
          name="Add Customer"
          element={
            <AuthRoute>
              <Navbar />
              <AddCustomer />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          name="Home"
          element={
            <AuthRoute>
              <Navbar />
              <CustomerList />
            </AuthRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
