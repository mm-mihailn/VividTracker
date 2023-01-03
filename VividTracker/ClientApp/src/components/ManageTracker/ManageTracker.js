import React, { Component } from 'react'
import './Styles/ManageTracker.css'
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default class ManageTracker extends Component {
    constructor()
    {
        super()
        this.state = {
            records: [
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
                {'name': 'ExcluCV', 
                    'details': [
                        {
                            'name': 'ExcluCV backend'
                        },
                        {
                            'name': 'ExcluCV iOS'
                        }
                    ]
                },
                {'name': 'Twin City Outdoor Services', 'details': []},
            ]
        }
    }
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

            <div className='RecordsHeaderWrapper'>
                <h4 className='RecordsHeader'>Tracker Records</h4>
            </div>
            <div className='RecordsContainer'>
                {this.state.records.map((record) => {
                        if(record.details.length < 1)
                        {
                            return (
                                <div className='RecordContainer'>
                                    <p className='RecordName'>{record.name}</p>
                                </div>   
                            )
                        }
                        else
                        {
                            return (
                                <div className='RecordContainer'>
                                    <p className='RecordName'>{record.name}</p>
                                    {record.details.map((detail) => {
                                        return(
                                        <div className='RecordDetailContainer'>
                                             <p className='RecordDetailName'>{detail.name}</p> 
                                        </div>)
                                    })}
                                </div>   
                            )
                        }
                    }
                )}
            </div>
        </div>
    </div>               
    )
}}
