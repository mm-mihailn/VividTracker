import React, { Component } from 'react';
import { Slider } from 'devextreme-react/slider';
import { NumberBox } from 'devextreme-react/number-box';
import './TrackersSlider.css';

export default class TrackersSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { sliderValue: 0 };
        this.setSliderValue = this.setSliderValue.bind(this);
    }

    render() {
        return (
            <div className="form">
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
                    <div className="percentageBtn">
                        <button className="saveBtn">Save</button>
                    </div>
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

//export default TrackersSlider;
