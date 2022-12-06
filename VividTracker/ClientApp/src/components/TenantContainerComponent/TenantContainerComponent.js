import React, { Component } from 'react'
import './Styles/TenantContainerStyles.css'

export default class TenantContainerComponent extends Component {
    
  render() {
    return (
        <div className='TenantContainer d-flex' key={this.props.tenantData.id}>
            <div className='TenantNameWrapper'>
                <span className='tenantName pageText'> {this.props.tenantData.name} </span>
            </div>
            <div className='ManageTenantButtonWrapper ml-auto'>
                <button className='ManageButton'>Manage</button>
            </div>
    </div>
    )
  }
}
