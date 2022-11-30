import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const initailState = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  cf_password: "",
  gender: "male",
};

function Register() {
  const [userData, setUserData] = useState(initailState);

  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(register(userData));
  };
  return (
    // <section className="bg-gray-50">
    <div className=" w-100 vh-100 justify-content-center align-items-center d-flex">
      <div className="shadow p-3 mb-5 bg-white rounded ">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-700 md:text-2xl ">
          Create your account
        </h1>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-black">
              FullName
            </label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="name"
              required=""
              onChange={handleChange}
              value={fullname}
              style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
            />
            <strong className="font-medium text-xs text-red-500">
              {alert.fullname ? alert.fullname : ""}
            </strong>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-black">
              UserName
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="name"
              required=""
              onChange={handleChange}
              value={username.toLowerCase().replace(/ /g, "")}
              style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
            />
            <strong className="font-medium text-xs text-red-500">
              {alert.username ? alert.username : ""}
            </strong>
          </div>
          <div>
            <label>Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="name@company.com"
              required=""
              onChange={handleChange}
              value={email}
              style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
            />
            <strong className="font-medium text-xs text-red-500">
              {alert.email ? alert.email : ""}
            </strong>
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium  ">Password</label>
            <input
              type={typePass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="form-control"
              required=""
              onChange={handleChange}
              value={password}
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
            />
            <strong className="font-medium text-xs text-red-500">
              {alert.password ? alert.password : ""}
            </strong>
            <small
              onClick={() => setTypePass(!typePass)}
              className="cursor-pointer absolute top-[50%] right-3 translate-y-1/3"
            >
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium ">
              Confirm password
            </label>
            <input
              type={typeCfPass ? "text" : "password"}
              name="cf_password"
              id="cf_password"
              placeholder="••••••••"
              className="form-control"
              required=""
              onChange={handleChange}
              value={cf_password}
              style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
            />
            <strong className="font-medium text-xs text-red-500">
              {alert.cf_password ? alert.cf_password : ""}
            </strong>
            <small
              onClick={() => setTypeCfPass(!typeCfPass)}
              className="cursor-pointer absolute top-[50%] right-3 translate-y-1/3"
            >
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium ">Gender</label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault1"
                value="male"
                checked
                onChange={handleChange}
              />
              <label className="form-check-label">
                male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault2"
                value="female"
                onChange={handleChange}
              />
              <label className="form-check-label" >
                female
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault3"
                value="others"
                onChange={handleChange}
              />
              <label className="form-check-label" >
                others
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={PostData}
          >
            Create an account
          </button>
          <p className="text-sm font-semibold mt-2 pt-1 mb-0">
            Already have an account?
            <Link to="/" className="text-blue-600">
              LogIn here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
