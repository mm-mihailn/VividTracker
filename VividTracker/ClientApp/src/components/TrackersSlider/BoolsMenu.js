import React, { Component } from 'react';
import './Styles/BoolsMenu.css';
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

export default class BoolsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boolValue: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.createBooleanItem = this.createBooleanItem.bind(this);
    }

    createBooleanItem = async (event) => {
        event.preventDefault();
        console.log(this.state.boolValue);
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
                "Value": this.state.boolValue
            })
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleChange(event) {
        this.setState({ boolValue: event.target.value });
    }
    render() {
        return (
            <div>
                <div className="boolsForm">
                    <form>
                        <select className='form-control'
                            onChange={(e) => this.setState({ 'boolValue': e.target.value })}
                            value={this.state.boolValue}>
                            <option value={0}>False</option>
                            <option value={1}>True</option>
                        </select>
                        {/*<div className="boolBtn">*/}
                        {/*    <button className="saveBtn">Save</button>*/}
                        {/*</div>*/}
                    </form>
                </div>
            </div>
        );
    }
}