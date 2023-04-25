import React, { Component } from 'react';
import './PanelComponent.css';
import { endpoints } from "../../endpoints";
import PanelContainer from "../PanelContainer/PanelContainer";
import authService from '../api-authorization/AuthorizeService';
import { AddComment } from '../AddComment/AddComment';

export default class PanelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            userName: '',    
            childInputValues: [],
            numbersRender: true,
            percentagesRender: false,
            boolsRender: false,
            numberValue: 1,
            percentageValue: 0,
            boolsValue: false,
            isDivHidden: false,
            TrackingItemId: -1,
            TrackingItemValueId: -1,
            TrackingRecordId: -1
        }
        this.loadComments = this.loadComments.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
        document.addEventListener("keydown", this.handleKeyDown);
        this.setState({'TrackingItemId': this.props.panelTrackingItemId}, () => {
            this.setState({'TrackingItemValueId': this.props.panelTrackingItemValueId}, () => {
                this.setState({'TrackingRecordId': this.props.panelTrackingRecordId}, () => {
                    this.getTargetData()
                })
            })
        })
    }
    handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            this.setState({ isDivHidden: true });
        }
    };
    handleSaveInputValues = () => {
        console.log(this.state.childInputValues);
    };
    async loadComments(trackingItemValueId) {
        const token = await authService.getAccessToken();
        trackingItemValueId = 2;
        await fetch(endpoints.loadComments(trackingItemValueId), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((res) => this.setState({ comments: res }))
    }

    getTargetData = async () => {
             // get record name
             // -- getAllRecords endpoint and filter by record id
             let allRecords = await this.getTrackingRecordData(3)
            //  let targetRecord = allRecords.filter((iteratedRecord) => iteratedRecord.id == this.state.TrackingRecordId)
             console.log(allRecords)

             // get tracking item name
             let trackingItem = await this.getTrackingItemData(this.state.TrackingItemId)
             let targetTrackingItemName = trackingItem.name


             // get tracking item value
             // - getTrackingItemsDataByTrackingGroupId
    }

    getTrackingItemData = async (trackingItemId) => {
        const token = await authService.getAccessToken();
        let url = endpoints.getTrackingItemById(trackingItemId);
        let result = await fetch(url, {
            method: 'GET',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err)
        });

        return result
    }
    // TODO: ASK FOR THE FOLLOWING
    // -- GET RECORD DATA BY ID
    // -- GET TRACKING ITEM BY ID SHOULD INCLUDE VALUE
    // -------- GET TRACKING ITEM VALUE BY ID --------
    getTrackingRecordData = async (trackingRecordId) => {
        const token = await authService.getAccessToken();
        let url = endpoints.getAllRecords(trackingRecordId);
        let result = await fetch(url, {
            method: 'GET',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err)
        });

        return result
    }

    
    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                {this.state.isDivHidden ? null : (
                    <div id='panelContainer'>
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
                )}
            </div>
        );
    }
}
