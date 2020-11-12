import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const { email, password } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = e => {
          e.preventDefault();
         console.log('success')
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
              <input type="submit" className="btn btn-primary" value="Register" />
            </div>
          </form>
          <p className="my-1">
            Har du inget konto? <Link to="/register">Registrera konto</Link>
          </p>
        </Fragment>
      );
}

export default Login