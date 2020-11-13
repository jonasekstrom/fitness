import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const { email, password } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = e => {
          e.preventDefault();
         login(email,password);
      }

      // Redirect when logged in
      if(isAuthenticated){
        return <Redirect to="/dashboard" />
      }

      return (
        <Fragment>
          <h1 className="large text-primary">Logga in</h1>
          <p className="lead">
            <i className="fas fa-user mr"></i>Logga in på ditt konto
          </p>
          <form className="form" onSubmit={e => onSubmit(e)}>
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
              <input type="submit" className="btn btn-primary" value="Logga in" />
            </div>
          </form>
          <p className="my-1">
            Har du inget konto? <Link to="/register">Registrera konto</Link>
          </p>
        </Fragment>
      );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)