import React, { Component } from 'react';
import './AddComment.css';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';

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
        }
        this.createComment = this.createComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };
    
    async createComment() {
        var trackingItemId = 2;
        const token = await authService.getAccessToken();
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
                    "UserId": "5e5c3b5b-e47b-4017-8d60-bed6f5fcffb3"
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
                    }
                })
        }
    }
    componentDidMount() {
        this.render();
    }
    render() {
        return (
            <div className="container">
                <div className="container">
                    <div className='CreateNewTenantButtonWrapper'>
                        <input type="text" id="input-comment" className="form-control"
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            className={this.state.valid == false ? "form-control name name-error" : "form-control name"}
                        />
                        {/*<button type="submit" id="submitPanel"*/}
                        {/*    onClick={() => { this.createComment(); this.props.createItem(); }}>Add*/}
                        {/*</button>*/}
                        <div id="errorComment">
                            <p>{this.state.errorMessage}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}