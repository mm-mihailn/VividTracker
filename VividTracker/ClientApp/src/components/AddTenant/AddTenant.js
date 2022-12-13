import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './AddTenant.css';
import { Form } from '../AddTenant/Form.js';
import "./Validations.js";
import { Validations } from "./Validations.js";
import $ from 'jquery';
export class AddTenant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tenants: [],
            value: '',
            errorMessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validationHandler = () => {

        var input = this.state.value;

        const errors = {
            success: " ",
            minLength: "Name must be at least 3 characters.",
            maxLenght: "Name limit is 100 characters.",
            existingTenant: "This tenant is already existing"
        }

        const textColor = {
            error: "red",
            success: "green"
        }

        if (input.length < 3) {

            this.setState({ errorMessage: errors.minLength });
        }
        else if (input.length > 100) {

            this.setState({ errorMessage: errors.maxLength });

        }
        else {

            fetch('https://localhost:7091/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": input })
            })
                .then((response) => {
                    if (response.status == 400) {
                        this.setState({ errorMessage: errors.existingTenant });
                    }
                    else {
                        document.getElementById("name").style.borderBottomColor = "green";
                    }
                })

        }



    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.value);
        this.validationHandler();
    }

    showModal = () => {
        $(document).ready(function () {
            $("#createTenant").click(function () {
                $("#myModal").modal();
            });
        });
    }

    componentDidMount() {

        this.render();

    }

    clear() {
        this.setState({ 'value': '' });
        document.getElementById("name").value = this.state.value;
        document.getElementById("error").innerHTML = " ";
        document.getElementById("error").style.visibility = "hidden";
        document.getElementById("name").style.borderBottomColor = "gray";
    }

   

    render() {
        return (

            <div className="container">
                    <div className="container" id="modal">
                        <button type="button" id="createTenant" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#myModal">
                            CreateNewTenant()
                        </button>
                    </div>
                    <div className="modal fade" id="myModal" role="dialog">
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
                                        <form onSubmit={this.handleSubmit}>
                                            <label htmlFor="tenantName" id="label-text">Tenant name:</label>
                                            <input type="text" name="tenantName" className="form-control" id="name"
                                                onChange={(e) => this.setState({ 'value': e.target.value })}>
                                            </input>
                                            <div className="modal-footer border-0">

                                                <div id="error">
                                                    <p>{this.state.errorMessage}</p>
                                                </div>

                                                <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal"
                                                    onClick={() => this.clear()}>Close
                                                </button>
                                                <button type="submit" id="submit" method="post" className="btn" name="addTenant"
                                                > Add
                                                </button>
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
