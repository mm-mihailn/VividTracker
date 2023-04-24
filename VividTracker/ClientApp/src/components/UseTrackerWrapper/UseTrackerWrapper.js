import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerWrapper.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faCirclePlay, faFilter } from '@fortawesome/free-solid-svg-icons';
import UseTracker from './UseTracker';
import PanelComponent from '../PanelComponent/PanelComponent';
export default class UseTrackerWrapper extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      isPanelVisible: true,
      panelTrackingItemId: -1,
      panelTrackingItemValueId: -1,
      panelTrackingRecordId: -1
    }
  }

  handlePanelVisibility = (TrackingItemId, TrackingItemValueId, TrackingRecordId) => {
    console.log(`showing tracking item with id ${TrackingItemValueId} of tracking item with id: ${TrackingItemId}`)
    this.setState({'panelTrackingItemId': TrackingItemId})
    this.setState({'panelTrackingItemValueId': TrackingItemValueId})
    this.setState({'panelTrackingRecordId': TrackingRecordId})

  }
  render() {
    return (
      <div className='useTrackerWrapper'>
        <div className='usedTrackerHeaderWrapper'>
            <p className='usedTrackerHeader'>
                <strong>Tracker name</strong>
            </p>
            <FontAwesomeIcon className='usedTrackerTableIcon' icon={faTable}/>
        </div>
        <div className='usedTrackerMenuButtons'>
            <div className='usedTrackerMenuIcons'>
                <FontAwesomeIcon className='usedTrackerPlayButtonIcon usedTrackerMenuIcon' icon={faCirclePlay}/>
                <FontAwesomeIcon className='usedTrackerFilterIcon usedTrackerMenuIcon' icon={faFilter}/>
            </div>
        </div>
        <div className='UseTrackerMainPoint'>
          <UseTracker panelHandler = {this.handlePanelVisibility}/>
          {this.state.isPanelVisible &&
            <PanelComponent panelTrackingItemId = {this.state.panelTrackingItemId} panelTrackingItemValueId = {this.state.panelTrackingItemValueId} panelTrackingRecordId = {this.state.panelTrackingRecordId}/>
          }
        </div>
      </div>
    )
  }
}
