import React, { Component } from 'react';
import './AddComment.css';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';

export class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            errorMessage: '',
            textColor: '',
        }
        this.createComment = this.createComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async createComment(event) {
        console.log(this.state.comment);
        event.preventDefault();
        var input = this.state.comment;
        var trackingItemValueId = 1;
        const currentDate = new Date();
        const token = await authService.getAccessToken();
        const errors = {
            minLength: "You cannot submit an empty field.",
            maxLength: "Comment is too long",
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
            await fetch(endpoints.createComment(trackingItemValueId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "comment": input,
                    "timeStamp": currentDate.toISOString(),
                    "trackingItemValueId": trackingItemValueId,
                    "userId": "5e5c3b5b-e47b-4017-8d60-bed6f5fcffb3"
                })
            })
                .then((response) => {
                    if (response.status == 400) {
                        this.setState({ textColor: color.error });
                    }
                    else {
                        this.setState({ textColor: color.success });
                        this.props.onCommentAdded(this.props.comment);
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
                            onClick={() => this.createComment()}>Add
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