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
            isPanelVisible: true,
            TrackingItemId: -1,
            TrackingItemValueId: -1,
            TrackingRecordId: -1,
            TagetRecordData: null,
            TagetTrackingItemData: null,
            TargetTrackingItemValue: -1,
            isPanelLoading: true,
            TrackingItemValueFromAddCommentComponent: null
        }
        this.loadComments = this.loadComments.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    async componentDidMount() {

        this.loadComments();
        document.addEventListener("keydown", this.handleKeyDown);
        this.setState({ 'TrackingItemId': this.props.panelTrackingItemId }, () => {
            this.setState({ 'TrackingItemValueId': this.props.panelTrackingItemValueId }, () => {
                this.setState({ 'TrackingRecordId': this.props.panelTrackingRecordId }, () => {
                    this.getTargetData()
                })
            })
        })
    }
    handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            this.props.showHidePanel(this.state.isPanelVisible)
        }
    };
    handleSaveInputValues = () => {
        // console.log(this.state.childInputValues);
    };
    async loadComments() {
        const token = await authService.getAccessToken();
        let trackingItemValueId = this.state.TrackingItemValueId;
        await fetch(endpoints.loadComments(trackingItemValueId), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async (res) => {

                let comments = await res.json()
                this.setState({ 'comments': comments })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    getTargetData = async () => {
        // get record name
        // -- getAllRecords endpoint and filter by record id
        let targetRecord = await this.getTrackingRecordData(this.state.TrackingRecordId)
        let targetRecordName = targetRecord.name

        // get tracking item name
        let trackingItem = await this.getTrackingItemData(this.state.TrackingItemId)
        let targetTrackingItemName = trackingItem.name

        // get tracking item value
        let trackingItemInTargetRecordValue = trackingItem.trackingItemsValues.filter((trackingItemValue) =>
            trackingItemValue.trackingGroupRecordId == this.state.TrackingRecordId
        )
        this.setState({ 'TagetRecordData': targetRecord }, () => {
            this.setState({ 'TagetTrackingItemData': trackingItem }, () => {
                this.setState({ 'TargetTrackingItemValue': trackingItemInTargetRecordValue }, () => {
                    this.setState({ 'isPanelLoading': false })
                })
            })
        })

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
    getTrackingRecordData = async (trackingRecordId) => {
        const token = await authService.getAccessToken();
        let url = endpoints.getTrackingRecordById(trackingRecordId);
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

    updateTrackingItemValue = async () => {
        const token = await authService.getAccessToken();
        let updatedTrackingItemValue = this.state.TrackingItemValueFromAddCommentComponent
        let url = endpoints.updateTrackingItemValue(this.state.TrackingItemValueId)

        let result = await fetch(url, {
            method: 'PATCH',
            headers:
                !token ?
                    {}
                    :
                    {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
            body: JSON.stringify({
                'Value': updatedTrackingItemValue
            })
        })
            .then((res) => {
                this.props.updateTrackingItemsData()
                return res.json();
            })
            .catch((err) => {
                console.log(err)
            });
        // TODO: Fetch the update tracking item value using the update tracking item value endpoint

    }

    getTrackingItemValueFromAddCommentComponent = (trackingitemValue) => {
        this.setState({ 'TrackingItemValueFromAddCommentComponent': trackingitemValue })
    }

    componentDidUpdate(prevProps) {
        // Compare the new props with the previous props
        if (this.props.panelTrackingItemId != prevProps.panelTrackingItemId ||
            this.props.panelTrackingItemValueId != prevProps.panelTrackingItemValueId ||
            this.props.panelTrackingRecordId != prevProps.panelTrackingRecordId) {
            // If the new prop is different, update the state accordingly
            this.setState({ 'TrackingItemId': this.props.panelTrackingItemId }, () => {
                this.setState({ 'TrackingItemValueId': this.props.panelTrackingItemValueId }, () => {
                    this.setState({ 'TrackingRecordId': this.props.panelTrackingRecordId }, () => {
                        this.getTargetData()
                        this.loadComments();
                    })
                })
            })
        }
    }

    render() {
        return (
            <div className='panelListWrapper'>
                {this.props.isPanelVisible == true && this.state.isPanelLoading == false
                    && (
                        <div id='panelContainer'>
                            <div className='panelListHeaderWrapper d-flex'>
                                <h4 className='panelListHeader'>{this.state.TagetRecordData.name}</h4>
                                <h4 className='panel-item'>{this.state.TagetTrackingItemData.name}</h4>
                            </div>
                            <AddComment
                                onCommentAdded={this.loadComments}
                                TagetTrackingItemData={this.state.TagetTrackingItemData}
                                TargetTrackingItemValue={this.state.TargetTrackingItemValue}
                                getTrackingItemValueFromAddCommentComponent={this.getTrackingItemValueFromAddCommentComponent}
                                updateTable={this.updateTrackingItemValue}
                            />
                            <div className='commentsContainer'>
                                {this.state.comments.length > 0 ?
                                    this.state.comments.map((trackingItemValueActivityData) => {
                                        return (
                                            <PanelContainer
                                                trackingItemValueActivityData={trackingItemValueActivityData}
                                                key={trackingItemValueActivityData.id}
                                            />
                                        )

                                    })
                                    :
                                    ""
                                }
                            </div>
                        </div>

                    )
                }
            </div>
        );
    }
}