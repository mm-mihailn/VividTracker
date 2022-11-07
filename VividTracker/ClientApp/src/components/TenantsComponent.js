import React, { Component } from 'react'

export default class TenantsComponent extends Component {

    constructor()
    {
        super()
        this.state = {tenants: []}
    }

    componentDidMount()
    {
        fetch('https://localhost:7091/api/getAllTenants')
        .then((res) => res.json())
        .then((res) => this.setState({tenants: res}))
    
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
}
