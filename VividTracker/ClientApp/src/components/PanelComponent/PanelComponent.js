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

    //getUserName = async (userId) => {
    //    userId = "5e5c3b5b-e47b-4017-8d60-bed6f5fcffb3";
    //    const token = await authService.getAccessToken();
    //    let url = endpoints.getUserName(userId);
    //    await fetch(url, {
    //        headers: {
    //            'Content-Type': 'application/json',
    //            'Authorization': `Bearer ${token}`
    //        },
    //    })
    //        .then(async (res) => {
    //            let userData = await res.json()
    //            this.setState({ 'userData': userData })
    //            this.setState({ 'userName': userData.userName })
    //        }
    //        )
    //}

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
                <div className='panelContainer'>
                    <div className='panelListHeaderWrapper d-flex'>
                        <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                        <h4 className='panel-item'>Code Reviews Process</h4>
                    </div>
                    <div className="boolsForm">
                        <BoolsMenu />
                    </div>
                    <div className="percentagesSlider">
                        <PercentagesSlider />
                    </div>
                    <div className="numbersSlider">
                        <NumbersSlider />
                    </div>

                    <div className='panelContent'>
                        <div className='createNewCommentButtonWrapper'>
                            <AddComment onCommentAdded={this.loadComments} />
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
