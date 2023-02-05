import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import '../../custom.css'
import { endpoints } from '../../endpoints';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
           
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        let pageLocationSplitted = window.location.href.split('/')
        const tenantId = pageLocationSplitted[pageLocationSplitted.length - 1]
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" id="trackerBtn" to={`/trackersList/${Number(tenantId)}`}>Trackers</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" id="tenantBtn" to={'/tenants'}>Tenants</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" id="loginBtn" to={logoutPath}>Logout</NavLink>
            </NavItem>
        </Fragment>);

    }

    anonymousView(loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink id="loginBtn" tag={Link} className="text-dark" to={loginPath}>Log In</NavLink>
            </NavItem>
        </Fragment>);
    }
}
