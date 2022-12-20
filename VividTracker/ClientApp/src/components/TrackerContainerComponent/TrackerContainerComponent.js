import React, { Component } from 'react'
import './TrackerContainerComponent.css'
import '../AddTracker/AddTracker.js'

export default class TrackerContainerComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <button type="button" id="createTracker" className="btn btn-link">
                    <a href={`https://localhost:44430/editTenant/${1}`}>CreateNewTracker()</a>
                </button>
            </div>
        )
    }
}
