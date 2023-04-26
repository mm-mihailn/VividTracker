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
            isPanelVisible: false,
            TrackingItemId: -1,
            TrackingItemValueId: -1,
            TrackingRecordId: -1,
            TagetRecordData: null,
            TagetTrackingItemData: null,
            TargetTrackingItemValue: -1,
            isPanelLoading: true
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
            this.setState({ isPanelVisible: false });
            this.props.panelHandler()
        }
    };
    handleSaveInputValues = () => {
        // console.log(this.state.childInputValues);
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
             let targetRecord = await this.getTrackingRecordData(this.state.TrackingRecordId)
             let targetRecordName = targetRecord.name

             // get tracking item name
             let trackingItem = await this.getTrackingItemData(this.state.TrackingItemId)
             let targetTrackingItemName = trackingItem.name

             // get tracking item value
             let trackingItemInTargetRecordValue = trackingItem.trackingItemsValues.filter((trackingItemValue) => 
                trackingItemValue.trackingGroupRecordId == this.state.TrackingRecordId
             )
             this.setState({'TagetRecordData': targetRecord }, () => {
                 this.setState({'TagetTrackingItemData': trackingItem }, () => {
                     this.setState({'TargetTrackingItemValue': trackingItemInTargetRecordValue }, () => {
                         this.setState({'isPanelLoading': false})
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

    componentDidUpdate(prevProps) {
        // Compare the new props with the previous props
        if (this.props.panelTrackingItemId != prevProps.panelTrackingItemId ||
            this.props.panelTrackingItemValueId != prevProps.panelTrackingItemValueId ||
            this.props.panelTrackingRecordId != prevProps.panelTrackingRecordId) {
            // If the new prop is different, update the state accordingly
            this.setState({'TrackingItemId': this.props.panelTrackingItemId}, () => {
                this.setState({'TrackingItemValueId': this.props.panelTrackingItemValueId}, () => {
                    this.setState({'TrackingRecordId': this.props.panelTrackingRecordId}, () => {
                        this.getTargetData()
                    })
                })
            })
        }
    }
    
    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                {this.state.isPanelVisible == false && this.state.isPanelLoading == false 
                && (
                    <div id='panelContainer'>
                        <div className='panelListHeaderWrapper d-flex'>
                            <h4 className='panelListHeader'>{this.state.TagetRecordData.name}</h4>
                            <h4 className='panel-item'>{this.state.TagetTrackingItemData.name}</h4>
                        </div>
                        <AddComment onCommentAdded={this.loadComments}  updatePanel = {this.updatePanel}/>
                        <div className='commentsContainer'>
                            {this.state.comments.map((trackingItemValueActivityData) => {
                                return (
                                    <PanelContainer trackingItemValueActivityData={trackingItemValueActivityData}
                                        key={trackingItemValueActivityData.id}/>   
                                )
                                
                            })
                            }
                        </div>
                    </div>
                    
                    )
                }
            </div>
        );
    }
}
