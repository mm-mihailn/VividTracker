import React, { Component } from 'react'
import './Styles/TrackersContainerStyles.css'
import '../TrackerContainerComponent/TrackerContainerComponent.css'
import '../AddTracker/AddTracker.js'

export default class TrackerContainerComponent extends Component {
    
  render() {
    return (
        <div className='TrackerContainer d-flex' key={this.props.trackerData?.id}>
            <div className='TrackerNameWrapper'>
                <span className='trackerName pageText'> {this.props.trackerData?.name} </span>
            </div>
            <div className='ManageTrackerButtonWrapper ml-auto'>
                <button className='btn btn-link pe-4 pt-0 pb-2'>
                    <a href={`https://localhost:44430/Todo`} className='link_blue'>Use</a>
                </button>
                <button className='ManageButton'> 
                    <a href={`https://localhost:44430/Todo`} className = 'ManageButtonText'>Manage</a>
                </button>
                <button id="createTracker" className="createTrackerButton">
                    <a href={`https://localhost:44430/createTracker`}>CreateNewTracker()</a>
                </button>
            </div>
    </div>
    )
  }
}
