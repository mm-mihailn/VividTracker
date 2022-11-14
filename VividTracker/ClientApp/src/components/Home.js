import React, { Component } from 'react';
import '../Styles/HomeStyle.css'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <footer id='footer'>
                <div id="team-info">
                    <ul>
                        <li>Blagovest Damyanov</li>
                        <li>Martin Yordanov</li>
                        <li>Maetin Marinov</li>
                        <li>Veli Ashikov</li>
                        <li>Mihail Nikolov</li>
                    </ul>
                </div>
            </footer>
        );
    }
}
