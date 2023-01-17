import React, { Component } from 'react'
import './Styles/TrackerItemList.css'
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AddTracker } from "../AddTracker/AddTracker"
import TrackerContainerComponent from '../TrackerContainer/TrackerContainer';

export default class TenantTrackerItemsList extends Component {
  constructor(props)
  {
      super(props)
      this.state = { trackers: [] }
      this.loadTrackers = this.loadTrackers.bind(this);
  }
  async componentDidMount()
  {
      this.loadTrackers();
  }
  async loadTrackers() {
        let splittedURL = window.location.pathname.split('/')
        let targetTenantID = splittedURL[splittedURL.length - 1]
        await fetch(`https://localhost:7091/api/trackingItems/${Number(targetTenantID)}`)
        .then(async (res) => 
            {
                let tenantData = await res.json()
                this.setState({'trackers': tenantData.trackingItems})
            }
        )
  }
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
                     <AddTracker onTrackerAdded={this.loadTrackers} />
                </div>
            {this.state.trackers.length >= 1 ?
            <div className='TrackersContainer'>
                    {this.state.trackers.map((tracker) => {
                        return(
                          <TrackerContainerComponent TrackerData = {tracker}/>
                        )
                    })}
            </div>
            :
            <div className='TrackersContainer'>
              <p>No trackers found for this tenant.</p>
            </div>

            }
        </div>
      </div>
    )
  }
}
