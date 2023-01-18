import React, { Component } from 'react'
import {faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/CreateTrackerItemDetails.css'
import { Link } from "react-router-dom";
export default class CreateTrackerItemDetails extends Component {

    constructor()
    {
        super()
        this.state = {
            trackingItemName: '',
            trackingItemType: 'percentage %'
        }
    }
  handleCancelButton = () => {
    window.location.href = '/'
  }
  handleChange = (select) => {
    this.setState({'trackingItemType':select[select.selectedIndex].innerText})
  }


  createTrackingItem = async () => {
    let pageLocationSplitted = window.location.href.split('/')
    let tenantID = pageLocationSplitted[pageLocationSplitted.length - 1]
    let url = `https://localhost:7091/api/trackingItems/create/${tenantID}`
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({"Name": this.state.trackingItemName, Type: this.state.trackingItemType}),
        headers: 
        {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
  }
  render() {
    return (
        <div className = 'CreateTrackerItemDetailsWrapper d-flex justify-content-center align-items-center'>
        <div className = 'CreateTrackerItemDetailsContainer'>
            <div className = 'TrackerItemDetailsHeaderWrapper d-flex'>
                {/* TODO: Populate the fields below wit the tracker data */}
                <h4 className = 'TrackerItemDetailsName pageText'>Tracker Item Name</h4>
                <FontAwesomeIcon className = 'CreateTrackerItemDetailsIcon' icon = {faPenToSquare}/>
            </div>
            <div className = 'TrackerItemDetailsFormWrapper'>
                <div className = 'TrackerItemDetailsFormContainer'>
                    <div className = 'TrackerItemDetailsFieldsContainer d-flex'>
                        <label className = 'TrackerItemDetailsNameLabel pageText'>Tracker Item Name:</label>
                        <input className = 'TrackerItemDetailsNameInputField form-control' type = 'text' value={this.state.trackingItemName} onChange = {(e)=>{this.setState({"trackingItemName": e.target.value})}}/>
                    </div>
                    <div className = 'TrackerItemDetailsFieldsContainer d-flex'>
                    <label className = 'TrackerItemDetailsNameLabel pageText'>Tracker Item Type:</label>
                        <select className = 'TrackerItemDetailsNameInputField form-select' onChange={(e) => this.handleChange(e.target)}>
                            <option selected>percentage %</option>
                            <option>bool yes/no</option>
                            <option>number 1-10</option>
                        </select>
                    </div>
                    <div className='TrackerItemDetailsButtons'>
                        <Link to = '/trackersList' className='CancelButton' onClick={()=>{this.handleCancelButton()}}>Cancel</Link>
                        {/* Create function that will handle the request for the tracker item creation */}
                        <button className='CreateButton' onClick={()=>this.createTrackingItem()}>Create</button>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    )
  }
}
