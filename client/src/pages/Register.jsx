import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    // Redirect when loggedIn
    if(isSuccess || user){
      navigate("/")
    }

    dispatch(reset())
  }, [isError, isSuccess,message, user, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const usersData = { name, email, password };
      dispatch(register(usersData));
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter password"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              placeholder="Confirm password"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
