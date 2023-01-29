import React, { Component } from 'react'
import { endpoints } from '../../endpoints'
import './Styles/TenantTrackerStyles.css'

export default class TenantTrackerComponent extends Component {
    removeUser = async (userId) => {
        await fetch(endpoints.removeUser(userId), {
            method: 'DELETE'
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        window.location.reload()
  }
  render() {
    return (
        <div className = 'TenantTracker d-flex' key={this.props.tracker.id}>
            <div className='TenantTrackerNameWrapper'>
                {/* Change username to email ! */}
                <span className='TenantTrackerName pageText'> {this.props.tracker.email} </span>
            </div>
            <div className='TenantTrackerButtonsContainer'>
                <div className='UseTenantTrackerButtonWrapper'>
                    <span className='UseTenantButton pageText' onClick={() => this.removeUser(this.props.tracker.id)}>Remove</span>
                </div>
            </div>
        </div>
    )
  }
}
