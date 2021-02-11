import React, { Fragment, useEffect } from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../actions/profile";

function Dashboard({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Min Profil</h1>
      <p className="lead">
        <i className="fas fa-user mr"></i>
        Välkommen {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has profile</Fragment>
      ) : (
        <Fragment>
          <p>Du har inte fyllt i din profil, vänligen fyll i denna</p>
          <Link to='/skapa-profil' className="btn btn-primary my-1">
            Skapa Profil
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
