import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerComponent.css'
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
                {'name': 'Confluence space'},
                {'name': 'Code Reviews Process'},
                {'name': 'Unit Tests Code Coverage'},

            ]
        }
    }
  render() {
    return (
        <div className='UseTrackerComponentWrapper'>
            <div className='row menuWrapper'>
                <div className='TrackingRecordsColumn'>
                    <div className='TrackingRecordsColumnHeader'>
                        <p className='TrackingRecordsHeader'>Projects</p>
                    </div>
                </div>
                {this.state.items.map((item) => {
                    //TODO: Figure out what exactly is supposed to happen with the width, is it dynamic or is it fixed ? The story seems kind of torn on that.
                    return(
                        <div className='TrackingItemsColumn'>
                            <div className='TrackingItemsColumnHeader'>
                                <p className='TrackingItemsHeader'>{item.name}</p>
                            </div>
                        </div>
                    )

                })}
            </div>

            <div className='SeperationLine'></div>
            <div className='TrackingRecords'>
                {this.state.records.map((record) => {
                    return (
                        <div className='TrackingRecord'>
                            <p className='TrackingRecordName'>{record.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
  }
}
