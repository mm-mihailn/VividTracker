import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService'

export default class TenantsComponent extends Component {

    constructor()
    {
        super()
        this.state = {tenants: []}
    }

    componentDidMount()
    {
        this.populateTenants();
    }
    render () {
        return (
          <div>
            <h1>All Tenants </h1>
            <div className='tenants'>
                {this.state.tenants.map((tenant) => {
                    return(
                        <div key={tenant.id}>
                            {tenant.name}
                        </div>
                    )
                })}
    
            </div>
          </div>
        );
    }

    async populateTenants() {
        const response = await fetch('https://localhost:7091/api/getAllTenants');
        const data = await response.json();
        this.setState({ tenants: data});
    }
}
