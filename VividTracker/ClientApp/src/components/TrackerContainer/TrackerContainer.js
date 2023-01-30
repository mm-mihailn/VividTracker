import React, { Component } from 'react'
import './Styles/TrackerContainerStyles.css'

export default class TrackerContainerComponent extends Component {
    
  render() {
    return (
        <div className='TrackerContainer d-flex' key={this.props.trackerData.id}>
            <div className='TrackerNameWrapper'>
                <span className='TrackerName pageText'> {this.props.trackerData.name} </span>
            </div>
            <div className='TrackerButtonsWrapper'>
                <div className='UseTrackerButtonWrapper ml-auto'>
                    <button className='UseButton btn'> 
                        <a href='' className = 'UseButtonText btn-text'>Use</a>
                    </button>
                </div>
                <div className='ManageTrackerButtonWrapper btn-wrapper ml-auto'>
                    <button className='ManageButton btn'> 
                        <a href={`https://localhost:44430/manageTracker/${this.props.trackerData.id}`} className = 'ManageButtonText btn-text'>
                            Manage
                        </a>
                    </button>
                </div>

            </div>
    </div>
    )
  }
}
