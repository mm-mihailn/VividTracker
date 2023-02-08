import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AddTracker.css';
import { endpoints } from "../../endpoints";
import {Link} from 'react-router-dom'

export class AddTracker extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            trackerName: '',
            trackerRecord: '',
            errorMessage: '',
            textColor: '',
            tenantId: ''
        }
        this.createTracker = this.createTracker.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async createTracker(tenantId){
        var name = this.state.trackerName;
        var record = this.state.trackerRecord;
        tenantId = this.props.location.pathname.split('/')[2]
        
        const color = {
            error: "red",
            success: "green"
        }
        const errors = {
            success: "Successfully added a new tracker.",
            minLength: "Input must be at least 3 characters.",
            maxLength: "Input must be less than 100 characters.",
            existingTracker: "This tracker is already existing."
        }
        if (name.length < 3) {
            this.setState({ errorMessage: errors.minLength });
            this.setState({ textColor: color.error });
        }
        else if (name.length > 100) {
            this.setState({ errorMessage: errors.maxLength });
            this.setState({ textColor: color.error });
        }
        else {
            await fetch(endpoints.createTracker(tenantId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Name": name,
                    "Label": record,
                    "TenantId": tenantId
                })
            })      
            .then((response) => {
                if (response.status == 400) {
                    this.setState({ errorMessage: errors.existingTracker });
                    this.setState({ textColor: color.error });
                }
                else {
                    this.setState({ errorMessage: errors.success });
                    this.setState({ textColor: color.success });
                }

            });
        }
    }

    clear() {
        this.setState({ 'trackerName': '' });
        this.setState({ 'trackerRecord': '' });
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
        this.props.history.goBack()
    }

    handleChange(event) {
        this.setState({ trackerName: event.target.value });
        this.setState({ trackerRecord: event.target.value });
    }
    componentDidMount() {
        this.render();
    }
    render() {
        return (
            <div className='trackerWrapper d-flex justify-content-center align-items-center'>
                <div className='trackerContainer'>
                    <div className='trackerHeaderWrapper d-flex'>
                        <h4 className='trackerName pageText'>New Tracker</h4>
                        <FontAwesomeIcon className='trackerIcon' icon={faPenToSquare} />
                    </div>
                    <div className='trackerFormWrapper'>
                        <div className='trackerFormContainer'>
                            <div className='trackerFieldsContainer d-flex'>
                                <label className='trackerNameLabel pageText'>Tracker Name:</label>
                                <input className='trackerNameInputField form-control' type='text'
                                    onChange={(e) => this.setState({ 'trackerName': e.target.value })}
                                />
                                <label className='recordNameLabel pageText'>Record Name:</label>
                                <input className='recordNameInputField form-control' type='text'
                                    onChange={(e) => this.setState({ 'trackerRecord': e.target.value })}
                                />

                            </div>
                            <div className='trackerButtons'>
                                <div>
                                    <p id="error" style={{ color: this.state.textColor }}>{this.state.errorMessage}</p>
                                </div>
                                <button className='saveButton' type="submit" method="post" onClick={(tenantId) => this.createTracker(tenantId)}>Save</button>
                                <button className='cancelButton'>
                                    <Link to={`/trackersList/${this.state.tenantId}`} id="cancelText" onClick={() => this.clear()}>Cancel</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
