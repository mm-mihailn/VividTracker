import React, { Component } from 'react';
import './AddTenant.css';
import $ from 'jquery';

export class AddTenant extends Component {

    constructor(props) {

        super(props);

        this.state = {
            tenants: [],
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {


        this.setState({ value: event.target.value });
    }



    handleSubmit(event) {

        var input = this.state.value;
        
        if (input.length < 3) {
    
            document.getElementById("error").style.color = "red";
            document.getElementById("error").innerHTML = "Name must be at least 3 characters.";
            document.getElementById("name").style.borderBottomColor = "red";
            document.getElementById("error").style.visibility = "visible";

        }
        else if (input.length > 100) {
        
            document.getElementById("error").style.color = "red";
            document.getElementById("error").innerHTML = "Tenant name limit is 100 characters.";
            document.getElementById("name").style.borderBottomColor = "red";
            document.getElementById("error").style.visibility = "visible";
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

                        document.getElementById("error").style.color = "red";
                        document.getElementById("error").innerHTML = "This tenant is already existing.";
                        document.getElementById("name").style.borderBottomColor = "red";
                        document.getElementById("error").style.visibility = "visible";
                    }
                    else {
                        document.getElementById("name").style.borderBottomColor = "green";
                        <span className="text-success" id="messageSuccess">The tenant is added.</span>
                        
                    }
                })
               
             }
        event.preventDefault();
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
        document.getElementById("name").value = " ";
        document.getElementById("error").innerHTML = " ";
        document.getElementById("error").style.visibility = "hidden";
        document.getElementById("name").style.borderBottomColor = "gray";
    }

    render() {

        return (
                
            <><style>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"> </script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"> </script>
                <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            </style>

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
                                                onChange={this.handleChange} required>
                                            </input>

                                            <div className="modal-footer border-0">
                                                <p id="error"></p>
                                                <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal"
                                                    onClick={() => this.clear()}>Close
                                                </button>

                                                <button type="submit" id="submit" method="post" className="btn" name="addTenant"
                                                    onClick={() => this.handleSubmit}                                                > Add
                                                </button>

                                            </div>

                                        </form>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
       
        );
    }
}






