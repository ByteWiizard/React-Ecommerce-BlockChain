import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import  Connect  from "./Connect";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {

    const [Details, setDetails] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [country, setCountry] = useState('');
    const [State, setState] = useState('');
    const [Zip, setZip] = useState('');

    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    const DetailsCheck = () => {
      setDetails(true);
    }
    return (
      <>

        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" novalidate>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label for="firstName" className="form-label">
                          First name
                        </label>
                        {!Details ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="John"
                              required
                              value={firstName}
                              onChange={(event) => {
                                setFirstName(event.target.value)

                              }}
                            />
                          </React.Fragment>) : (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder=""
                              disabled
                              value={firstName}

                            />
                          </React.Fragment>
                        )

                        }
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>

                      <div className="col-sm-6 my-1">
                        <label for="lastName" className="form-label">
                          Last name
                        </label>
                        {!Details ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder="Doe"
                              required
                              value={lastName}
                              onChange={(event) => {
                                setLastName(event.target.value)
                              }}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder=""
                              disabled
                              value={lastName}
                            />
                          </React.Fragment>
                        )}
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="email" className="form-label">
                          Email
                        </label>
                        {!Details ? (
                          <React.Fragment>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="JohnDoe@gmail.com"
                              required
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value)
                              }}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder=""
                              disabled
                              value={email}

                            />
                          </React.Fragment>
                        )}

                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label">
                          Address
                        </label>
                        {!Details ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder="1234 Main St"
                              required
                              value={address}
                              onChange={(event) => {
                                setAddress(event.target.value)
                              }}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder=""
                              disabled
                              value={address}

                            />
                          </React.Fragment>
                        )}

                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="address2" className="form-label">
                          Address 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>

                        {!Details ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="address2"
                              placeholder="Apartment, studio, or floor"
                              value={address2}
                              onChange={(event) => {
                                setAddress2(event.target.value)
                              }}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="address2"
                              placeholder=""
                              disabled
                              value={address2}

                            />
                          </React.Fragment>
                        )}
                      </div>

                      <div className="col-md-5 my-1">
                        <label for="country" className="form-label">
                          Country
                        </label>
                        <br />

                        {!Details ? (
                          <React.Fragment>
                            <select className="form-select" id="country" required
                              onChange={(event)=>{setCountry(event.target.value)}}
                              value={country}
                            >
                              <option value="">Choose...</option>
                              <option>India</option>
                            </select>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <select className="form-select" id="country" disabled
                              value={country}
                            >
                              <option value="">Choose...</option>
                              <option>India</option>
                            </select>
                          </React.Fragment>
                        )}

                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label for="state" className="form-label">
                          State
                        </label>
                        <br />
                        {!Details ? (
                          <React.Fragment>
                            <select className="form-select" id="state" required
                              onChange={(event)=>{setState(event.target.value)}}
                              value={State}
                            >
                              <option value="">Choose...</option>
                              <option>Punjab</option>
                            </select>
                          </React.Fragment>
                        ):(
                          <React.Fragment>
                            <select className="form-select" id="state" disabled
                              value={State}
                            >
                              <option value="">Choose...</option>
                              <option>Punjab</option>
                            </select>
                          </React.Fragment>
                        )}
                        
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>

                      <div className="col-md-3 my-1">
                        <label for="zip" className="form-label">
                          Zip
                        </label>

                        {!Details ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="zip"
                              placeholder="12345"
                              required
                              value={Zip}
                              onChange={(event) => {
                                setZip(event.target.value)
                              }}
                            />
                          </React.Fragment>
                        ):(
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              id="zip"
                              placeholder=""
                              disabled
                              value={Zip}

                            />
                          </React.Fragment>
                        )}
                       
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>

                      <button
                        className="w-100 btn btn-primary"
                        type="submit"
                        onClick={(event) => {
                          event.preventDefault();
                          DetailsCheck()
                          event.target.setAttribute("disabled", true);
                        }
                        }
                      > Confirm Billing Address</button>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>
                        <Connect Amount={Math.round(subtotal + shipping)}/>
                    <hr className="my-4" />


                    <button
                      className="w-100 btn btn-primary"
                      type="submit" disabled
                    >
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
