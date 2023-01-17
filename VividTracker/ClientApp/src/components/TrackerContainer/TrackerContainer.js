import React, { Component } from 'react'
import './Styles/TrackerContainerStyles.css'

export default class TrackerContainerComponent extends Component {
    
  render() {
    return (
        <div className='TrackerContainer d-flex' key={this.props.TrackerData.id}>
            <div className='TrackerNameWrapper'>
                <span className='TrackerName pageText'> {this.props.TrackerData.name} </span>
            </div>
            <div className='TrackerButtonsWrapper'>
                <div className='UseTrackerButtonWrapper ml-auto'>
                    <button className='UseButton btn'> 
                        <a href='' className = 'UseButtonText btn-text'>Use</a>
                    </button>
                </div>
                <div className='ManageTrackerButtonWrapper btn-wrapper ml-auto'>
                    <button className='ManageButton btn'> 
                        <a href={`/manageTracker/${this.props.TrackerData.id}`} className = 'ManageButtonText btn-text'>
                            Manage
                        </a>
                    </button>
                </div>

            </div>
    </div>
    )
  }
}
