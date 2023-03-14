import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './PanelComponent.css';
import { endpoints } from "../../endpoints";
import PanelContainer from "../PanelContainer/PanelContainer";
import authService from '../api-authorization/AuthorizeService';
import { AddComment } from '../AddComment/AddComment';
import NumbersSlider from '../TrackersSlider/NumbersSlider';
import PercentagesSlider from '../TrackersSlider/PercentagesSlider';

export default class PanelComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            timeStampData: '',
            currentTrackingGroup: [],
            currentTrackerName: '',
        }
        this.loadComments = this.loadComments.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
    }

    getTrackingGroup = async (trackingGroupId) => {
        const token = await authService.getAccessToken();
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroup(trackingGroupId)

        await fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((
                async (res) => {
                    let result = await res.json()
                    this.setState({ 'currentTrackingGroup': result })
                    this.setState({ 'currentTrackerName': result.name })
                }))
            .catch((err) => {
                console.log(err);
            })
    }

    async loadComments(trackingItemValueId) {
        const token = await authService.getAccessToken();
        trackingItemValueId = 1;
        await fetch(endpoints.loadComments(trackingItemValueId), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async (res) => {
                let commentData = await res.json()
                this.setState({ 'commentData': commentData })
                this.setState({ 'currentUserId': commentData.userId })
                //this.setState({ 'userName': commentData.userName })
            }
            )
            //.then((res) => res.json())
            //.then((res) => this.setState({ comments: res }))
    }
    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                <div className='panelContainer'>
                    <PercentagesSlider />
                    <NumbersSlider />
                    <div className='panelContent'>
                        <div className='panelListHeaderWrapper d-flex'>
                            <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                            <h4 className='panel-item'>Code Reviews Process</h4>
                        </div>
                        <AddComment onCommentAdded={this.loadComments} />
                        <div className='commentsContainer'>
                            {this.state.comments.map((trackingItemValueActivityData) => {
                                return (
                                    <PanelContainer trackingItemValueActivityData={trackingItemValueActivityData}
                                        key={trackingItemValueActivityData.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
