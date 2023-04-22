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
            //inputValue: "",
        };
        this.createNumberItem = this.createNumberItem.bind(this);
        this.setSliderValue = this.setSliderValue.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({ sliderValue: event.target.value });
    };

    createNumberItem = async () => {
        console.log(this.state.sliderValue);
        var trackingGroupId = 157;
        var trackingItemId = 2;
        var trackingGroupRecordId = 6;
        const token = authService.getAccessToken();
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
    setSliderValue({ value }) {
        this.setState({ sliderValue: value });
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
                                onChange={this.handleInputChange}
                                onValueChanged={this.setSliderValue}
                            />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-value">
                            <NumberBox min={1}
                                max={5}
                                value={this.state.sliderValue}
                                onChange={this.handleInputChange}
                                showSpinButtons={true}
                                onValueChanged={this.setSliderValue} 
                            />
                        </div>
                    </div>
                    <div className="numberBtn">
                        <button className="saveBtn"
                            onClick={(trackingGroupId, trackingItemId, trackingGroupRecordId) =>
                                this.createNumberItem(trackingGroupId, trackingItemId, trackingGroupRecordId)}>
                            Save</button>
                    </div>
                </div>
            </div>
        );
    }
}
