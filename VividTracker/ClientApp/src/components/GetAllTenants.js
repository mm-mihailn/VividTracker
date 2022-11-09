import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService'
import { Request } from './DefaultRequest/Request.js'
export default class TenantsComponent extends Component {

    constructor()
    {
        super()
        this.state = {tenants: []}
    }

   async componentDidMount()
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
                            {tenant.id}
                            {tenant.name}
                        </div>
                    )
                })}
    
            </div>
          </div>
        );
    }

    async populateTenants() {
        const data = await Request('GET', '/api/getAllTenants');
        this.setState({ tenants: data })
    }
}
