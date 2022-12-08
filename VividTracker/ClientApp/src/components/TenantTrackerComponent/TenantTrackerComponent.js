import React, { Component } from 'react'
import './Styles/TenantTrackerStyles.css'

export default class TenantTrackerComponent extends Component {
  render() {
    return (
        <div className = 'TenantTracker d-flex' key={this.props.tracker.id}>
            <div className='TenantTrackerNameWrapper'>
                <span className='TenantTrackerName pageText'> {this.props.tracker.userName} </span>
            </div>
            <div className='TenantTrackerButtonsContainer'>
                <div className='UseTenantTrackerButtonWrapper'>
                    <span className='UseTenantButton pageText'>Use</span>
                </div>
                <div className='ManageTenantTrackerButtonWrapper'>
                    <button className='ManageTenantTrackerButton'>
                        <a href={`https://localhost:44430/editTracker/${this.props.tracker.id}`} className = 'ManageButtonText'>Manage</a>
                    </button>
                </div>
            </div>
        </div>
    )
  }
}
