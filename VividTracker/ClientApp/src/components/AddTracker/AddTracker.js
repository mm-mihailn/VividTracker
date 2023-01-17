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
    }

    createTracker(event){
        event.preventDefault();
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
            fetch('https://localhost:7091/api/trackingGroup/create/1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Name": name,
                    "Label": record
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
                                    onChange={(e) => this.setState({ 'trackerRecord': e.target.value })}
                                />

                            </div>
                            <div className='trackerButtons'>
                                <div id="error">
                                    <p style={{ color: this.state.textColor }}>{this.state.errorMessage}</p>
                                </div>
                                <button className='saveButton' method="post" onClick={(event) => this.createTracker(event)}>Save</button>
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
