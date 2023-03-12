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
import { LandingPage } from './components/LandingPage/LandingPage'
import EditTenantComponent from './components/EditTenantComponent/EditTenantComponent';
import { AddTracker } from './components/AddTracker/AddTracker';
import TenantTrackerItemsList from './components/TenantTrackerItemsList/TenantTrackerItemsList';
import ManageTracker from './components/ManageTracker/ManageTracker';
import ManageTrackerItemDetails from './components/ManageTrackerItemDetails/ManageTrackerItemDetails';
import CreateTrackerItemDetails from './components/CreateTrackerItemDetails/CreateTrackerItemDetails';
import UseTrackerWrapper from './components/UseTrackerWrapper/UseTrackerWrapper';
import PanelComponent from './components/PanelComponent/PanelComponent';
import { Panel } from './components/Panel/Panel';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={LandingPage} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/tenantTrackers/:tenantID' component={TenantTrackerItemsList} />
                <AuthorizeRoute path='/useTracker/:trackerID' component={UseTrackerWrapper} />
                <AuthorizeRoute path='/manageTracker/:trackerID' component={ManageTracker} />
                <AuthorizeRoute path='/manageTrackerItemDetails/:trackerItemID' component={ManageTrackerItemDetails} />
                <AuthorizeRoute path='/createTrackerItemDetail/:trackerID' component={CreateTrackerItemDetails} />
                <AuthorizeRoute path='/tenants' component={TenantsComponent} />
                <AuthorizeRoute path='/editTenant/:id' component={EditTenantComponent} />
                <AuthorizeRoute path='/createTrackingGroup' component={AddTracker} />
                <AuthorizeRoute path='/trackersList' component={TrackersComponent} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <AuthorizeRoute path='/panel' component={Panel} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}