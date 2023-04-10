import React, { Component } from 'react';
import { Slider } from 'devextreme-react/slider';
import { NumberBox } from 'devextreme-react/number-box';
import './Styles/PercentagesSlider.css';
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

export default class PercentagesSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { sliderValue: 0 };
        this.setSliderValue = this.setSliderValue.bind(this);
        this.createPercentageItem = this.createPercentageItem.bind(this);
    }

    createPercentageItem = async () => {
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
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="percentagesForm">
                <div className="dx-fieldset">
                    <div className="percentageTxt">
                        <span id="percentageTxt-min">0%</span>
                        <span id="percentageTxt-max">100%</span>
                    </div>
                    <div className="dx-field">

                        <div className="dx-field-value">
                            <Slider min={0}
                                max={100}
                                value={this.state.sliderValue}
                                onValueChanged={this.setSliderValue} />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-value">
                            <NumberBox min={0}
                                max={100}
                                value={this.state.sliderValue}
                                showSpinButtons={true}
                                onValueChanged={this.setSliderValue} />
                        </div>
                    </div>
                    {/*<div className="percentageBtn">*/}
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
    return `${value}%`;
}
