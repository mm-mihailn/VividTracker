import React, { Component } from 'react'
import './Styles/ManageTracker.css'
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faL } from '@fortawesome/free-solid-svg-icons';
import { endpoints } from '../../endpoints';
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
                {'name': 'Augeo Afinity Tesxting', 'details': []},

            ],
            trackerItems: [
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},
                {'name': 'Augeo Afinity Marketing', 'details': []},

            ],
            isItemsSelected: true,
            isRecordsSelected: false,
            newRecordName: '',
            trackingGroupRecords: [],
            allRecords:[],
            allItems: [],
            currentTrackingGroup: [],
            currentTrackerName: '',
            currentTrackerItems: []
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

    getTrackingGroupRecords = async(trackingGroupId) => {
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroupRecords(trackingGroupId)
        let result = await fetch(url).then((
            async(res) => {
                let result = await res.json()
                this.setState({'trackingGroupRecords': result})
        }))
    }

    getAllRecords = async() => {
        let pageLocationSplitted = window.location.href.split('/')
        let trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        // TODO: Make this get ALL THE TRACKING RECORDS FROM THE DATABASE
        let url = endpoints.getAllRecords(trackingGroupId);

        let result = await fetch(url).then((
            async(res) => {
                let result = await res.json()
                this.setState({'allRecords': result})
        }))
    }

    getAllTrackingItems = async() => {
        let pageLocationSplitted = window.location.href.split('/')
        let trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        // TODO: Make this get ALL THE TRACKING ITEMS FROM THE DATABASE
        let url = `https://localhost:7091/api/trackers/${trackingGroupId}`

        let result = await fetch(url).then((
            async(res) => {
                let result = await res.json()
                this.setState({'allItems': result})
        }))
    }

    getTrackingGroup = async (trackingGroupId) => {
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroup(trackingGroupId)
        let result = await fetch(url).then((
            async(res) => {
                let result = await res.json()
                this.setState({'currentTrackingGroup': result[0]})
                this.setState({'currentTrackerName': result[0].name})
        }))
    }

    updateTrackerName = async (trackingGroupId) => {
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.updateTrackerName(trackingGroupId)
        let result = await fetch(url, 
        {
            method: 'PATCH',
            body: 
            JSON.stringify({"Name":this.state.currentTrackerName}),
            headers: 
            {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }


    getTrackingGroupTrackingItems = async(trackingGroupId) => {
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroupTrackingItems(trackingGroupId)

        let result = await fetch(url).then((
            async(res) => {
                let result = await res.json()
                this.setState({'currentTrackerItems': result})
        }))
    }

    resetName = async(trackingGroupId) => {
        // currentTrackerName
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.resetName(trackingGroupId)
        let result = await fetch(url).then((
            async(res) => {
                let result = await res.json()
                this.setState({'currentTrackerName': result[0].name})
        }))
    }
    
    componentDidMount()
    {
        this.getTrackingGroupRecords()
        this.getAllRecords()
        this.getAllTrackingItems()
        this.getTrackingGroup()
        this.getTrackingGroupTrackingItems()
    }
  render() {
    return (
    <div className = 'TrackerContainerWrapper d-flex justify-content-center align-items-center'>
        <div className='TrackerContainer'>
            <div className='TrackerHeaderWrapper'>
                <h4 className='TrackerHeader'>{this.state.currentTrackerName}/New Tracker</h4>
                <FontAwesomeIcon className='TrackerHeaderIcon' icon = {faPenToSquare}/>
            </div>
            <div className='TrackerInteractionField'>
                <div className = 'TrackerFormContainer'>
                    <div className = 'TrackerFieldsContainer'>
                        <div className='TrackerNameFieldWrapper'>
                            <label className = 'TrackerNameLabel pageText'>Tracker Name: </label>
                            <input 
                                className = 'TrackerNameInputField form-control' 
                                type = 'text' 
                                value={this.state.currentTrackerName} 
                                onChange = {
                                    (e) => 
                                    this.setState({'currentTrackerName': e.target.value})
                                }
                            />
                        </div>
                        <div className='RecordNameFieldWrapper'>
                            <label className = 'TrackerRecordLabel pageText'>Record Name: </label>
                            <input className = 'TrackerRecordInputField form-control' type = 'text' value='' onChange = {(e) => this.setState({'currentRecordName': e.target.value})}/>
                        </div>
                    </div>
                    <div className='TrackerButtons'>
                        <span className='ResetButton' onClick={() => this.resetNames()}><strong>Reset</strong></span>
                        <button className='UpdateButton' onClick={() => this.updateTrackerName()}>Update</button>
                    </div>
                </div>
            </div>
            <div className='TrackerOptionsWrapper'>
                <div 
                    className={this.state.isItemsSelected == true ? 'TrackerOptionWrapperSelected' : 'TrackerOptionWrapper'} 
                    tabIndex="0" 
                    onClick={()=>{this.selectItems()}}
                >
                    <span className='TrackerOption'>Items</span>
                </div>
                <div 
                    className={this.state.isRecordsSelected == true ? 'TrackerOptionWrapperSelected' : 'TrackerOptionWrapper'} 
                    tabIndex="1"
                    onClick={() => {this.selectRecords()}}>
                    <span className='TrackerOption'>Records</span>
                </div>
            </div>
            {this.state.isRecordsSelected == true 
            ?
            <div className='RecordsWrapper d-flex'>
                <div className='RecordsContainer'>
                    {this.state.trackingGroupRecords.map((record) => {
                            return (
                                <div className='RecordContainer'>
                                    <p className='RecordName'>{record.name}</p>
                                </div>   
                            )
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
                            {this.state.allRecords.map((alreadyExistingRecord) => {
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
            <div className='RecordsWrapper d-flex'>
                <div className='RecordsContainer'>
                    {this.state.currentTrackerItems.map((trackerItem) => {
                        return (
                            <div className='RecordContainer'>
                                <p className='RecordName'>{trackerItem.name}</p>
                            </div>   
                        )           
                    }
                    )}
                </div>

                <div className='AlreadyExistingRecordsWrapper ItemSectionRecords'>
                        <span className='AlreadyExistingRecordsHeader itemsRecordsHeader'>
                            Already Existing Items:
                        </span>
                        <div className='AlreadyExistingRecords'>
                            {this.state.allItems.map((alreadyExistingItem) => {
                                return(
                                    <div className='AlreadyExistingRecord'>
                                        <p className='AlreadyExistingRecordName'>{alreadyExistingItem.name}</p>
                                        <span className='AddTrackingButton'>Add</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                
            </div>
            }
        </div>
    </div>               
    )
}}
