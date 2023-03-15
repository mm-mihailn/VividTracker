import React, { Component } from 'react'
import UseTracker from '../UseTrackerWrapper/UseTracker'
import {Link} from 'react-router-dom'
import './Styles/TrackersContainerStyles.css'

export default class TrackerContainerComponent extends Component {
    
  render() {
    return (
        <div className='MyTrackerContainer d-flex' key={this.props.trackerData?.id}>
            <div className='TrackerNameWrapper'>
                <span className='trackerName pageText'> {this.props.trackerData?.name} </span>
            </div>
            <div className='ManageTrackerButtonWrapper ml-auto'>
                <button className='btn btn-link pe-4 pt-0 pb-2'>
                   <a href={`https://localhost:44430/useTracker/${this.props.trackerData?.id}`} className='link_blue'>Use</a> 
                </button>
                <button className='ManageButton'> 
                    <a href={`https://localhost:44430/manageTracker/${this.props.trackerData.tenantId}/${this.props.trackerData?.id}`} className = 'ManageButtonText'>Manage</a>
                </button>
            </div>
        </div>
    )
  }
}
