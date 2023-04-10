import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerComponent.css'
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';
import Table from './Table';

export default class UseTracker extends Component {
    constructor()
    {
        super();
        this.state = {
            records: [
                {'name': 'BlackRiver Systems Inc.'},
                {'name': 'Augeo Affinity Marketing'},
                {'name': 'Edmentum Inc.'},
                {'name': 'ExcluCV', 'children': [
                    {'name': 'ExcluCV backend'},
                    {'name': 'ExcluCV iOS'},
                    {'name': 'ExcluCV android'},
                ]},
                {'name': 'Twin City Services Corp...'}
            ],
            items: [
                {'name': 'Confluence space', 
                'itemValues': [
                        {'value': 'Yes'}, 
                        {'value': 'No'}, 
                    ]},
                {'name': 'Code Reviews Process',
                'itemValues': [
                    {'value': 'No'}, 
                    {'value': 'No'}, 
                ]},
                {'name': 'Unit Tests Code Coverage',
                'itemValues': [
                    {'value': '70%'}, 
                    {'value': ''}, 
                ]},
                {'name': 'Level'},
                {'name': '10X Level'},

            ],

            trackingItemsData: [],
            trackingRecordsData: []
        }
        
    }
    scrollElements = () => {
        let firstColumn = this.state.trackingItemsData[0]
        this.setState({'trackingItemsData': this.state.trackingItemsData.filter((item) => item != firstColumn)})
        // TODO: put smooth transition animation
        this.setState((prevState) => ({
            trackingItemsData: [...prevState.trackingItemsData, firstColumn]
        }))
    }

    getTrackingItemsData = async () => {
        const token = await authService.getAccessToken();
        let LocationSplitted = window.location.href.split('/')
        let TrackingGroupID = LocationSplitted[LocationSplitted.length - 1]
        let url = endpoints.getTrackingItemsDataByTrackingGroupId(TrackingGroupID)
        await fetch(url, {
            method: 'GET',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then(async (res) => {
            let trackingItemsData = await res.json()
            let allRecordsNames = trackingItemsData.map((trackingItemObject) => {
                return {name: trackingItemObject.trackingGroupRecord.name}
            })
            let allRecordsIds = trackingItemsData.map((trackingItemObject) => {
                return {id: trackingItemObject.trackingGroupRecord.id}
            })
            let allRecords = trackingItemsData.map((trackingItemObject) => {
                return {name: trackingItemObject.trackingGroupRecord.name, id: trackingItemObject.trackingGroupRecord.id}
            })
            const uniqueRecordsList = allRecords.filter((item, index) => {
                return index === allRecords.findIndex(obj => {
                  return obj.name === item.name;
                });
              });

              // save all the unique records to the respective state variable
              this.setState({'trackingRecordsData': uniqueRecordsList})
              let allItemsNamesAndValues = []
              let previousValue = -1
              let allValuesAmountCummulative = 0
              let allRecordsAmount = uniqueRecordsList.length
              trackingItemsData.some((trackingitemObject) => {
                if(trackingitemObject.value)
                {
                    allValuesAmountCummulative ++;
                }
              })

            trackingItemsData.map((trackingItem) => {
                let currentItemObject = 
                {
                    [trackingItem.trackingItemId]: [{'value': trackingItem.value, 'recordId': trackingItem.trackingGroupRecordId, 'trackingItemName': trackingItem.trackingItem.name, 'id': trackingItem.id}]
                }
                let targetElement = allItemsNamesAndValues.find(obj => obj[trackingItem.trackingItemId]); 
                if(targetElement)
                {
                    
                    console.log(`${trackingItem.trackingItemId} is included`)
                    // get previous instance of existing objects from the list of objects
                    let previousItemObjectCopy = targetElement
                    // update it and replace the old object with the new one
                    previousItemObjectCopy[trackingItem.trackingItemId].push({'value': trackingItem.value, 'recordId': trackingItem.trackingGroupRecordId, 'trackingItemName': trackingItem.trackingItem.name, 'id': trackingItem.id})
                }
                else
                {
                    allItemsNamesAndValues.push(currentItemObject)
                }

            })

            console.log(allItemsNamesAndValues)
            this.setState({'trackingItemsData': allItemsNamesAndValues})
            })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount()
    {
        this.getTrackingItemsData()
    }
  render() {
    return (
        <div className='UseTrackerComponentWrapper'>
        <div className='blueSeperationLine'></div>
        {this.state.trackingItemsData.length > 4 ?
            <FontAwesomeIcon className='scrollElementsButton' onClick={() => this.scrollElements()} icon = {faAngleLeft}/>
            :
            ""
        }
        <Table records={this.state.trackingRecordsData} itemsList={this.state.trackingItemsData}/>
    </div>
    )}}