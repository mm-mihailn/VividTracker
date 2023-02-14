import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/EditTenantStyles.css'
import TenantTrackerComponent from '../TenantTrackerComponent/TenantTrackerComponent';
import InviteUserModal from '../InviteUserModal/InviteUserModal';
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

export default class EditTenantComponent extends Component {
    constructor()
    {
        super()
        this.state = {trackers: [], currentTenantName: '', tenantData: undefined, tenantHeaderName: ''}
    }
    componentDidMount = () =>
    {
        this.getTenantUsers()
        this.getTenantName()
        
    } 

    getTenantUsers = async (tenantId) => {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        tenantId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.getTenantUsers(tenantId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then(async (res) => this.setState({'trackers': await res.json()}))
    }

    getTenantName = async (tenantId) => {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        tenantId = splittedURL[splittedURL.length - 1]
        await fetch(endpoints.getTenantName(tenantId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then(async (res) => 
            {
                let tenantData = await res.json()
                this.setState({'tenantData': tenantData})
                this.setState({'currentTenantName': tenantData.name})
                this.setState({'tenantHeaderName': tenantData.name})
            }
        )
    }

    updateTenantName = async (tenantId) => {
        const token = await authService.getAccessToken();
        let splittedURL = window.location.pathname.split('/')
        tenantId = splittedURL[splittedURL.length - 1]
        this.state.tenantData.name = this.state.currentTenantName
        let result = await fetch(endpoints.updateTenantName(tenantId), 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
             },
            body: JSON.stringify(this.state.tenantData)
        })
        .then(async (res) =>{
            let result = await res.json()
            this.getTenantName(tenantId)
        })
    }
    //TODO reset the tenant's name
    resetTenantName = async (tenantId) => {
        this.getTenantName(tenantId)
    }

    render() {
        return (
            <div className = 'EditTenantWrapper d-flex justify-content-center align-items-center'>
              <div className = 'EditTenantContainer'>
                  <div className = 'TenantHeaderWrapper d-flex'>
                      <h4 className = 'TenantName pageText'>{this.state.tenantHeaderName}</h4>
                      <FontAwesomeIcon className = 'EditTenantIcon' icon = {faPenToSquare}/>
                  </div>
                  <div className = 'TenantFormWrapper'>
                      <div className = 'TenantFormContainer'>
                          <div className = 'TenantFieldsContainer d-flex'>
                              <label className = 'TenantNameLabel pageText'>Tenant Name:</label>
                              <input className = 'TenantNameInputField form-control' type = 'text' value={this.state.currentTenantName} onChange = {(e) => this.setState({'currentTenantName': e.target.value})}/>
                          </div>
                          <div className='TenantButtons'>
                              <span className='ResetButton' onClick={() => this.resetTenantName()}>Reset</span>
                              <button className='UpdateButton' onClick={() => this.updateTenantName()}>Update</button>
                          </div>
                      </div>
                  </div>
                  <div className = 'TenantUsersWrapper'>
                      <div className = 'TenantUsersHeader d-flex'>
                          <p className='TenantsHeader'>Users</p>
                          <FontAwesomeIcon className = 'EditUsersIcon' icon = {faRectangleList}/>
                      </div>
                  </div>
                  <div className = 'InviteNewUserWrapper'>
                      <InviteUserModal/>
                  </div>
                  <div className = 'TenantTrackersWrapper'>
                      {this.state.trackers.length >= 1 ?
                          this.state.trackers.map(tracker => {
                          return (
                              <TenantTrackerComponent tracker = {tracker} key={tracker.id}/>
                          )
                      })
                      :
                      <p className='NoUsersMessage pageText'>Users do not exist for this tenant.</p>
                      }
                  </div>
              </div>
            </div>
        );
    }
}
