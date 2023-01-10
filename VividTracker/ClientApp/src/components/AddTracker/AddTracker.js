<<<<<<< HEAD
﻿import React, { Component } from 'react'
import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import React, { Component } from 'react';
>>>>>>> main
import './AddTracker.css';

export class AddTracker extends Component {
    constructor(props) {
<<<<<<< HEAD
        super(props)
        this.state = {
            trackerName: '',
            trackerRecord: '',
            errorMessage: '',
            textColor: ''
        }
    }

    createTracker = () => {
        //console.log(this.state.trackerName);
        var name = this.state.trackerName;
        var record = this.state.trackerRecord;
=======
        super(props);
        this.state = {
            value: '',
            errorMessage: '',
            textColor: '',
        }
        this.createTracker = this.createTracker.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    createTracker = (event) => {
        event.preventDefault();
        var input = this.state.value;
        const errors = {
            success: "Successfully added a new tracker.",
            minLength: "Name must be at least 3 characters.",
            maxLength: "Name must be less than 100 characters.",
            existingTenant: "This tracker is already existing."
        }
>>>>>>> main
        const color = {
            error: "red",
            success: "green"
        }
<<<<<<< HEAD
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
        else if (name.length > 100 || record.length > 100) {
=======
        if (input.length < 3) {

            this.setState({ errorMessage: errors.minLength });
            this.setState({ textColor: color.error });
        }
        else if (input.length > 100) {
>>>>>>> main
            this.setState({ errorMessage: errors.maxLength });
            this.setState({ textColor: color.error });
        }
        else {
<<<<<<< HEAD
            fetch('https://localhost:7091/api/create/tracker', {
=======
            // TODO CHANGE THE LOGIC HERE, SO THAT THE REQUEST CREATES A NEW TRACKER

            fetch('https://localhost:7091/api/create', {
>>>>>>> main
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
<<<<<<< HEAD
                body: JSON.stringify({ "name": name, "label": record})
            })
            .then((response) => {
                if (response.status == 400) {
                    this.setState({ errorMessage: errors.existingTracker });
                    this.setState({ textColor: color.error });
                }
                else {
                    console.log(this.state.trackerName);
                    this.setState({ textColor: color.success });
=======
                body: JSON.stringify({ "name": input })
            })
            .then((response) => {
                if (response.status == 400) {
                    this.setState({ errorMessage: errors.existingTenant });
                    this.setState({ textColor: color.error });
                }
                else {
                    this.setState({ errorMessage: errors.success });
                    this.setState({ textColor: color.success });
                    this.props.onTrackerAdded(this.props.value);
>>>>>>> main
                }
            })
        }
    }
<<<<<<< HEAD

    clear() {
        this.setState({ 'trackerName': '' });
        this.setState({ 'trackerRecord': '' });
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
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
                                    <a href={`https://localhost:44430/tenants`} id="cancelText" onClick={() => this.clear()}>Cancel</a>
                                </button>
                            </div>
                        </div>
                    </div>
=======
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    componentDidMount() {
        this.render();
    }
    clear() {
        this.setState({ 'value': '' });
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
    }
    render() {
        return (
            <div className="container">
                <div className="container" id="modal">
                <button type="button" id="createTracker" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#addTenаntModal">
                        CreateNewTracker()
                    </button>
                </div>
                <div className="modal fade" id="addTenаntModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                                    <div className="title">
                                        <h4 className="modal-title" id="title">Create Tracker</h4>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div id="myForm">
                                        <form onSubmit={this.createTracker}>
                                            <label htmlFor="tenantName" id="label-text">Tracker name:</label>
                                            <input type="text" name="tenantName" className="form-control" id="name"
                                                onChange={(e) => this.setState({ 'value': e.target.value })}
                                                style={{ borderBottomColor: this.state.textColor }}
                                                className={this.state.valid == false ? "form-control name name-error" : "form-control name"} 
                                            />
                                            <div className="modal-footer border-0">
                                                <div id="error">
                                                    <p style={{ color: this.state.textColor }}>{this.state.errorMessage}</p>
                                                </div>
                                                <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal"
                                                    onClick={() => this.clear()} >Clear
                                                </button>
                                            <button type="submit" id="submit" method="post" className="btn" name="addTenant">Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
>>>>>>> main
                </div>
            </div>
        );
    }
}
