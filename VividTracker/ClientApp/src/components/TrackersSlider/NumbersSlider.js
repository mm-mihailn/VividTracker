import React, { Component } from 'react';
import { Slider } from 'devextreme-react/slider';
import { NumberBox } from 'devextreme-react/number-box';
import './Styles/NumbersSlider.css';

export default class NumbersSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { sliderValue: 1 };
        this.setSliderValue = this.setSliderValue.bind(this);
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
                    <div className="numberBtn">
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
    return `${value}`;
}
