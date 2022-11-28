import React, { Component } from 'react'
import './Styles/TenantsStyles.css'

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
          <div className='tenantsListWrapper d-flex justify-content-center align-items-center'>
            <h1>All Tenants </h1>
            <div className='tenantsContainer'>
                <div className='tenantsListHeaderWrapper'>
                    <h4 className='tenantsListHeader'>Tenants List</h4>
                </div>
                <div className='TenantsContainer'>
                    {this.state.tenants.map((tenant) => {
                        return(
                            <div className='TenantContainer d-flex' key={tenant.id}>
                                <div className='TenantNameWrapper'>
                                    <span className='tenantName'> {tenant.name} </span>
                                </div>
                                <div className='ManageTenantButtonWrapper ml-auto'>
                                    <button className='ManageButton'>Manage</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
    
            </div>
          </div>
        );
      }
}
