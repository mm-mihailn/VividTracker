﻿import React, { Component } from 'react'
import './Styles/TrackersContainerStyles.css'
import './Styles/TrackersStyles.css'
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TrackerContainerComponent from '../TrackerContainerComponent/TrackerContainerComponent.js'
export default class TrackersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { trackers: [] }
        this.loadTrackers = this.loadTrackers.bind(this);
    }
    async componentDidMount() {
        this.loadTrackers();
    }
    async loadTrackers() {
        let splittedURL = window.location.pathname.split('/')
        let tenantId = splittedURL[splittedURL.length - 1]
        await fetch(`https://localhost:7091/api/trackers/${Number(tenantId)}`)
            .then((res) => res.json())
            .then((res) => this.setState({ trackers: res }))
    }
    render() {
        return (
            <div className='trackersListWrapper d-flex justify-content-center align-items-center' >
                <form className='trackersContainer'>
                    <div className='trackersListHeaderWrapper d-flex'>
                        <h4 className='trackersListHeader'>Trackers List</h4>
                        <FontAwesomeIcon className='trackersListEditButton' icon={faRectangleList} />
                    </div>
                    <div className="container">
                        {/*USING THE COMPONENT WITH ONLY CREATE NEW TRACKER BUTTON*/}
                        <button type="button" id="" className="btn btn-link link_orange ps-5" data-bs-toggle="" data-bs-target="">
                            <TrackerContainerComponent></TrackerContainerComponent>
                        </button>
                    </div>
                    <div className='TrackersContainer'>
                        {
                            this.state.trackers.length >= 1 ?
                            this.state.trackers.map((tracker) => {
                            return (
                                <TrackerContainerComponent trackerData={tracker} />
                            )
                         })
                                :
                            <div className="container">
                                <p className='pageText ps-5'>Trackers do not exist for this tenant.</p>
                            </div>
                         }

                    </div>
                    <div className="container">
                        <button type="button" id="" className="btn btn-link link_orange align-end " data-bs-toggle="" data-bs-target="">
                            ...archivedTrackers
                        </button>
                    </div>
                </form>
            </div>);
    }
}

