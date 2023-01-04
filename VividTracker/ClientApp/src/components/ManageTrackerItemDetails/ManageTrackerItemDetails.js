import React, { Component } from 'react'
import {faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Styles/ManageTrackerItemDetails.css'

export default class ManageTrackerItemDetails extends Component {
  render() {
    return (
      <div className = 'EditTrackerItemDetailsWrapper d-flex justify-content-center align-items-center'>
        <div className = 'EditTrackerItemDetailsContainer'>
            <div className = 'TrackerItemDetailsHeaderWrapper d-flex'>
                {/* TODO: Populate the fields below wit the tracker data */}
                <h4 className = 'TrackerItemDetailsName pageText'>Tracker Item Name</h4>
                <FontAwesomeIcon className = 'EditTrackerItemDetailsIcon' icon = {faPenToSquare}/>
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
                        <span className='ResetButton'>Reset</span>
                        <button className='UpdateButton' onClick={()=>{}}>Update</button>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    )
  }
}
