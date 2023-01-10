import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'
import TenantsComponent from './components/TenantsComponent/TenantsComponent';
import TrackersComponent from './components/TrackersComponent/TrackersComponent';
import {LandingPage} from './components/LandingPage/LandingPage'
import EditTenantComponent from './components/EditTenantComponent/EditTenantComponent';
import TenantTrackerItemsList from './components/TenantTrackerItemsList/TenantTrackerItemsList';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={LandingPage} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/trackers/:id' component={TrackersComponent} />
                <AuthorizeRoute path='/tenantTrackers/:tenantID' component={TenantTrackerItemsList} />
                <AuthorizeRoute path='/tenants' component={TenantsComponent} />
                <AuthorizeRoute path='/editTenant/:id' component={EditTenantComponent} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
