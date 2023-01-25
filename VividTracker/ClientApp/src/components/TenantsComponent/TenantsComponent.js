import React, { Component } from 'react'
import './Styles/TenantsStyles.css'
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AddTenant } from "../AddTenant/AddTenant.js"
import TenantContainerComponent from '../TenantContainerComponent/TenantContainerComponent';
import { endpoints } from '../../endpoints';

export default class TenantsComponent extends Component {

    constructor(props)
    {
        super(props)
        this.state = { tenants: [] }
        this.loadTenants = this.loadTenants.bind(this);
    }
    async componentDidMount()
    {
        this.loadTenants();
    }
    async loadTenants() {
        await fetch(endpoints.loadTenants())
        .then((res) => res.json())
        .then((res) => this.setState({ tenants: res }))
    }
    render () {
        return (
          <div className='tenantsListWrapper d-flex justify-content-center align-items-center'>
            <h1>All Tenants </h1>
                <div className='tenantsContainer'>
                    <div className='tenantsContent'>
                        <div className='tenantsListHeaderWrapper d-flex'>
                            <h4 className='tenantsListHeader'>Tenants List</h4>
                            <FontAwesomeIcon className='tenantsListEditButton' icon={faRectangleList} />
                        </div>
                        <div className='CreateNewTenantButtonWrapper'>
                            <AddTenant onTenantAdded={this.loadTenants} />
                        </div>
                        <div className='TenantsContainer'>
                            {this.state.tenants.map((tenant) => {
                                return (
                                    <TenantContainerComponent tenantData={tenant} />
                                )
                            })}
                        </div>
                    </div>
                </div>
          </div>

           
        );
    }
}
