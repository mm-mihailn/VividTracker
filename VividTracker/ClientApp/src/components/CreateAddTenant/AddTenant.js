import React, { Component } from 'react';
import './AddTenant.css';
import $ from 'jquery';
import { Input } from 'reactstrap';
import { register } from '../../serviceWorkerRegistration';
//import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';
//import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css';
//import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js';
//import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export class AddTenant extends Component {

    constructor() {
        super()
        this.state = {
            tenants: [],
            tenantName: ""
        }
    }


    addTenant() {

        //getData();

        //async function getData() {

        //    const response = await fetch('https://localhost:7091/tenants');
        //    const data = await response.json();
        //    var length = data.tenantName.length;
        //    var temp = "";
        //    for (var i = 0; i < length; i++) {
        //        temp += data.tenantName[i];
        //    }

        //    elements.push(temp);
        //}


        getText('https://localhost:7091/api/tenants');   

        var input = this.state.tenantName;
        var elements = [];

        async function getText(url) {

            let object = await fetch(url);
            let myText = await object.text();
            var array = myText.split(" ");


            if (array.charAt(0) === array.charAt(0).toUpperCase()) {
                var element = array.charAt(0);
                elements.push(element);
            }
            
        }

        //var elements = ["Mentormate", "HardSoft Inc.", "Dream Corp",
        //    "PM Corse Racing Team", "Low Peak High School", "Blue"];

        //var elements = [];

        //var isContaining = elements.find(element => element == input)

        if (input.length < 3) {

            document.getElementById("error").style.color = "red";
            document.getElementById("error").innerHTML = "Tenant name must be at least 3 characters.";
            document.getElementById("name").style.borderBottomColor = "red";
            document.getElementById("error").innerHTML = "Tenant name must be at least 3 characters.";
            document.getElementById("error").style.visibility = "visible";

        }
        else if (input.length > 30) {

            document.getElementById("error").style.color = "red";
            document.getElementById("error").innerHTML = "Tenant name limit is 100 characters.";
            document.getElementById("name").style.borderBottomColor = "red";
            document.getElementById("error").style.visibility = "visible";
        }
        else if (input == "") {
            document.getElementById("error").style.color = "red";
            document.getElementById("error").innerHTML = "Tenant name must be filled out.";
            document.getElementById("name").style.borderBottomColor = "red";
            document.getElementById("error").style.visibility = "visible";
        }
        //else if (elements.includes(input)) {
        //    document.getElementById("error").style.color = "red";
        //    document.getElementById("error").innerHTML = "This tenant is existing.";
        //    document.getElementById("name").style.borderBottomColor = "red";
        //    document.getElementById("error").style.visibility = "visible";
        //}
        //else if (BadRequest) {
        //    document.getElementById("error").style.color = "red";
        //    document.getElementById("error").innerHTML = "This tenant is existing.";
        //    document.getElementById("name").style.borderBottomColor = "red";
        //    document.getElementById("error").style.visibility = "visible";
        //}
        else {

            document.getElementById("name").style.borderBottomColor = "green";

            fetch('https://localhost:7091/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": input })
            })
                .then(response => response.json())
                .then(response => console.log(JSON.stringify(response)))
        }
    }


    showModal = () => {

        $(document).ready(function () {
            $("#createTenant").click(function () {
                $("#myModal").modal();
            });
        });
    }

    //hideModal = () => {
    //    $('#myModal').on('hidden.bs.modal', function (e) {
    //        $(this).find('#myForm')[1].reset();
    //    });
    //}

    componentDidMount() {

        this.render()
    }

    clear() {

        document.getElementById("name").value = " ";
        document.getElementById("error").innerHTML = " ";
        document.getElementById("error").style.visibility = "hidden";
        document.getElementById("name").style.borderBottomColor = "gray";

    }

    render() {


        return (
            <html>

                <head>

                    <style>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"> </script>
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"> </script>
                        <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
                    </style>

                </head>

                <body>

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

                                            <label for="name" id="label-text">Tenant name:</label>
                                            <input type="text" className="unique" className="form-control" id="name" onChange={(e) => this.setState({ 'tenantName': e.target.value })}></input>
                                           

                                            <div className="modal-footer border-0">
                                                <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal" onClick={() => this.clear()}>Close</button>
                                                <button type="submit" id="submit" method="post" className="btn" name="addTenant" onClick={() => this.addTenant()}> Add</button>
                                            </div>

                                            <p id="error"></p>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </body>

            </html>

        );
    }
}



