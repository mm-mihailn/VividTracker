import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/EditTenantStyles.css'
import TenantTrackerComponent from '../TenantTrackerComponent/TenantTrackerComponent';

export default class EditTenantComponent extends Component {
    constructor()
    {
        super()
        this.state = {trackers: []}
    }
    async componentDidMount()
    {
        let splittedURL = window.location.pathname.split('/')
        let targetTenantID = splittedURL[splittedURL.length - 1]
        await fetch(`https://localhost:7091/api/users/${Number(targetTenantID)}`)
        .then((res) => res.json())
        .then((res) => this.setState({trackers: res}))
    } 
  render() {
    return (
      <div className = 'EditTenantWrapper d-flex justify-content-center align-items-center'>
        <div className = 'EditTenantContainer'>
            <div className = 'TenantHeaderWrapper d-flex'>
                <h4 className = 'TenantName pageText'>Tenant Name</h4>
                <FontAwesomeIcon className = 'EditTenantIcon' icon = {faPenToSquare}/>
            </div>
            <div className = 'TenantFormWrapper'>
                <div className = 'TenantFormContainer'>
                    <div className = 'TenantFieldsContainer d-flex'>
                        <label className = 'TenantNameLabel pageText'>Tenant Name:</label>
                        <input className = 'TenantNameInputField form-control' type = 'text' />
                    </div>
                    <div className='TenantButtons'>
                        <span className='ResetButton'>Reset</span>
                        <button className='UpdateButton'>Update</button>
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
                <span className='InviteNewUser pageText'> InviteNewUser() </span>
            </div>
            <div className = 'TenantTrackersWrapper'>
                {this.state.trackers.length >= 1 ? 
                    this.state.trackers.map(tracker => {
                    return (
                        <TenantTrackerComponent tracker = {tracker}/>
                    )
                })
                :
                <p className='NoUsersMessage pageText'>Users do not exist for this tenant.</p>
                }
            </div>
        </div>
      </div>
    )
  }
}
