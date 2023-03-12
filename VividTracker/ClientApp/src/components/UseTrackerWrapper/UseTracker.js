import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerComponent.css'
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

            ]
        }
        
    }
    scrollElements = () => {
        let firstColumn = this.state.items[0]
        this.setState({'items': this.state.items.filter((item) => item != firstColumn)})
        // TODO: put smooth transition animation

        this.setState((prevState) => ({
            items: [...prevState.items, firstColumn]
        }))
    }
  render() {
    return (
            <div className='UseTrackerComponentWrapper'>
                <div className='blueSeperationLine'></div>
                {this.state.items.length > 4 ?
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
                        {this.state.items.map((item) => {
                            //TODO: Figure out what exactly is supposed to happen with the width, is it dynamic or is it fixed ? The story seems kind of torn on that.
                            return(
                                    <div className='TrackingItemsColumn col-2'>
                                        <div className='TrackingItemsColumnHeader'>
                                            <p className='TrackingItemsHeader'>{item.name}</p>
                                        </div>
                                    </div>
                            )

                        })}
                </div>          
                <div className='SeperationLine'>
                </div>
                <div className='TrackingRecordsWrapper'>
                    <div className='TrackingRecords'>
                            {this.state.records.map((record) => {
                                return (
                                    <div>
                                        <div className='TrackingRecord'>
                                            <p className='TrackingRecordName'>{record.name}</p>
                                        </div>
                                        <div>
                                            {record.children ? 
                                                record.children.map((child) => {
                                                    return (
                                                        <div className='TrackingRecordChild'>
                                                            <p className='TrackingRecordName'>{child.name}</p>
                                                        </div>
                                                    )
                                                })
                                            : 
                                                ""
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className='row TrackingItemValueWrapper'>
                        
                    {this.state.items.map((targetTrackingItem) => (
                        <div className='col-2 TrackingItemValueColumn'>
                            {targetTrackingItem.itemValues 
                            ? 
                                targetTrackingItem.itemValues.map((trackingItemValue) => (
                                    <div className='TrackingItemValue'>
                                        <p className='square'></p>
                                        <p className={trackingItemValue.value != '' ? 'TrackingItemValueText' : 'TrackingItemValueText EmptyTrackingItemValueText'}>
                                            {trackingItemValue.value != '' ? trackingItemValue.value : '-'}
                                        </p>
                                    </div>
                                ))
                            : 
                            <div className='TrackingItemValue'>
                                <p className='square square-red'></p>
                                <p className='TrackingItemValueText EmptyTrackingItemValueText'>
                                -
                                </p>
                            </div>
                            }
                        </div>
                        ))}
                    </div>

                   
                </div>
                <div className='SeperationLine bottomLine'>
                </div>
            </div>
    )
  }
}
