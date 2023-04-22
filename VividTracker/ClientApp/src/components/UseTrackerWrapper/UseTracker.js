import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerComponent.css'
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';
import PanelComponent from '../PanelComponent/PanelComponent';

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

            const uniqueArr = allRecordsNames.filter((item, index) => {
                // Use reduce to check if this name already exists in the array
                return index === allRecordsNames.findIndex(obj => {
                  return obj.name === item.name;
                });
              });

              this.setState({'trackingRecordsData': uniqueArr})
              let allItemsNamesAndValues = []
              let previousValue = -1
              let allValuesAmountCummulative = 0
              let allRecordsAmount = uniqueArr.length
              trackingItemsData.some((trackingitemObject) => {
                if(trackingitemObject.value)
                {
                    allValuesAmountCummulative ++;
                }
              })
              trackingItemsData.map((trackingItemObject, idx) => {
                let targetTrackingItemID = trackingItemObject.trackingGroupRecordId;
                let filtered = []; 
                allRecordsIds.map((record) => {
                  if (uniqueArr.length <= 1) 
                  {
                    if (targetTrackingItemID == record.id) 
                    {
                      filtered.push({
                        name: trackingItemObject.trackingItem.name,
                        itemValues: [{ value: trackingItemObject.value }]
                      });
                    } 
                    else 
                    {
                      let emptyObject = {value: ''}   
                      let itemValues = Array.from({ length: uniqueArr.length - 1 }, () => emptyObject).concat({ value: trackingItemObject.value });
                      filtered.push({
                        name: trackingItemObject.trackingItem.name,
                        itemValues: itemValues
                      });
                    }
                  } 
                  else 
                  {
                    if (targetTrackingItemID != record.id) 
                    {
                        filtered.push({
                            name: trackingItemObject.trackingItem.name,
                            itemValues: [{ value: trackingItemObject.value }, {value: ''}, {value: ''}]
                          });
                    } 
                    else 
                    {
                      let emptyObject = {value: ''}

                      // If another value exists then instead of putting an empty object, add that value as an object to the item values array
                      let itemValues = ''

                      if(previousValue != - 1)
                      {
                        let currentItemValues = []
                        trackingItemsData.some((trackingItemObjectInner) => {
                            if(trackingItemObjectInner.trackingItemId == trackingItemObject.trackingItemId)
                            {
                                currentItemValues.push(trackingItemObjectInner)
                            }
                        })
                        //TODO: subtract only the amount of spaces left until the records amount is met!,
                        // -- add N times the values that need to be added, make sure not to overwrite!
                        // TODO: Check if the amount of values is equal to the records, if it is, do not add any empty fields!
                        if(currentItemValues.length == uniqueArr.length)
                        {
                            itemValues = currentItemValues
                            filtered.push({
                                name: trackingItemObject.trackingItem.name,
                                itemValues: itemValues
                              });
                              previousValue = trackingItemObject.value
                        }
                        else
                        {
                            itemValues = Array.from({ length: Math.abs(uniqueArr.length - currentItemValues.length )}, () => emptyObject).concat([{value: previousValue}, {value: trackingItemObject.value }]);
                            filtered.push({
                                name: trackingItemObject.trackingItem.name,
                                itemValues: itemValues
                              });
                              previousValue = trackingItemObject.value
                        }
                      }
                      else
                      {
                        itemValues = Array.from({ length: uniqueArr.length - 1 }, () => emptyObject).concat({ value: trackingItemObject.value });
                        filtered.push({
                            name: trackingItemObject.trackingItem.name,
                            itemValues: itemValues
                          });
                          previousValue = trackingItemObject.value
                      }


                    }
                  }
                });
                
                allItemsNamesAndValues.push(filtered);
              });

            allItemsNamesAndValues = [].concat(...allItemsNamesAndValues)
                .reduce((uniqueItems, currentItem) => {
                    let itemIndex = uniqueItems.findIndex(item => item.name === currentItem.name && item.itemValues.value === currentItem.itemValues.value);
                    if (itemIndex < 0) {
                        uniqueItems.push(currentItem);
                    } else {
                        uniqueItems[itemIndex] = currentItem;
                    }
                    return uniqueItems;
                }, []);
  
                
            allItemsNamesAndValues = allItemsNamesAndValues.filter((item, index) => {
                return index === allItemsNamesAndValues.findIndex(obj => {
                  return obj.name === item.name;
                });
              });            
            this.setState({'trackingItemsData': allItemsNamesAndValues})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    toggleVisibility() {
        let element = document.getElementById("panelComponent");
        if (element.style.display === "none") {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
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
        <div className='row menuWrapper'>
            <div className='TrackingRecordsColumn'>
                <div className='TrackingRecordsColumnHeader'>
                    <p className='TrackingRecordsHeader'>Projects</p>
                </div>
            </div>
                {this.state.trackingItemsData.map((item) => {
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
                    {this.state.trackingRecordsData.map((record) => {
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
                <div className="col-2 panelContainer">
                    <div className="hidePanelContainer">
                        <button className="hidePanel" onClick={this.toggleVisibility}>Show/Hide</button>
                    </div>
                    <div id="panelComponent" >
                        <PanelComponent />
                    </div>
                </div>
            <div className='row TrackingItemValueWrapper'>
             
            {this.state.trackingItemsData.map((targetTrackingItem) => (
                <div className='col-2 TrackingItemValueColumn'>
                    {targetTrackingItem.itemValues.length > 1
                    ? 
                            targetTrackingItem.itemValues.map((valueObject) => {
                                return(
                                <div className='TrackingItemValue' style={valueObject.value == '' ? {backgroundColor: 'white'} : {backgroundColor: '#D9D9D9'}}>
                                    {valueObject.value != '' ? 
                                    <p className='square'></p>
                                    :
                                    ""}
                                    <p className={valueObject.value != '' ? 'TrackingItemValueText' : 'TrackingItemValueText EmptyTrackingItemValueText'}>
                                        {valueObject.value}
                                    </p>
                                </div>)

                            })
                        
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
    )}}