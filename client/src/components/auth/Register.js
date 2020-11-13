import React, { Fragment, useState } from "react";
import {connect} from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types'



const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault();
      if(password !== password2){
          setAlert('Lösnorden matchar inte', 'danger')
      } else {
          register({name,email,password});
      }
  }
        // Redirect when correctly registered
        if(isAuthenticated){
          return <Redirect to="/dashboard" />
        }
  
  return (
    <Fragment>
      <h1 className="large text-primary">Registrera</h1>
      <p className="lead">
        <i className="fas fa-user mr"></i>Skapa nytt konto
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Namn"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Epost"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Lösenord"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Bekräfta lösenord"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>
      <p className="my-1">
        Har du redan ett konto? <Link to="/login">Logga in</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);
