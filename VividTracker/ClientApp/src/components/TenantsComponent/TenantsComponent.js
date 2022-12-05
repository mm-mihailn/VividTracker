import React, { Component } from 'react'
import './Styles/TenantsStyles.css'
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default class TenantsComponent extends Component {

    constructor()
    {
        super()
        this.state = {tenants: []}
    }

    async componentDidMount()
    {
        await fetch('https://localhost:7091/api/tenants ')
        .then((res) => res.json())
        .then((res) => this.setState({tenants: res}))
    
    }
    render () {
        return (
          <div className='tenantsListWrapper d-flex justify-content-center align-items-center'>
            <h1>All Tenants </h1>
            <div className='tenantsContainer'>
                <div className='tenantsListHeaderWrapper d-flex'>
                    <h4 className='tenantsListHeader'>Tenants List</h4>
                    <FontAwesomeIcon className='tenantsListEditButton' icon={faRectangleList} />
                </div>
                <div className='CreateNewTenantButtonWrapper'>
                        <span className='CreateNewTenantButton pageText'>CreateNewTenant()</span>
                </div>
                <div className='TenantsContainer'>
                    {this.state.tenants.map((tenant) => {
                        return(
                            <div className='TenantContainer d-flex' key={tenant.id}>
                                <div className='TenantNameWrapper'>
                                    <span className='tenantName pageText'> {tenant.name} </span>
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
