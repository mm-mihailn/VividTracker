import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TenantTrackerComponent from '../TenantTrackerComponent/TenantTrackerComponent';
import './AddTracker.css';

export class AddTracker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trackers: [],
            trackerName: '',
            recordName: '',
            trackerData: undefined
        }
    }

    render() {
        return (
            <div className='editTrackerWrapper d-flex justify-content-center align-items-center'>
                <div className='editTrackerContainer'>
                    <div className='trackerHeaderWrapper d-flex'>
                        <h4 className='trackerName pageText'>New Tracker</h4>
                        <FontAwesomeIcon className='editTrackerIcon' icon={faPenToSquare} />
                    </div>
                    <div className='trackerFormWrapper'>
                        <div className='trackerFormContainer'>
                            <div className='trackerFieldsContainer d-flex'>
                                <label className='trackerNameLabel pageText'>Tracker Name:</label>
                                <input className='trackerNameInputField form-control' type='text' value={this.state.trackerName} onChange={(e) => this.setState({ 'trackerName': e.target.value })} />

                                <label className='recordNameLabel pageText'>Record Name:</label>
                                <input className='recordNameInputField form-control' type='text' value={this.state.recordName} onChange={(e) => this.setState({ 'recordName': e.target.value })} />
                            </div>
                            <div className='trackerButtons'>
                                <button className='saveButton' onClick={() => this.updateTenantName()}>Save</button>
                                <button className='cancelButton'>
                                    <a href={`https://localhost:44430/tenants`} id="cancelText">Cancel</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
