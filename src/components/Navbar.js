import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode}`} style = {{backgroundColor: props.mode === 'light' ? 'lightgrey': props.mode === 'dark' ? 'black' : '#00224e'}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color: props.mode === 'light' ?  'black' : 'white'}}>{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{color: props.mode === 'light' ?  'black' : 'white'}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{color: props.mode === 'light' ?  'black' : 'white'}}>About</Link>
            </li>
          </ul>
          {/* <div className="icon-1 text-center mx-2 my-1">
            <i className="fas fa-palette tg1" onClick={props.toggle1}></i>
          </div>
          <div className="icon-2 text-center mx-2 my-1">
            <i className="fas fa-palette tg2" onClick={props.toggle2}></i>
          </div> */}
          <div className={`form-check form-switch  mx-2 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark mode {props.mode === 'dark' ? 'Off' : 'On'}</label>
          </div>
          <div className={`form-check form-switch  mx-2 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggle1} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Red Yellow mode {props.mode === 'dark' ? 'Off' : 'On'}</label>
          </div>
          
         

        </div>
      </div>
    </nav>

  );
}


Navbar.propTypes = {
  title: PropTypes.string,
}