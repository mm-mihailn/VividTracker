import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './PanelComponent.css';
import { AddComment } from "../AddComment/AddComment";
import { endpoints } from "../../endpoints";
import PanelContainer from "../PanelContainer/PanelContainer";
import authService from '../api-authorization/AuthorizeService';
import TrackersSlider from '../TrackersSlider/TrackersSlider';

export default class PanelComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: [],
        }
        this.loadComments = this.loadComments.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
    }
    async loadComments(trackingItemValueId) {
        const token = await authService.getAccessToken();
        trackingItemValueId = 1;
        await fetch(endpoints.loadComments(trackingItemValueId), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ comments: res }))
    }
    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                <div className='panelContainer'>
                    <TrackersSlider />
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
