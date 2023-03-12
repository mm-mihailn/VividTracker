import React, { Component } from 'react';
import './AddTenant.css';
import { endpoints } from "../../endpoints";
import authService from '../api-authorization/AuthorizeService';

export class AddTenant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            errorMessage: '',
            textColor: '',
        }
        this.createTenant = this.createTenant.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async createTenant(event) {
        event.preventDefault();
        console.log(this.state.value);
        var input = this.state.value;
        const token = await authService.getAccessToken();
        const errors = {
            success: "Successfully added a new tenant.",
            minLength: "Name must be at least 3 characters.",
            maxLength: "Name must be less than 100 characters.",
            existingTenant: "This tenant is already existing."
        }
        const color = {
            error: "red",
            success: "green"
        }
        if (input.length < 3) {

            this.setState({ errorMessage: errors.minLength });
            this.setState({ textColor: color.error });
        }
        else if (input.length > 100) {
            this.setState({ errorMessage: errors.maxLength });
            this.setState({ textColor: color.error });
        }
        else {
            await fetch(endpoints.createTenant(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ "name": input })
            })
                .then((response) => {
                    if (response.status == 400) {
                        this.setState({ errorMessage: errors.existingTenant });
                        this.setState({ textColor: color.error });
                    }
                    else {
                        this.setState({ errorMessage: errors.success });
                        this.setState({ textColor: color.success });
                        this.props.onTenantAdded(this.props.value);
                    }
                })
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    componentDidMount() {
        this.render();
    }
    clear() {
        this.setState({ 'value': '' });
        this.setState({ errorMessage: '' });
        this.setState({ textColor: 'gray' })
    }
    render() {
        return (
            <div className="container">
                <div className="container" id="modal">
                    <button type="button" id="createTenant" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#addTenаntModal">
                        CreateNewTenant()
                    </button>
                </div>
                <div className="modal fade" id="addTenаntModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                                <div className="title">
                                    <h4 className="modal-title" id="title">Add Tenant</h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div id="myForm">
                                    <form onSubmit={this.createTenant}>
                                        <label htmlFor="tenantName" id="label-text">Tenant name:</label>
                                        <input type="text" name="tenantName" className="form-control" id="name"
                                            onChange={(e) => this.setState({ 'value': e.target.value })}
                                            style={{ borderBottomColor: this.state.textColor }}
                                            className={this.state.valid == false ? "form-control name name-error" : "form-control name"}
                                        />
                                        <div className="modal-footer border-0">
                                            <div id="errorTenant">
                                                <p style={{ color: this.state.textColor }}>{this.state.errorMessage}</p>
                                            </div>
                                            <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal"
                                                onClick={() => this.clear()} >Clear
                                            </button>
                                            <button type="submit" id="submit" method="post" className="btn" name="addTenant">Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
