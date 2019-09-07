import React from "react"
import { Link } from 'react-router-dom';
import {Footer} from 'react-materialize';

class Rt_Footer extends React.Component{
  render(){
    return (
    <div>
      {this.props.children}
      <Footer copyrights="&copy; 2015 Copyright Text"
          moreLinks={
            <Link className="grey-text text-lighten-4 right" href="#!">More Links</Link>
          }
          links={
            <ul>
              <li><Link to="/About Us" className="grey-text text-lighten-3">About Us</Link></li>
              <li><Link to="/Terms & Conditions" className="grey-text text-lighten-3">Terms & Conditions</Link></li>
              <li><Link to="/Help" className="grey-text text-lighten-3">Help</Link></li>
              <li><Link to="/Contact Us" className="grey-text text-lighten-3">Contact Us</Link></li>
            </ul>
          }
          className='example'
      >
        <h5 className="white-text">Footer Content</h5>
        <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
      </Footer>
    </div>
    );
  }
}

export default Rt_Footer
