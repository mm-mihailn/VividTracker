import React, { Component } from 'react'
import './Styles/ManageTracker.css'
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default class ManageTracker extends Component {
  render() {
    return (
    <div className = 'TrackerContainerWrapper d-flex justify-content-center align-items-center'>
        <div className='TrackerContainer'>
            <div className='TrackerHeaderWrapper'>
                <h4 className='TrackerHeader'>TrackerName/New Tracker</h4>
                <FontAwesomeIcon className='TrackerHeaderIcon' icon = {faPenToSquare}/>
            </div>
            <div className='TrackerInteractionField'>
                <div className = 'TrackerFormContainer'>
                    <div className = 'TrackerFieldsContainer'>
                        <div className='TrackerNameFieldWrapper'>
                            <label className = 'TrackerNameLabel pageText'>Tracker Name: </label>
                            <input className = 'TrackerNameInputField form-control' type = 'text' value='' onChange = {(e) => this.setState({'currentTrackerName': e.target.value})}/>
                        </div>
                        <div className='RecordNameFieldWrapper'>
                            <label className = 'TrackerRecordLabel pageText'>Record Name: </label>
                            <input className = 'TrackerRecordInputField form-control' type = 'text' value='' onChange = {(e) => this.setState({'currentRecordName': e.target.value})}/>
                        </div>
                    </div>
                    <div className='TrackerButtons'>
                        <span className='ResetButton'><strong>Reset</strong></span>
                        <button className='UpdateButton' onClick={() => this.updateTrackerName()}>Update</button>
                    </div>
                </div>
            </div>

            <div className='TrackerHeaderWrapper'>
                <h4 className='TrackerHeader'>Tracker Items</h4>
            </div>
            <div className='TrackerItemsContainer'>
                <p>??????? WHat is supposed to go in here?</p>
            </div>
        </div>
    </div>
    )
  }
}
