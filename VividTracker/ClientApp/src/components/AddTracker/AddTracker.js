import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AddTracker.css';

export class AddTracker extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            trackerName: '',
            trackerRecord: '',
            errorMessage: '',
            textColor: ''
        }
        this.createTracker = this.createTracker.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createTracker = (event) => {
        //PREVENT DEFAULT IS NOT WORKING
        //event.preventDefault();
        var name = this.state.trackerName;
        var record = this.state.trackerRecord;
        
        const color = {
            error: "red",
            success: "green"
        }
        const errors = {
            success: "Successfully added a new tracker.",
            minLength: "Input must be at least 3 characters.",
            maxLength: "Input must be less than 100 characters.",
            existingTracker: "This tracker is already existing"
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
            //THE POST REQUEST IS NOT WORKING
            fetch('https://localhost:7091/api/create/tracker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": name, "label": record })
               
            })
                .then((response) => {
                    if (response.status == 400) {
                        this.setState({ errorMessage: errors.existingTenant });
                        this.setState({ textColor: color.error });
                        console.log(name + " " + record);
                    }
                    else {
                        this.setState({ errorMessage: errors.success });
                        this.setState({ textColor: color.success });
                        console.log(name + " " + record);
                    }
                });
        }
    }

    clear() {
        this.setState({ 'trackerName': '' });
        this.setState({ 'trackerRecord': '' });
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    componentDidMount() {
        this.render();
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
                                <input className='trackerNameInputField form-control' type='text'
                                    onChange={(e) => this.setState({ 'trackerName': e.target.value })}
                                />
                                <label className='recordNameLabel pageText'>Record Name:</label>
                                <input className='recordNameInputField form-control' type='text'
                                    onChange={(e) => this.setState({ 'recordName': e.target.value })}
                                />

                            </div>
                            <div className='trackerButtons'>
                                <div id="error">
                                    <p style={{ color: this.state.textColor }}>{this.state.errorMessage}</p>
                                </div>
                                <button className='saveButton' method="post" onClick={() => this.createTracker()}>Save</button>
                                <button className='cancelButton'>
                                    <a href={`https://localhost:44430/trackersList`} id="cancelText" onClick={() => this.clear()}>Cancel</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
