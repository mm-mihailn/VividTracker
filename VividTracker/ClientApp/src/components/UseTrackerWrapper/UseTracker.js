import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerComponent.css'
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';
import Table from './Table';
import PanelComponent from '../PanelComponent/PanelComponent';

export default class UseTracker extends Component {
    constructor() {
        super();
        this.state = {
            records: [
                { 'name': 'BlackRiver Systems Inc.' },
                { 'name': 'Augeo Affinity Marketing' },
                { 'name': 'Edmentum Inc.' },
                {
                    'name': 'ExcluCV', 'children': [
                        { 'name': 'ExcluCV backend' },
                        { 'name': 'ExcluCV iOS' },
                        { 'name': 'ExcluCV android' },
                    ]
                },
                { 'name': 'Twin City Services Corp...' }
            ],
            items: [
                {
                    'name': 'Confluence space',
                    'itemValues': [
                        { 'value': 'Yes' },
                        { 'value': 'No' },
                    ]
                },
                {
                    'name': 'Code Reviews Process',
                    'itemValues': [
                        { 'value': 'No' },
                        { 'value': 'No' },
                    ]
                },
                {
                    'name': 'Unit Tests Code Coverage',
                    'itemValues': [
                        { 'value': '70%' },
                        { 'value': '' },
                    ]
                },
                { 'name': 'Level' },
                { 'name': '10X Level' },

            ],
            trackingItemsData: [],
            trackingRecordsData: [],        }

    }


    render() {
        return (
            <div className='UseTrackerComponentWrapper'>
                {/* <div className='blueSeperationLine'></div> */}
                    <div className={this.props.isPanelVisible ? 'UseTrackerComponentContainerPanelVisible' : 'UseTrackerComponentContainerPanelNotVisible'}>

                    {this.props.itemsList.length > 5 ?
                        <FontAwesomeIcon className='scrollElementsButton' onClick={() => this.props.scrollElements()} icon={faAngleLeft} />
                        :
                        ""
                    }
                    <Table 
                        allRecordsRegardlessValuePresence = {this.props.allRecordsRegardlessValuePresence}
                        allItemsRegardlessValuePresence = {this.props.allItemsRegardlessValuePresence}
                        records={this.props.records} 
                        itemsList={this.props.itemsList} 
                        panelHandler = {this.props.panelHandler}
                    />
                    </div>
                   
            </div>
        )
    }
}