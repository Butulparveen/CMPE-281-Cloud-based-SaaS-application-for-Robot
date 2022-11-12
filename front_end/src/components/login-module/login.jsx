import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "../../actions/user.action"
import { useHistory } from "react-router-dom";
import backImage from "./BackgroundImage.jpeg";
import "./login.css";

export const mapStatetoProps = user => ({
  user
})

function Login() {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  // const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user);
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  return (
    <div className="Login-component">
      <div className="col-lg-8 offset-lg-2" style={{ color:'#ed8936',fontWeight: 'bold' ,width: "30%", marginLeft: "5%", marginTop: "10%", borderStyle: "groove", borderRadius: "20px" }}>
        <br />
        <br />
        <br />
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
            {submitted && !username &&
              <div className="invalid-feedback">Username is required</div>
            }
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
            {submitted && !password &&
              <div className="invalid-feedback">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary"style={{ color:'black',fontWeight: 'bold'}}>
              Login
                </button>
            <Link to="/register" className="btn btn-link"style={{ color:'black',fontWeight: 'bold'}}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
