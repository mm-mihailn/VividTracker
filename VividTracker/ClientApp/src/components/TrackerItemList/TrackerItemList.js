import React, { Component } from 'react'
import './Styles/TrackerItemList.css'
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AddTracker } from "../AddTracker/AddTracker"

export default class TrackerItemList extends Component {
  render() {
    return (
        <div className='TrackersListWrapper d-flex justify-content-center align-items-center'>
        <h1>All Tenants </h1>
        <div className='trackersContainer'>
            <div className='trackersListHeaderWrapper d-flex'>
                <h4 className='trackersListHeader'>Trackers List</h4>
                <FontAwesomeIcon className='trackersListEditButton' icon={faRectangleList} />
            </div>
                <div className='CreateNewTrackerButtonWrapper'>
                     <AddTracker onTrackerAdded={this.loadTenants} />
                </div>
            <div className='TrackerContainer'>
                    {/* {this.state.tenants.map((tenant) => {
                        return(
                        <TenantContainerComponent tenantData = {tenant}/>
                        )
                    })} */}
            </div>
        </div>
      </div>
    )
  }
}
