import React, { Component } from 'react';
import './AddComment.css';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';

export class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.handleChange = this.handleChange.bind(this);
    }

    async createComment() {
        console.log(this.state.comment);
        var input = this.state.comment;
        const currentDate = new Date();
        var trackingItemValueId = 2;
        const token = await authService.getAccessToken();
        const errors = {
            minLength: "You cannot submit an empty field.",
            maxLength: "Comment is too long",
            success: "Successfuly added a new comment",
            invalid: "Invalid input"
        }
        const color = {
            error: "red",
            success: "green"
        }
        if (input.length < 1) {

            this.setState({ errorMessage: errors.minLength });
            this.setState({ textColor: color.error });
        }
        else if (input.length > 255) {
            this.setState({ errorMessage: errors.maxLength });
            this.setState({ textColor: color.error });
        }
        else {
            var url = endpoints.createComment(trackingItemValueId);
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                    "Comment": input,
                    //"TimeStamp": currentDate.toISOString(),
                    "UserId": "5e5c3b5b-e47b-4017-8d60-bed6f5fcffb3"
                })
            })
                .then((response) => {

                    //console.log(formattedDate);
                    if (response.status != 200) {
                        this.setState({ textColor: color.error });
                        this.setState({ errorMessage: errors.invalid });
                    }
                    else {
                        this.setState({ textColor: color.success });
                        this.setState({ errorMessage: errors.success });
                    }
                })
        }
    }
    handleChange(event) {
        this.setState({ comment: event.target.value });
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
                            onChange={(e) => this.setState({ 'comment': e.target.value })}
                            className={this.state.valid == false ? "form-control name name-error" : "form-control name"}
                        />
                        <button type="submit" id="submitPanel"
                            onClick={(trackingItemValueId) => this.createComment(trackingItemValueId)}>Add
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