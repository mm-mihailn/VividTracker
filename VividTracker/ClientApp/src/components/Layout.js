import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { LoginMenu } from './api-authorization/LoginMenu';
import { Home } from './Home';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
            <NavMenu />
            <Home/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
