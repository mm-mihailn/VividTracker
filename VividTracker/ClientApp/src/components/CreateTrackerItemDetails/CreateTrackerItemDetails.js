import React, { Component } from 'react'
import {faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/CreateTrackerItemDetails.css'
export default class CreateTrackerItemDetails extends Component {
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
                        <input className = 'TrackerItemDetailsNameInputField form-control' type = 'text' value={''} onChange = {()=>{}}/>
                    </div>
                    <div className = 'TrackerItemDetailsFieldsContainer d-flex'>
                    <label className = 'TrackerItemDetailsNameLabel pageText'>Tracker Item Type:</label>
                        <input className = 'TrackerItemDetailsNameInputField form-control' type = 'text' value={''} onChange = {()=>{}}/>
                    </div>
                    <div className='TrackerItemDetailsButtons'>
                        <span className='CancelButton'>Cancel</span>
                        {/* Create function that will handle the request for the tracker item creation */}
                        <button className='CreateButton' onClick={()=>{}}>Create</button>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    )
  }
}
