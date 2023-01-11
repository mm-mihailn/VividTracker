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
                <button type="button" id="createTracker" className="btn">
                    <a href={`https://localhost:44430/createTracker`} id="text">CreateNewTracker()</a>
                </button>
            </div>
        )
    }
}
