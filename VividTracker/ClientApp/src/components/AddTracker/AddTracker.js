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

    //componentDidMount = () => {
    //    this.render();
    //}

    //getTenantUsers = async () => {
    //    let splittedURL = window.location.pathname.split('/')
    //    let targetTenantID = splittedURL[splittedURL.length - 1]
    //    await fetch(`https://localhost:7091/api/users/${Number(targetTenantID)}`)
    //        .then(async (res) => this.setState({ 'trackers': await res.json() }))
    //}

    //getTenantName = async () => {
    //    let splittedURL = window.location.pathname.split('/')
    //    let targetTenantID = splittedURL[splittedURL.length - 1]
    //    await fetch(`https://localhost:7091/api/tenant/${Number(targetTenantID)}`)
    //        .then(async (res) => {
    //            let trackerData = await res.json()
    //            this.setState({ 'trackerData': trackerData })
    //            this.setState({ 'currentTrackerName': trackerData.name })
    //        }
    //        )
    //}

    saveTrackerName = async () => {
        let splittedURL = window.location.pathname.split('/')
        let targetTenantID = splittedURL[splittedURL.length - 1]
        this.state.trackerData.name = this.state.trackerName
        let result = await fetch(`https://localhost:7091/api/edit/${Number(targetTenantID)}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.trackerData)
            })
            .then(async (res) => {
                let result = await res.json()
                console.log(result)
            })

        window.location.reload()
    }

    render() {
        return (
            <div className='editTrackerWrapper d-flex justify-content-center align-items-center'>
                <div className='editTrackerContainer'>
                    <div className='trackerHeaderWrapper d-flex'>
                        <h4 className='trackerName pageText'>Create New Tracker</h4>
                        <FontAwesomeIcon className='editTrackerIcon' icon={faPenToSquare} />
                    </div>
                    <div className='trackerFormWrapper'>
                        <div className='trackerFormContainer'>
                            <div className='trackerFieldsContainer d-flex'>
                                <label className='trackerNameLabel pageText'>Tracker Name:</label>
                                <input className='trackerNameInputField form-control' type='text' value={this.state.trackerName}
                                    onChange={(e) => this.setState({ 'trackerName': e.target.value })} />
                            </div>

                            <div className='trackerFieldsContainer d-flex'>
                                <label className='recordNameLabel pageText'>Record Name:</label>
                                <input className='recordNameInputField form-control' type='text' value={this.state.recordName}
                                    onChange={(e) => this.setState({ 'recordName': e.target.value })} />
                            </div>
                            
                            <div className='trackerButtons'>
                                <button className='resetButton' className="btn btn-link">
                                    <a href={`https://localhost:44430/tenants`}>Cancel</a>
                                </button>
                                <button className='updateButton' onClick={() => this.updateTenantName()}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
