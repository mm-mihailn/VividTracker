import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/EditTenantStyles.css'
import TenantTrackerComponent from '../TenantTrackerComponent/TenantTrackerComponent';
import InviteUserModal from '../InviteUserModal/InviteUserModal';

export default class EditTenantComponent extends Component {
    constructor()
    {
        super()
        this.state = {trackers: [], currentTenantName: '', tenantData: undefined}
    }
    componentDidMount = () =>
    {
        this.getTenantUsers()
        this.getTenantName()
        
    } 

    getTenantUsers = async() => {
        let splittedURL = window.location.pathname.split('/')
        let targetTenantID = splittedURL[splittedURL.length - 1]
        await fetch(`https://localhost:7091/api/users/${Number(targetTenantID)}`)
        .then(async (res) => this.setState({'trackers': await res.json()}))
    }

    getTenantName = async() => {
        let splittedURL = window.location.pathname.split('/')
        let targetTenantID = splittedURL[splittedURL.length - 1]
        await fetch(`https://localhost:7091/api/tenant/${Number(targetTenantID)}`)
        .then(async (res) => 
            {
                let tenantData = await res.json()
                this.setState({'tenantData': tenantData})
                this.setState({'currentTenantName': tenantData.name})
            }
        )
    }

    updateTenantName = async() => {
        let splittedURL = window.location.pathname.split('/')
        let targetTenantID = splittedURL[splittedURL.length - 1]
        this.state.tenantData.name = this.state.currentTenantName
        let result = await fetch(`https://localhost:7091/api/edit/${Number(targetTenantID)}`, 
        {
            method: 'PATCH',
            headers: {
             'Content-Type': 'application/json',
             },
            body: JSON.stringify(this.state.tenantData)
        })
        .then(async (res) =>{
            let result = await res.json()
            console.log(result)
        })

        window.location.reload()
    }
    
    render() {
        return (
            //<div className = 'EditTenantWrapper d-flex justify-content-center align-items-center'>
            //  <div className = 'EditTenantContainer'>
            //      <div className = 'TenantHeaderWrapper d-flex'>
            //          <h4 className = 'TenantName pageText'>Tenant Name</h4>
            //          <FontAwesomeIcon className = 'EditTenantIcon' icon = {faPenToSquare}/>
            //      </div>
            //      <div className = 'TenantFormWrapper'>
            //          <div className = 'TenantFormContainer'>
            //              <div className = 'TenantFieldsContainer d-flex'>
            //                  <label className = 'TenantNameLabel pageText'>Tenant Name:</label>
            //                  <input className = 'TenantNameInputField form-control' type = 'text' value={this.state.currentTenantName} onChange = {(e) => this.setState({'currentTenantName': e.target.value})}/>
            //              </div>
            //              <div className='TenantButtons'>
            //                  <span className='ResetButton'>Reset</span>
            //                  <button className='UpdateButton' onClick={() => this.updateTenantName()}>Update</button>
            //              </div>
            //          </div>
            //      </div>
            //      <div className = 'TenantUsersWrapper'>
            //          <div className = 'TenantUsersHeader d-flex'>
            //              <p className='TenantsHeader'>Users</p>
            //              <FontAwesomeIcon className = 'EditUsersIcon' icon = {faRectangleList}/>
            //          </div>
            //      </div>
            //      <div className = 'InviteNewUserWrapper'>
            //          <InviteUserModal/>
            //      </div>
            //      <div className = 'TenantTrackersWrapper'>
            //          {this.state.trackers.length >= 1 ?
            //              this.state.trackers.map(tracker => {
            //              return (
            //                  <TenantTrackerComponent tracker = {tracker}/>
            //              )
            //          })
            //          :
            //          <p className='NoUsersMessage pageText'>Users do not exist for this tenant.</p>
            //          }
            //      </div>
            //  </div>
            //</div>
            <div className='editTrackerWrapper d-flex justify-content-center align-items-center'>
                <div className='editTrackerContainer'>
                    <div className='trackerHeaderWrapper d-flex'>
                        <h4 className='trackerName pageText'>New Tracker</h4>
                        <FontAwesomeIcon className='editTrackerIcon' icon={faPenToSquare} />
                    </div>
                    <div className='trackerFormWrapper'>
                        <div className='trackerFormContainer'>
                            <div className='trackerFieldsContainer d-flex'>
                                <label className='trackerNameLabel pageText'>Tracker Name:</label>
                                <input className='trackerNameInputField form-control' type='text' value={this.state.trackerName} onChange={(e) => this.setState({ 'trackerName': e.target.value })} />

                                <label className='recordNameLabel pageText'>Record Name:</label>
                                <input className='recordNameInputField form-control' type='text' value={this.state.recordName} onChange={(e) => this.setState({ 'recordName': e.target.value })} />
                            </div>
                            <div className='trackerButtons'>
                                <button className='saveButton' onClick={() => this.updateTenantName()}>Save</button>
                                <button className='cancelButton'>
                                    <a href={`https://localhost:44430/tenants`}>Cancel</a>
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
        );
    }
=======
            <div className = 'TenantUsersWrapper'>
                <div className = 'TenantUsersHeader d-flex'>
                    <p className='TenantsHeader'>Users</p>
                    <FontAwesomeIcon className = 'EditUsersIcon' icon = {faRectangleList}/>
                </div>
            </div>
            <div className = 'InviteNewUserWrapper'>
                <InviteUserModal/>
                {/*<span className='InviteNewUser pageText'> InviteNewUser() </span>  */}
            </div>
            <div className = 'TenantTrackersWrapper'>
                {this.state.trackers.length >= 1 ? 
                    this.state.trackers.map(tracker => {
                    return (
                        // TODO: Rename component to TenantUser!
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
>>>>>>> main
}
