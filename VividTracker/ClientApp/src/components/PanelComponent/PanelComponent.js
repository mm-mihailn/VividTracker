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
        }
        this.loadComments = this.loadComments.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
    }
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
    addItems = () => {
        //do something
        this.createComment();
        //do something
        this.createItem();
    }
    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                <div className='panelContainer'>
                    <div className='panelListHeaderWrapper d-flex'>
                        <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                        <h4 className='panel-item'>Code Reviews Process</h4>
                    </div>
                    <div className="boolsForm">
                        <BoolsMenu onBooleanAdded={this.createItem} />
                    </div>
                    <div className="percentagesSlider">
                        <PercentagesSlider onPercentageAdded={this.createItem} />
                    </div>
                    <div className="numbersSlider">
                        <NumbersSlider onNumberAdded={this.createItem} />
                    </div>
                    <div className='panelContent'>
                        <div className='createNewCommentButtonWrapper'>
                            <AddComment onCommentAdded={this.loadComments} />
                        </div>
                        <div className='saveItems'>
                            <button type="submit" className="submitItems"
                                onClick={this.addItems}>Add
                            </button>
                        </div>
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
