import React from 'react';
import { Slider, Label, Tooltip } from 'devextreme-react/slider';
import { NumberBox } from 'devextreme-react/number-box';
import './TrackersSlider.css';

export class TrackersSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sliderValue: 10 };
        this.setSliderValue = this.setSliderValue.bind(this);
    }

    render() {
        return (
            <div className="form">
                <div className="dx-fieldset">
                    <div className="dx-fieldset-header">Slider</div>
                    <div className="dx-field">
                        <div className="dx-field-label">On handle movement</div>
                        <div className="dx-field-value">
                            <Slider min={0}
                                max={100}
                                value={this.state.sliderValue}
                                onValueChanged={this.setSliderValue} />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">Slider value</div>
                        <div className="dx-field-value">
                            <NumberBox min={0}
                                max={100}
                                value={this.state.sliderValue}
                                showSpinButtons={true}
                                onValueChanged={this.setSliderValue} />
                        </div>
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

export default TrackersSlider;
