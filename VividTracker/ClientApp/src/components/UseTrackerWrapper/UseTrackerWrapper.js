import React, { Component } from 'react'
import './UseTrackerWrapperStyles/UseTrackerWrapper.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faCirclePlay, faFilter } from '@fortawesome/free-solid-svg-icons';
import UseTracker from './UseTracker';
import PanelComponent from '../PanelComponent/PanelComponent';
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';
export default class UseTrackerWrapper extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      isPanelVisible: false,
      panelTrackingItemId: null,
      panelTrackingItemValueId: null,
      panelTrackingRecordId: null, 
      panelTrackingGroupId: null,
      wasTableUpdated: false,
      trackingItemsData: [],
      trackingRecordsData: [],
      trackingRecordsOverallData: [],
      trackingItemsOverallData: []
    }
  }

  handlePanelVisibility = async (TrackingItemId, TrackingItemValueId, TrackingRecordId) => {
    if(TrackingItemId && TrackingItemValueId && TrackingRecordId)
    {
      console.log(`showing tracking item with id ${TrackingItemValueId} of tracking item with id: ${TrackingItemId}`)
      
    }
    else
    {
      console.log(`creating tracking item value`)
      this.createNewTrackingItemValue(TrackingItemId, TrackingRecordId)
      
    }
    
    
    this.setState({'panelTrackingItemId': TrackingItemId})
    this.setState({'panelTrackingItemValueId': TrackingItemValueId})
    this.setState({'panelTrackingRecordId': TrackingRecordId})
    this.showHidePanel()
    
    
  }

  showHidePanel = (isPanelCurrentlyVisible) => {
    if(isPanelCurrentlyVisible == true)
    {
      this.setState({'isPanelVisible': false})
    }
    else
    {
      this.setState({'isPanelVisible': true})
    }
  }

  createNewTrackingItemValue = async(TrackingItemId, TrackingRecordId) => {
    let url = endpoints.createItemValue(this.state.panelTrackingGroupId, TrackingItemId, TrackingRecordId)
    const token = await authService.getAccessToken();
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "value": 1
      })
    })
    .then((res) => {
      this.setState({'wasTableUpdated': true})
    })
    .catch((err) => {
      console.log(err)
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
                let allRecordsNames = trackingItemsData.map((trackingItemObject) => {
                    return { name: trackingItemObject.trackingGroupRecord.name }
                })
                let allRecordsIds = trackingItemsData.map((trackingItemObject) => {
                    return { id: trackingItemObject.trackingGroupRecord.id }
                })
                let allRecords = trackingItemsData.map((trackingItemObject) => {
                    return { name: trackingItemObject.trackingGroupRecord.name, id: trackingItemObject.trackingGroupRecord.id }
                })
                const uniqueRecordsList = allRecords.filter((item, index) => {
                    return index === allRecords.findIndex(obj => {
                        return obj.name === item.name;
                    });
                });
                // save all the unique records to the respective state variable
                this.setState({ 'trackingRecordsData': uniqueRecordsList })

                let allItemsNamesAndValues = []
                let previousValue = -1
                let allRecordsAmount = uniqueRecordsList.length
                trackingItemsData.map((trackingItem) => {
                  console.log(trackingItem)
                    let currentItemObject =
                    {
                        [trackingItem.trackingItemId]: [{ 
                        'value': trackingItem.value, 
                        'recordId': trackingItem.trackingGroupRecordId, 
                        'trackingItemName': trackingItem.trackingItem.name, 
                        'id': trackingItem.id,
                        'irrelevantColor': trackingItem.trackingItem.irrelevantColor,
                        'maxValueColor': trackingItem.trackingItem.maxValueColor,
                        'minValueColor': trackingItem.trackingItem.minValueColor,
                        'maxValue': trackingItem.trackingItem.maxValueType,
                        'minValue': trackingItem.trackingItem.minValueType,
                        'targetValue': trackingItem.trackingItem.target,
                        'isIrrelevantAllowed': trackingItem.trackingItem.irrelevantAllowed }]
                    }
                    let targetElement = allItemsNamesAndValues.find(obj => obj[trackingItem.trackingItemId]);
                    if (targetElement) {

                        // get previous instance of existing objects from the list of objects
                        let previousItemObjectCopy = targetElement
                        // update it and replace the old object with the new one
                        previousItemObjectCopy[trackingItem.trackingItemId].push({ 'value': trackingItem.value, 'recordId': trackingItem.trackingGroupRecordId, 'trackingItemName': trackingItem.trackingItem.name, 'id': trackingItem.id })
                    }
                    else {
                        allItemsNamesAndValues.push(currentItemObject)
                    }

                })
                this.setState({ 'trackingItemsData': allItemsNamesAndValues })
            
              let getTrackingGroupRecordsURL = endpoints.getTrackingGroupRecords(TrackingGroupID)
              let getTrackingGroupItemsURL = endpoints.getTrackingGroupTrackingItems(TrackingGroupID)


              await fetch(getTrackingGroupRecordsURL, {
                method: 'GET',
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
              })
              .then(async (res) => {
                let records = await res.json()
                let allRecords = records.map((targetRecord) => {
                  return { name: targetRecord.name, id: targetRecord.id }
                })
                this.setState({ 'trackingRecordsOverallData': allRecords })
              })

              
              //trackingItemsOverallData
              await fetch(getTrackingGroupItemsURL, {
                method: 'GET',
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
              })
              .then(async (res) => {
                let items = await res.json()
                let allItemsNames = []
                items.map((trackingItem) => {
                  let currentItemObject =
                  {
                      [trackingItem.id]: [{ 
                      'value': trackingItem.value ? trackingItem.value : 0 , 
                      'recordId': trackingItem.trackingGroupRecordId, // todo: figure out what to do with that empty id 
                      'trackingItemName': trackingItem.name, 
                      'id': trackingItem.id,
                      'irrelevantColor': trackingItem.irrelevantColor,
                      'maxValueColor': trackingItem.maxValueColor,
                      'minValueColor': trackingItem.minValueColor,
                      'maxValue': trackingItem.maxValueType ? trackingItem.maxValueType : 0, 
                      'minValue': trackingItem.minValueType ? trackingItem.minValueType : 0,
                      'targetValue': trackingItem.target,
                      'isIrrelevantAllowed': trackingItem.irrelevantAllowed }]
                  }
                  let targetElement = allItemsNames.find(obj => obj[trackingItem.trackingItemId]);
                  if (targetElement) {

                      console.log(`${trackingItem.trackingItemId} is included`)
                      // get previous instance of existing objects from the list of objects
                      let previousItemObjectCopy = targetElement
                      // update it and replace the old object with the new one
                      previousItemObjectCopy[trackingItem.trackingItemId].push({ 'value': trackingItem.value, 'recordId': trackingItem.trackingGroupRecordId, 'trackingItemName': trackingItem.trackingItem.name, 'id': trackingItem.id })
                  }
                  else {
                    allItemsNames.push(currentItemObject)
                  }
                this.setState({ 'trackingItemsOverallData': allItemsNames })
              })
             
            })
            .catch((err) => {
              console.log(err)
            })
          })
  }

  scrollElements = () => {
    // TODO: FIX SCROLL BEHAVIOR
    let firstColumn = this.state.trackingItemsData[0]
    this.setState({ 'trackingItemsData': this.state.trackingItemsData.filter((item) => item != firstColumn) })
    // TODO: put smooth transition animation
    this.setState((prevState) => ({
        trackingItemsData: [...prevState.trackingItemsData, firstColumn]
    }))
    console.log(this.state.trackingItemsData)
  }

  componentDidMount = () => {
    this.getTrackingItemsData()
    let trackingGroupId = window.location.href.split('/')[4]
    this.setState({'panelTrackingGroupId':trackingGroupId})

  }
  render() {
    return (
      <div className='useTrackerWrapper'>
        <div className='usedTrackerHeaderWrapper'>
            <p className='usedTrackerHeader'>
                <strong>Tracker name</strong>
            </p>
            <FontAwesomeIcon className='usedTrackerTableIcon' icon={faTable}/>
        </div>
        <div className='usedTrackerMenuButtons'>
            <div className='usedTrackerMenuIcons'>
                <FontAwesomeIcon className='usedTrackerPlayButtonIcon usedTrackerMenuIcon' icon={faCirclePlay}/>
                <FontAwesomeIcon className='usedTrackerFilterIcon usedTrackerMenuIcon' icon={faFilter}/>
            </div>
        </div>
        <div className='UseTrackerMainPoint'>
          {/* //  console.log(this.state.trackingRecordsOverallData, this.state.trackingItemsOverallData) */}
             <UseTracker 
                panelHandler = {this.handlePanelVisibility} 
                records={this.state.trackingRecordsData} 
                allRecordsRegardlessValuePresence = {this.state.trackingRecordsOverallData}
                allItemsRegardlessValuePresence = {this.state.trackingItemsOverallData}
                itemsList={this.state.trackingItemsData} 
                scrollElements = {this.scrollElements}
                isPanelVisible = {this.state.isPanelVisible}
              />

              <PanelComponent 
                panelHandler = {this.handlePanelVisibility} 
                panelTrackingItemId = {this.state.panelTrackingItemId} 
                panelTrackingItemValueId = {this.state.panelTrackingItemValueId} 
                panelTrackingRecordId = {this.state.panelTrackingRecordId}
                isPanelVisible = {this.state.isPanelVisible}
                updateTrackingItemsData = {this.getTrackingItemsData}
                showHidePanel = {this.showHidePanel}
              />

        </div>
      </div>
    )
  }
}