import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/EditTenantStyles.css'

export default class EditTenantComponent extends Component {
    constructor()
    {
        super()
        this.state = {trackers: []}
    }
    async componentDidMount()
    {
        await fetch('https://localhost:7091/api/users')
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
                {this.state.trackers.map(tracker => {
                    return (
                        <div className = 'TenantTracker d-flex' key={tracker.id}>
                                <div className='TenantTrackerNameWrapper'>
                                    <span className='TenantTrackerName pageText'> {tracker.userName} </span>
                                </div>
                                <div className='TenantTrackerButtonsContainer'>
                                    <div className='UseTenantTrackerButtonWrapper'>
                                        <span className='UseTenantButton pageText'>Use</span>
                                    </div>
                                    <div className='ManageTenantTrackerButtonWrapper'>
                                        <button className='ManageTenantTrackerButton'>Manage</button>
                                    </div>
                                </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    )
  }
}
