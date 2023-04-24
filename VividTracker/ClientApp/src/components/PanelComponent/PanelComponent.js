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
            isDivHidden: false
        }
        this.loadComments = this.loadComments.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
        document.addEventListener("keydown", this.handleKeyDown);
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
    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                {this.state.isDivHidden ? null : (
                    <div id='panelContainer'>
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
                )}
            </div>
        );
    }
}
