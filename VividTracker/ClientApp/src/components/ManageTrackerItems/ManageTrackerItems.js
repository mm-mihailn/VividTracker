import React, { Component } from 'react'
import './Styles/TrackerItemList.css'
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AddTracker } from "../AddTracker/AddTracker"
import TenantContainerComponent from '../TenantContainerComponent/TenantContainerComponent';

export default class ManageTrackerItems extends Component {
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
      await fetch('https://localhost:7091/api/trackers ')
      .then((res) => res.json())
      .then((res) => this.setState({ trackers: res }))
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
            <div className='TrackerContainer'>
                    {this.state.trackers.map((tenant) => {
                        return(
                          <TenantContainerComponent tenantData = {tenant}/>
                        )
                    })}
            </div>
        </div>
      </div>
    )
  }
}
