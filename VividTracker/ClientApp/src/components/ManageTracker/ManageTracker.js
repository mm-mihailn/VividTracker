import React, { Component } from 'react'
import './Styles/ManageTracker.css'
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faL } from '@fortawesome/free-solid-svg-icons';
export default class ManageTracker extends Component {
    constructor()
    {
        super()
        this.state = {
            records: [
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
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
            ],
            alreadyExistingRecords: [
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
                {'name': 'Edmentum Inc', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},

            ],
            isItemsSelected: true,
            isRecordsSelected: false,
            newRecordName: ''
        }
    }

    selectItems = () => {
        if(this.state.isItemsSelected == false)
        {
            this.setState({'isItemsSelected': true})
            this.setState({'isRecordsSelected': false})
        }
    }
    
    selectRecords = () => {
        if(this.state.isRecordsSelected == false)
        {
            this.setState({'isRecordsSelected': true})
            this.setState({'isItemsSelected': false})
        }
    }
    AddTracker = () => {
        
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
            <div className='TrackerOptionsWrapper'>
                <div 
                    className={this.state.isItemsSelected == true ? 'TrackerOptionWrapperSelected' : 'TrackerOptionWrapper'} 
                    tabindex="0" 
                    onClick={()=>{this.selectItems()}}
                >
                    <span className='TrackerOption'>Items</span>
                </div>
                <div 
                    className={this.state.isRecordsSelected == true ? 'TrackerOptionWrapperSelected' : 'TrackerOptionWrapper'} 
                    tabindex="1"
                    onClick={() => {this.selectRecords()}}>
                    <span className='TrackerOption'>Records</span>
                </div>
            </div>
            {this.state.isRecordsSelected == true 
            ?
            <div className='RecordsWrapper d-flex'>
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

                <div className='RecordsInteraction'>
                    <div className='RecordsInteractionFieldWrapper d-flex'>
                        <label className = 'RecordNameLabel pageText'>New Record: </label>
                        <input className = 'RecordNameInputField form-control' type = 'text' value='' onChange = {(e) => this.setState({'newRecordName': e.target.value})}/>
                    </div>
                    <div className='RecordButtons'>
                        <span className='CancelButton'><strong>Cancel</strong></span>
                        <button className='UpdateButton' onClick={() => this.AddTracker()}>Add</button>
                    </div>
                    <div className='AlreadyExistingRecordsWrapper'>
                        <span className='AlreadyExistingRecordsHeader'>
                            Already Existing Records:
                        </span>
                        <div className='AlreadyExistingRecords'>
                            {this.state.alreadyExistingRecords.map((alreadyExistingRecord) => {
                                return(
                                    <div className='AlreadyExistingRecord'>
                                        <p className='AlreadyExistingRecordName'>{alreadyExistingRecord.name}</p>
                                        <span className='AddTrackingButton'>Add</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                

            </div>
            : 
            ""}
        </div>
    </div>               
    )
}}
