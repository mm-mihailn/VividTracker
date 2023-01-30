import React, { Component } from 'react'
import './Styles/TrackerItemList.css'
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AddTracker } from "../AddTracker/AddTracker"
import TrackerContainerComponent from '../TrackerContainer/TrackerContainer';
import { endpoints } from '../../endpoints';
import {Link} from 'react-router-dom'

export default class TenantTrackerItemsList extends Component {
  constructor(props)
  {
      super(props)
      this.state = { trackers: [], tenantID: null }
      this.loadTrackers = this.loadTrackers.bind(this);
  }
  async componentDidMount()
  {
      this.loadTrackers();
  }
  async loadTrackers(tenantId) {
        let splittedURL = window.location.pathname.split('/')
        tenantId = splittedURL[splittedURL.length - 1]
        this.setState({'tenantID': tenantId})
        await fetch(endpoints.loadTrackers(tenantId))
        .then(async (res) => 
            {
                let tenantTrackers = await res.json()
                
                this.setState({'trackers': tenantTrackers})
            }
        )
        .catch((err) => {
          console.log(err)
        })
  }
  render() {
    return (
      <div className='TrackersListWrapper d-flex justify-content-center align-items-center'>
        <div className='trackersContainer'>
            <div className='trackersListHeaderWrapper d-flex'>
                <h4 className='trackersListHeader'>Trackers List</h4>
                <FontAwesomeIcon className='trackersListEditButton' icon={faRectangleList} />
            </div>

            <div className='CreateNewTrackerButtonWrapper'>
                <div className="container" id="modal">
                    <Link className="CreateNewTrackerButton" to={{pathname:'/createTrackingGroup', state: '/tenantTrackers/' + this.state.tenantID}}>
                        CreateNewTracker()
                    </Link>
                </div>
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
              <div className='TrackersContainer errorMessage'>
                <p>No trackers found for this tenant.</p>
              </div>
            }
        </div>
      </div>
    )
  }
}
