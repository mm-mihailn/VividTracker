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
            boolsValue: false
        }
        this.loadComments = this.loadComments.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
        //this.checkValue();
    }

    handleSaveInputValues = () => {
        console.log(this.state.childInputValues);
    };

    //checkValue() {
    //    let number = this.state.numberValue;
    //    let percentage = this.state.percentageValue;
    //    let bool = this.state.boolValue
    //    if (number >= 1 && number <= 5) {
    //        this.state.numbersRender = true;
    //    }
    //    else if (percentage >= 0 && percentage <= 100) {
    //        this.state.percentagesRender = true;
    //    }
    //    else if (bool == false || bool == true) {
    //        this.state.boolsRender = true;
    //    }
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
        if (this.state.numbersRender) {
            return (
                <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                    <div className='panelContainer'>
                        <div className='panelListHeaderWrapper d-flex'>
                            <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                            <h4 className='panel-item'>Code Reviews Process</h4>
                        </div>
                        <div className='numbersSliderContainer'>
                            <NumbersSlider />
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.percentagesRender) {
            return (
                <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                    <div className='panelContainer'>
                        <div className='panelListHeaderWrapper d-flex'>
                            <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                            <h4 className='panel-item'>Code Reviews Process</h4>
                        </div>
                        <div className='percentagesSliderContainer'>
                            <PercentagesSlider />
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.boolsRender) {
            return (
                <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                    <div className='panelContainer'>
                        <div className='panelListHeaderWrapper d-flex'>
                            <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                            <h4 className='panel-item'>Code Reviews Process</h4>
                        </div>
                        <div className='boolsMenuContainer'>
                            <BoolsMenu />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                <div className='panelContainer'>
                    <div className='panelListHeaderWrapper d-flex'>
                        <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                        <h4 className='panel-item'>Code Reviews Process</h4>
                    </div>
                    {/*<div className="boolsForm">*/}
                    {/*    <BoolsMenu ref={(cd) => this.child = cd} />*/}
                    {/*</div>*/}
                    {/*<div className="percentagesSlider">*/}
                    {/*    <PercentagesSlider ref={(cd) => this.child = cd} />*/}
                    {/*</div>*/}
                    <div className="numbersSlider">
                        <NumbersSlider
                            sliderValue={this.state.childInputValues.child1}
                            onChange={(value) =>
                                this.setState({
                                    childInputValues: {
                                        ...this.state.childInputValues,
                                        child1: value,
                                    },
                                })
                            }
                        />
                    </div>
                    <div className='panelContent'>
                        <div className='createNewCommentButtonWrapper'>
                            <AddComment
                                inputValue={this.state.childInputValues.child2}
                                onChange={(value) =>
                                    this.setState({
                                        childInputValues: {
                                            ...this.state.childInputValues,
                                            child2: value,
                                        },
                                    })
                                }
                            />
                        </div>
                        <button type="submit" className="submitItems"
                            onClick={this.handleSaveInputValues}>Add
                        </button>
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
