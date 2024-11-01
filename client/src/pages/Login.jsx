import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux"
import {login, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner";



function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); 

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user, isLoading,isError, isSuccess, message } = useSelector(
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
    e.preventDefault()
    const usersData = { email, password };
    dispatch(login(usersData));
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
          <FaSignInAlt /> Register
        </h1>
        <p>Login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

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
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
