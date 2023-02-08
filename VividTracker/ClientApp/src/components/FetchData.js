import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import TenantContainerComponent from './TenantContainerComponent/TenantContainerComponent';

export class FetchData extends Component {
    static displayName = FetchData.name;

    //constructor(props) {
    //    super(props);
    //      this.state = { tenants: [], loading: true };
    //      this.state = { trackers: [], loading: true };
    //}

    //componentDidMount() {
    //  this.authorizeEndpoints();
    //}

    //static renderTenants(tenants) {
    //    return (
    //        <div>
    //            {tenants.map((tenant) => {
    //                return (
    //                    <TenantContainerComponent key={tenant.id} tenantData={tenant} />
    //                )
    //            })}
    //        </div>
    //    );
    //}

    //render() {
    //    let contents = this.state.loading
    //        ? <p><em>Loading...</em></p>
    //        : FetchData.renderTenants(this.state.tenants);

    //    return (
    //        <div>
    //            {contents}
    //        </div>
    //    );
    //}

    //async authorizeEndpoints() {
    //    const token = await authService.getAccessToken();
    //    const response = await fetch('vividtracker', {
    //        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    //    });
    //    const data = await response.json();
    //    this.setState({ tenants: data, loading: false });
    //    this.setState({ trackers: data, loading: false });
    //}
}
