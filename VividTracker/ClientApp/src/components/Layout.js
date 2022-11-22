import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Footer } from '../components/Footer/Footer.js';
import { NavMenu } from './Navigation/NavMenu.js';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />

            {this.props.children}

         <Footer/>
      </div>
    );
  }
}
