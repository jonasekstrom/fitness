import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
     <section className="landing">
         <div className="dark-overlay">
             <div className="landing-inner">
                 <h1 className="x-large">Fattest Looser</h1>
                 <p className="lead">Vem blir den okrönte tjockisen</p>
                 <div className="buttons">
                     <Link to="/register" className="btn btn-primary">Registrera</Link>
                     <Link to="/login" className="btn btn-light">Logga in</Link>
                 </div>
             </div>
         </div>
     </section>
    )
}

export default Landing;
