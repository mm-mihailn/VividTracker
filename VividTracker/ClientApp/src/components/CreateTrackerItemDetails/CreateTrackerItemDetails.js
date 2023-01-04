import React, { Component } from 'react'
import {faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/CreateTrackerItemDetails.css'
import { Link } from "react-router-dom";
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
                        <select className = 'TrackerItemDetailsNameInputField form-select'>
                            <option selected>percentage %</option>
                            <option>bool yes/no</option>
                            <option>number 1-10</option>
                        </select>
                    </div>
                    <div className='TrackerItemDetailsButtons'>
                        <Link to = '/trackersList' className='CancelButton'>Cancel</Link>
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
