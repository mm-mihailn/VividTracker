import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService'
import { Request } from './DefaultRequest/Request.js'
export default class TenantsComponent extends Component {

    constructor() {
        super()
        this.state = { tenant: [] }
    }

    async componentDidMount() {
        this.populateTenantById();
    }
     
    render() {
        return (
            <div>
                <h1>Tenant </h1>
                <input type='number' />
                <button id='show'>Show Tenant</button>
                <div className='tenant'>
                    {this.state.tenant.map((tenant) => {
                        return (
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

    async populateTenantById() {
        const data = await Request('GET', '/api/getTenantById');
        this.setStet({ tenant:data})
    }
}
