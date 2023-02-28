//import React, { Component } from 'react';
//import './Panel.css';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import { faComments } from "@fortawesome/free-regular-svg-icons";

//export class Panel extends Component {
//    static displayName = Panel.name;

//    useSlider() {
//        var slider = document.getElementById("myRange");
//        var output = document.getElementById("demo");
//        output.innerHTML = slider.value;

//        slider.oninput = function () {
//            output.innerHTML = this.value;
//        }
//    }

//    componentDidMount() {
//        this.useSlider();
//        this.render();
//    }

//    render() {
//        return (
//            <div>
//                <div className="container">

//                    <div className="panel">
//                        <div className="panel-header">
//                            <p className="project-name">Augeo Affinity Marketing</p>
//                            <p className="item-name">Code Reviews Process</p>
//                        </div>

//                        <div className="panel-body">
//                            <p className="comment-name">Milen</p>
//                            <p className="date">Feb 22</p>
//                            <p className="comment">I think we are good on that</p>
//                        </div>
//                        <div className="container-icon">
//                            <FontAwesomeIcon className='comment-icon' icon={faComments} />
//                        </div>
//                    </div>

//                    <div className="slideContainer">
//                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
//                        <p><span id="demo"></span></p>
//                        {/*<input type="range" min="1" max="100" className="slider" value="50"/>*/}
//                    </div>

//                </div>
//            </div>
//        );
//    }
//}


import React, { Component } from 'react'
import './Panel.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import TenantContainerComponent from '../TenantContainerComponent/TenantContainerComponent';
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';
import { useState } from "react";

export class Panel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tenants: [],
            value: '',
            //user: [
            //    {
            //        'name': 'Milen',
            //        'date': 'Feb 28',
            //        'comment': 'my comment'
            //    }
            //]
            name: 'Milen',
            date: 'Feb 28',
            comment: 'my comment'
        }
        this.loadTenants = this.loadTenants.bind(this);
    }
    async componentDidMount() {
        this.loadTenants();
    }
    async loadTenants() {
        const token = await authService.getAccessToken();
        await fetch(endpoints.loadTenants(), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ tenants: res }))
    }

    addComment() {
        var input = this.state.value;
        const newNode = document.createElement("li");
        // Create a text node:
        const textNode = document.createTextNode(input);
        // Append text node to "li" element:
        newNode.appendChild(textNode);

        // Insert before existing child:
        const list = document.getElementById("commentsList");
        list.insertBefore(newNode, list.children[0]);
    }

    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                <div className='panelContainer'>
                    <div className='panelContent'>
                        <div className='panelListHeaderWrapper d-flex'>
                            <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                            <h4 className='panel-item'>Code Reviews Process</h4>
                        </div>
                        <div className='CreateNewTenantButtonWrapper'>
                            <input type="text" id="input-comment" className="form-control"
                                onChange={(e) => this.setState({ 'value': e.target.value })}
                                className={this.state.valid == false ? "form-control name name-error" : "form-control name"}
                            />
                            <button type="submit" id="submitPanel" onClick={() => this.addComment()} >Add</button>
                        </div>
                        <div className='commentsContainer'>
                            <p>{this.state.name}</p>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
