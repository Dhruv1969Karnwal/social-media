import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const initailState = {
  email: "",
  password: "",
};

function LogIn() {
  const [userData, setUserData] = useState(initailState);

  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    // console.log(userData)
    dispatch(login(userData));
  };

  return (
    <>
      <div className=" w-100 vh-100 justify-content-center align-items-center d-flex">
        <div className="shadow p-3 mb-5 bg-white rounded ">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email address"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="position-relative"> 
              <input
                type={typePass ? "text" : "password"}
                className="form-control "
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <small
                onClick={() => setTypePass(!typePass)}
                className="cursor-pointer position-absolute top-50 end-0"
              >
                {typePass ? "Hide" : "Show"}
              </small>
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <div className="d-flex justify-content-between align-items-center">

            <button  className="btn btn-primary" disabled={email && password ? false : true}
                    onClick={PostData} type="button">
              Log In
            </button>
            <button className="btn btn-outline-primary" type="button" >
            <NavLink
                      to="/register"
                    >
                      Register
                    </NavLink>
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
