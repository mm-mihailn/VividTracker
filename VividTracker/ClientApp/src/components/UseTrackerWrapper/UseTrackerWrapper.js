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
      isPanelVisible: false,
      panelTrackingItemId: null,
      panelTrackingItemValueId: null,
      panelTrackingRecordId: null, 
      
    }
  }

  handlePanelVisibility = async (TrackingItemId, TrackingItemValueId, TrackingRecordId) => {
    
    if(TrackingItemId && TrackingItemValueId && TrackingRecordId)
    {
      console.log(`showing tracking item with id ${TrackingItemValueId} of tracking item with id: ${TrackingItemId}`)
      
    }
    else
    {
      console.log(`creating tracking item value`)
    }

    
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

              <PanelComponent 
              panelHandler = {this.handlePanelVisibility} 
              panelTrackingItemId = {this.state.panelTrackingItemId} 
              panelTrackingItemValueId = {this.state.panelTrackingItemValueId} 
              panelTrackingRecordId = {this.state.panelTrackingRecordId}
              isPanelVisible = {this.state.isPanelVisible}/>

        </div>
      </div>
    )
  }
}
