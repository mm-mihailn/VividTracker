import React, { Component } from 'react';
import './AddComment.css';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';
import { Slider } from 'devextreme-react/slider';
import { NumberBox } from 'devextreme-react/number-box';
import './Styles/NumbersSlider.css';
import './Styles/PercentagesSlider.css';
import './Styles/BoolsMenu.css';

export class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            comment: '',
            userId: '',
            timeStamp: '',
            trackingItemValueId: '',
            trackingItemId: '',
            trackingGroupRecordId: '',
            errorMessage: '',
            textColor: '',
            sliderValue: 1,
            numbersRender: true,
            percentagesRender: false,
            boolsRender: false,
            isDivVisible: true
        }
        this.createComment = this.createComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNumberItem = this.createNumberItem.bind(this);
        this.setSliderValue = this.setSliderValue.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    }
    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
        
    };
    handleSliderChange = (event) => {
        this.setState({ sliderValue: event.target.value });
    };
    async createComment() {
        var trackingItemId = this.state.trackingItemId;   
        const token = await authService.getAccessToken();
        let userData = await authService.getUser()
        let userID = userData.sub
        const errors = {
            minLength: "You cannot submit an empty field.",
            maxLength: "Comment is too long.",
            success: "Successfuly added a new comment.",
            invalid: "Invalid input."
        }
        const color = {
            error: "red",
            success: "green"
        }
        if (this.state.inputValue.length < 1) {

            this.setState({ errorMessage: errors.minLength });
            this.setState({ textColor: color.error });
        }
        else if (this.state.inputValue.length > 255) {
            this.setState({ errorMessage: errors.maxLength });
            this.setState({ textColor: color.error });
        }
        else {
            var url = endpoints.createComment(trackingItemId);
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "Comment": this.state.inputValue,
                    "UserId": userID 
                })
            })
                .then((response) => {
                    if (response.status != 200) {
                        this.setState({ textColor: color.error });
                        this.setState({ errorMessage: errors.invalid });
                    }
                    else {
                        this.setState({ textColor: color.success });
                        this.setState({ errorMessage: errors.success });
                        this.props.onCommentAdded(this.props.value);
                        this.state.inputValue = '';
                    }
                })
        }
    }
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
        this.props.getTrackingItemValueFromAddCommentComponent(this.state.sliderValue)
    }
    handleAddButtonClick() {
        this.createComment();
        // this.createNumberItem();
    }
    componentDidMount() {

        if(this.props.TargetTrackingItemValue.length > 0)
        {
            this.setState({'sliderValue':this.props.TargetTrackingItemValue[0].value})
            this.setState({'trackingItemId': this.props.TargetTrackingItemValue[0].id})
        }
        this.render();
    }
    componentDidUpdate(prevProps)
    {
        if(this.props.TargetTrackingItemValue.length > 0 && prevProps.TargetTrackingItemValue.length > 0)
        {
            if(prevProps.TargetTrackingItemValue[0].value != this.props.TargetTrackingItemValue[0].value)
            {
                this.setState({'sliderValue':this.props.TargetTrackingItemValue[0].value})
            }
        }

    }
    render() {
        if (this.state.numbersRender) {
            return (
                <div className="container">
                    <div id="numbersForm">
                        <div className="dx-fieldset">
                            <div className="numberTxt">
                                <span id="numberTxt-min">1</span>
                                <span id="numberTxt-max">5</span>
                            </div>
                            <div className="dx-field">
                                <div className="dx-field-value">
                                    <Slider min={0}
                                        max={this.props.TagetTrackingItemData.target}
                                        value={this.state.sliderValue}
                                        onChange={this.handleInputChange}
                                        onValueChanged={this.setSliderValue}
                                    />
                                </div>
                            </div>
                            <div className="dx-field">
                                <div className="dx-field-value">
                                    <NumberBox min={0}
                                        max={this.props.TagetTrackingItemData.target}
                                        value={this.state.sliderValue}
                                        onChange={this.handleInputChange}
                                        showSpinButtons={true}
                                        onValueChanged={this.setSliderValue}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className='CreateNewTenantButtonWrapper'>
                            <input type="text" id="input-comment"
                                value={this.state.inputValue}
                                onChange={(e) => this.setState({ 'inputValue': e.target.value })}
                                className={this.state.valid == false ? "form-control name name-error" : "form-control name"}
                            />
                            <button type="submit" id="submitPanel"
                                onClick={this.handleAddButtonClick}>Add
                            </button>
                            <div id="errorComment">
                                <p>{this.state.errorMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.percentagesRender) {
            return (
                <div className="container">
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
                                        onChange={this.handleInputChange}
                                        onValueChanged={this.setSliderValue} />
                                </div>
                            </div>
                            <div className="dx-field">
                                <div className="dx-field-value">
                                    <NumberBox min={0}
                                        max={100}
                                        value={this.state.sliderValue}
                                        onChange={this.handleInputChange}
                                        showSpinButtons={true}
                                        onValueChanged={this.setSliderValue} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className='CreateNewTenantButtonWrapper'>
                            <input type="text" id="input-comment"
                                value={this.state.inputValue}
                                onChange={(e) => this.setState({ 'inputValue': e.target.value })}
                                className={this.state.valid == false ? "form-control name name-error" : "form-control name"}
                            />
                            <button type="submit" id="submitPanel"
                                onClick={this.handleAddButtonClick}>Add
                            </button>
                            <div id="errorComment">
                                <p>{this.state.errorMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.boolsRender) {
            return (
                <div className="container">
                    <div className="boolsForm">
                        <form onSubmit={this.createNumberItem}>
                            <select className='form-control'
                                onChange={(e) => this.setState({ 'sliderValue': e.target.value })}
                                value={this.state.sliderValue}>
                                <option value={0}>False</option>
                                <option value={1}>True</option>
                            </select>
                        </form>
                    </div>
                    <div className="container">
                        <div className='CreateNewTenantButtonWrapper'>
                            <input type="text" id="input-comment"
                                value={this.state.inputValue}
                                onChange={(e) => this.setState({ 'inputValue': e.target.value })}
                                className={this.state.valid == false ? "form-control name name-error" : "form-control name"}
                            />
                            <button type="submit" id="submitPanel"
                                onClick={this.handleAddButtonClick}>Add
                            </button>
                            <div id="errorComment">
                                <p>{this.state.errorMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}