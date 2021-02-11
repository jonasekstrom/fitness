import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {createProfile} from '../../actions/profile';

const CreateProfile = ({createProfile, history}) => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
  });

  const { age, height } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history)
    }

  return (
    <Fragment>
      <h1 className="large text-primary">Skapa din profil</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="number"
            placeholder="Ålder"
            name="age"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Längd"
            name="height"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">anges i centimeter</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light py-1">
          Gå Tillbaka
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, {createProfile})(withRouter(CreateProfile));
