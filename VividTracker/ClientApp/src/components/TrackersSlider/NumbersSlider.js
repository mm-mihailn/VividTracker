import React, { Component } from 'react';
import { Slider } from 'devextreme-react/slider';
import { NumberBox } from 'devextreme-react/number-box';
import './Styles/NumbersSlider.css';
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

export default class NumbersSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 1,
        };
        this.setSliderValue = this.setSliderValue.bind(this);
        this.createItem = this.createItem.bind(this);
    }

    async createItem() {
        console.log(this.state.sliderValue);
        var trackingGroupId = 157;
        var trackingItemId = 1;
        var trackingGroupRecordId = 1;
        const token = await authService.getAccessToken();
        var url = endpoints.createItem(trackingGroupId, trackingItemId, trackingGroupRecordId);
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "TrackingGroupId": trackingGroupId,
                "TrackingItemId": trackingItemId,
                "TrackingGroupRecordId": trackingGroupRecordId,
                "Value": this.state.sliderValue
            })
        })
           .then((res) => {
               console.log(res)
               this.props.onNumberAdded(this.createItem)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className="numbersForm">
                <div className="dx-fieldset">
                    <div className="numberTxt">
                        <span id="numberTxt-min">1</span>
                        <span id="numberTxt-max">5</span>
                    </div>
                    <div className="dx-field">

                        <div className="dx-field-value">
                            <Slider min={1}
                                max={5}
                                value={this.state.sliderValue}
                                onValueChanged={this.setSliderValue} />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-value">
                            <NumberBox min={1}
                                max={5}
                                value={this.state.sliderValue}
                                showSpinButtons={true}
                                onValueChanged={this.setSliderValue} />
                        </div>
                    </div>
                    {/*<div className="numberBtn">*/}
                    {/*    <button className="saveBtn"*/}
                    {/*        onClick={(trackingGroupId, trackingItemId, trackingGroupRecordId) =>*/}
                    {/*            this.createItem(trackingGroupId, trackingItemId, trackingGroupRecordId)}>*/}
                    {/*        Save</button>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }

    setSliderValue({ value }) {
        this.setState({ sliderValue: value });
    }
}

function format(value) {
    return `${value}`;
}
