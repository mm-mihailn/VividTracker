import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './PanelComponent.css';
import { endpoints } from "../../endpoints";
import PanelContainer from "../PanelContainer/PanelContainer";
import authService from '../api-authorization/AuthorizeService';
import { AddComment } from '../AddComment/AddComment';
import NumbersSlider from '../TrackersSlider/NumbersSlider';
import PercentagesSlider from '../TrackersSlider/PercentagesSlider';
import BoolsMenu from '../TrackersSlider/BoolsMenu';

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
            isDivVisible: true
        }
        this.loadComments = this.loadComments.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    handleKeyDown(event) {
        if (event.key === 'F') {
            this.setState({ isDivVisible: false });
        }
    }
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
    render() {
        //const { isDivVisible } = this.state;
        //if (this.state.numbersRender) {
        //    return (
        //        <div className='panelListWrapper d-flex justify-content-center align-items-center'>
        //            <div id='panelContainer' className={isDivVisible ? 'visible' : 'hidden'}>
        //                <div className='panelListHeaderWrapper d-flex'>
        //                    <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
        //                    <h4 className='panel-item'>Code Reviews Process</h4>
        //                </div>
        //                <AddComment onCommentAdded={this.loadComments()} />
        //                <div className='commentsContainer'>
        //                    {this.state.comments.map((trackingItemValueActivityData) => {
        //                        return (
        //                            <PanelContainer trackingItemValueActivityData={trackingItemValueActivityData}
        //                                key={trackingItemValueActivityData.id} />
        //                        )
        //                    })}
        //                </div>
        //            </div>
        //        </div>
        //    );
        //}
        //else if (this.state.percentagesRender) {
        //    return (
        //        <div className='panelListWrapper d-flex justify-content-center align-items-center'>
        //            <div className='panelContainer'>
        //                <div className='panelListHeaderWrapper d-flex'>
        //                    <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
        //                    <h4 className='panel-item'>Code Reviews Process</h4>
        //                </div>
        //                <AddComment onCommentAdded={this.loadComments()} />
        //                <div className='commentsContainer'>
        //                    {this.state.comments.map((trackingItemValueActivityData) => {
        //                        return (
        //                            <PanelContainer trackingItemValueActivityData={trackingItemValueActivityData}
        //                                key={trackingItemValueActivityData.id} />
        //                        )
        //                    })}
        //                </div>
        //            </div>
        //        </div>
        //    );
        //}
        //else if (this.state.boolsRender) {
        //    return (
        //        <div className='panelListWrapper d-flex justify-content-center align-items-center'>
        //            <div className='panelContainer'>
        //                <div className='panelListHeaderWrapper d-flex'>
        //                    <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
        //                    <h4 className='panel-item'>Code Reviews Process</h4>
        //                </div>
        //                <AddComment onCommentAdded={this.loadComments()} />
        //                <div className='commentsContainer'>
        //                    {this.state.comments.map((trackingItemValueActivityData) => {
        //                        return (
        //                            <PanelContainer trackingItemValueActivityData={trackingItemValueActivityData}
        //                                key={trackingItemValueActivityData.id} />
        //                        )
        //                    })}
        //                </div>
        //            </div>
        //        </div>
        //    );
        //}
        //else {
        //    return null;
        //}
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                <div id='panelContainer' >
                    <div className='panelListHeaderWrapper d-flex'>
                        <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                        <h4 className='panel-item'>Code Reviews Process</h4>
                    </div>
                    <AddComment onCommentAdded={this.loadComments()} />
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
        );
    }
}
