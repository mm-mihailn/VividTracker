import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerComponent.css'
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

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
        this.setState({'trackingItemsData': this.state.trackingItemsData.filter((item) => item != firstColumn)}, () => {
            this.setState((prevState) => ({
                trackingItemsData: [...prevState.trackingItemsData, firstColumn]
            }))
        })

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
            this.setState({'trackingItemsData': trackingItemsData}, () => {
                trackingItemsData.some((dataObject) => {
                    this.setState((prevState) => ({
                        'trackingItemsData': [...prevState.trackingItemsData, dataObject.trackingItem]
                        }))
                    this.setState((prevState) => ({
                        'trackingRecordsData': [...prevState.trackingRecordsData, dataObject.trackingGroupRecord]
                    }))
                })
            })
            let uniqueTrackingItemsData = this.state.trackingItemsData.filter((curr, idx) => 
                {
                    if(idx > 0)
                    {
                        return curr.id != this.state.trackingItemsData[idx-1].id
                    }
                    else
                    {
                        return curr
                    }
                })

                let uniqueTrackingRecordsData = this.state.trackingRecordsData.filter((curr, idx) => 
                {
                    if(idx > 0)
                    {
                        return curr.id != this.state.trackingRecordsData[idx-1].id
                    }
                   
                })                
            this.setState({'trackingItemsData': uniqueTrackingItemsData})
            this.setState({'trackingRecordsData': uniqueTrackingRecordsData})
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
                {this.state.trackingItemsData.length > 1 ?
                    <FontAwesomeIcon className='scrollElementsButton' onClick={() => this.scrollElements()} icon = {faAngleLeft}/>
                    :
                    ""
                }
                <div className='row menuWrapper'>
                    <div className='TrackingRecordsColumn'>
                        <div className='TrackingRecordsColumnHeader'>
                            <p className='TrackingRecordsHeader'>Projects</p>
                        </div>
                    </div>
                    {this.state.trackingItemsData.map((trackingItem) => {
                        
                        return(
                            trackingItem.name ? 
                            <div className='TrackingItemsColumn col-2'>
                                <div className='TrackingItemsColumnHeader'>
                                    <p className='TrackingItemsHeader'>{trackingItem.name}</p>
                                </div>
                            </div>
                            : ""
                    )
                    })}
                </div>          
                <div className='SeperationLine'>
                </div>
                <div className='TrackingRecordsWrapper'>
                    <div className='TrackingRecords'>
                            {this.state.trackingRecordsData.map((record) => {
                                return (
                                    <div>
                                        <div className='TrackingRecord'>
                                            <p className='TrackingRecordName'>{record.name} </p>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className='row TrackingItemValueWrapper'>
                    {this.state.trackingRecordsData.map((record) => {
                        const uniqueTrackingItems = [...new Set(this.state.trackingItemsData.filter((item) => item.value !== '').map((item) => item.trackingItemId ))];
                        const uniqueTrackingItemsNoUndefined = uniqueTrackingItems.filter((item) => item != undefined)
                        return (
                            <div className='row'>
                                {uniqueTrackingItemsNoUndefined.map((trackingItemId) => {
                                    const matchingTrackingItem = this.state.trackingItemsData.find((item) => item.trackingItemId === trackingItemId);
                                    if (matchingTrackingItem && matchingTrackingItem.trackingGroupRecordId === record.id) {
                                        return (
                                            <div className='col-2 TrackingItemValueColumn' key={trackingItemId}>
                                                <div className='trackingRecordsContainer'>
                                                    <div className='trackingItemsContainer'>
                                                        <div className='TrackingItemValue'>
                                                            <p className='square'></p>
                                                            <p className={matchingTrackingItem.value !== '' ? 'TrackingItemValueText' : 'TrackingItemValueText EmptyTrackingItemValueText'}>
                                                                {matchingTrackingItem.value !== '' ? matchingTrackingItem.value : '-'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className='col-2 TrackingItemValueColumn' key={trackingItemId}>
                                                <div className='trackingRecordsContainer'>
                                                    <div className='trackingItemsContainer'>
                                                        <div className='TrackingItemValue'>
                                                            <p className='square square-red'></p>
                                                            <p className='TrackingItemValueText EmptyTrackingItemValueText'>-</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        );
                    })}

                    </div>


</div>
        <div className='SeperationLine bottomLine'>
        </div>
</div>
    )}}