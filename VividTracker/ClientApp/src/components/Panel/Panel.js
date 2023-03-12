import React, { Component } from 'react'
import './Panel.css'
import authService from '../api-authorization/AuthorizeService';
import { endpoints } from '../../endpoints';
import TrackersSlider from '../TrackersSlider/TrackersSlider';
import { AddComment } from '../AddComment/AddComment';

export class Panel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tenants: [],
            value: '',
            name: 'Milen',
            date: 'Feb 28',
            comment: ''
           
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
        var input = this.state.comment;
        //var date = this.state.date;
        //var name = this.state.name;
        const newNode = document.createElement("p");
        newNode.classList.add("commentsStyle");
        const textNode = document.createTextNode(input);
        //const textNode1 = document.createTextNode(date);
        //const textNode2 = document.createTextNode(name);
        newNode.appendChild(textNode);
        //newNode.appendChild(textNode1);
        //newNode.appendChild(textNode2);
        const list = document.getElementsByClassName("commentsContainer")[0];
        list.insertBefore(newNode, list.children[0]);
    }

    render() {
        return (
            <div className='panelListWrapper d-flex justify-content-center align-items-center'>
                <div className='panelContainer'>
                    <TrackersSlider />
                    <div className='panelContent'>
                        <div className='panelListHeaderWrapper d-flex'>
                            <h4 className='panelListHeader'>Augeo Affinity Marketing</h4>
                            <h4 className='panel-item'>Code Reviews Process</h4>
                        </div>
                        <AddComment />
                        <div className='commentsContainer'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
