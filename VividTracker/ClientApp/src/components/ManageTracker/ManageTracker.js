import React, { Component } from 'react'
import './Styles/ManageTracker.css'
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faL } from '@fortawesome/free-solid-svg-icons';
import { endpoints } from '../../endpoints';
export default class ManageTracker extends Component {
    constructor() {
        super()
        this.state = {
            records: [
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },

                {
                    'name': 'ExcluCV',
                    'details': [
                        {
                            'name': 'ExcluCV backend'
                        },
                        {
                            'name': 'ExcluCV iOS'
                        }
                    ]
                },
                { 'name': 'Twin City Outdoor Services', 'details': [] },
            ],
            alreadyExistingRecords: [
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },
                { 'name': 'Edmentum Inc', 'details': [] },
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Augeo Afinity Tesxting', 'details': [] },

            ],
            trackerItems: [
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Augeo Afinity Marketing', 'details': [] },
                { 'name': 'Augeo Afinity Marketing', 'details': [] },

            ],
            isItemsSelected: true,
            isRecordsSelected: false,
            newRecordName: '',
            trackingGroupRecords: [],
            allRecords: [],
            allItems: [],
            currentTrackingGroup: [],
            currentTrackerName: '',
            newTrackerName: '',
            currentTrackerItems: [],
            PropertyTypes: {
                'Bool': 1,
                'Percentage': 2,
                'ValueRange': 3
            },
            createdItemName: null,
            createdItemMaxColorCode: null,
            createdItemMinColorCode: null,
            createdItemIrrelevantColorCode: null,
            createdItemIrrelevantAllowed: 'false',
            createdItemMandatoryCommentAvailable: 'false',
            createdItemTarget: null,
            createdItemPropertyType: 1,
            createdItemDefaultValue: null,
            isCreateTrackerItemSelected: true,
            minimalValue: null,
            maximalValue: null,
            isCreateRecordSelected: true,
            isAlreadyExistingRecordsSelected: false,
        }
    }

    selectItems = () => {
        if (this.state.isItemsSelected == false) {
            this.setState({ 'isItemsSelected': true })
            this.setState({ 'isRecordsSelected': false })
        }
    }
    selectRecords = () => {
        if (this.state.isRecordsSelected == false) {
            this.setState({ 'isRecordsSelected': true })
            this.setState({ 'isItemsSelected': false })
        }
    }
    getTrackingGroupRecords = async (trackingGroupId) => {
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroupRecords(trackingGroupId)
        await fetch(url)
            .then((
                async (res) => {
                    let result = await res.json()
                    this.setState({ 'trackingGroupRecords': result })
                }))
            .catch((err) => {
                // TODO: Do some action when an error occurs
            })
    }
    getAllRecords = async () => {
        let pageLocationSplitted = window.location.href.split('/')
        let trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 2]
        // TODO: Make this get ALL THE TRACKING RECORDS FROM THE DATABASE
        let url = endpoints.getAllRecords(trackingGroupId);
        await fetch(url)
            .then((
                async (res) => {
                    let result = await res.json()
                    this.setState({ 'allRecords': result })
                }))
            .catch((err) => {
                // TODO: Do some action when an error occurs
            })
    }
    getAllTrackingItems = async () => {
        let pageLocationSplitted = window.location.href.split('/')
        let tenantId = pageLocationSplitted[pageLocationSplitted.length - 2]
        // TODO: Make this get ALL THE TRACKING ITEMS FROM THE DATABASE
        let url = endpoints.getAllTrackingItems(tenantId)

        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((
                async (res) => {
                    let result = await res.json()
                    this.setState({ 'allItems': result })
                }))
            .catch((err) => {
                // TODO: Do some action when an error occurs
            })
    }
    getTrackingGroup = async (trackingGroupId) => {
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroup(trackingGroupId)

        await fetch(url)
            .then((
                async (res) => {
                    let result = await res.json()
                    this.setState({ 'currentTrackingGroup': result })
                    this.setState({ 'currentTrackerName': result.name })
                    this.setState({ 'currentRecordName': result.label })
                    this.setState({ 'newTrackerName': result.name })
                }))
            .catch((err) => {
                // TODO: Do some action when an error occurs
            })

    }
    handleUpdate = () => {
        let pageLocationSplitted = window.location.href.split('/')
        let trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        this.updateTrackerName(trackingGroupId)
        this.updateTrackerLabel(trackingGroupId)
    }
    updateTrackerName = async (trackingGroupId) => {

        if (this.checkIfItemNameIsValid(this.state.newTrackerName)) {
            let url = endpoints.updateTrackerName(trackingGroupId)
            await fetch(url,
                {
                    method: 'PATCH',
                    body:
                        JSON.stringify({ "Name": this.state.newTrackerName }),
                    headers:
                    {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((res) => {
                    this.getTrackingGroup(trackingGroupId)

                })
                .catch((err) => {
                    // TODO: Do some action when an error occurs
                })

        }
        else {
            //TODO: Tell the user the new tracker name is invalid
            console.log('invalid tracker name error')
        }
    }

    updateTrackerLabel = async (trackingGroupId) => {
        if (this.checkIfItemNameIsValid(this.state.newTrackerName)) {
            let url = endpoints.updateTrackerLabel(trackingGroupId)
            await fetch(url,
                {
                    method: 'PATCH',
                    body:
                        JSON.stringify({ "Label": this.state.currentRecordName }),
                    headers:
                    {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((res) => {
                    this.getTrackingGroup(trackingGroupId)

                })
                .catch((err) => {
                    // TODO: Do some action when an error occurs
                })

        }
        else {
            //TODO: Tell the user the new tracker name is invalid
        }
    }

    getTrackingGroupTrackingItems = async (trackingGroupId) => {
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroupTrackingItems(trackingGroupId)
        await fetch(url, {
            method: 'GET'
        })
            .then((
                async (res) => {
                    let result = await res.json()
                    this.setState({ 'currentTrackerItems': result })
                }))
            .catch((err) => {
                // TODO: Do some action when an error occurs
            })
    }

    resetName = async (trackingGroupId) => {
        // currentTrackerName
        let pageLocationSplitted = window.location.href.split('/')
        trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.getTrackingGroup(trackingGroupId)
        let result = await fetch(url)
            .then((
                async (res) => {
                    let result = await res.json()
                    this.setState({ 'newTrackerName': result.name })
                    this.setState({ 'currentRecordName': result.label })

                }))
            .catch((err) => {
                // TODO: Do some action when an error occurs
            })
    }

    createTrackerItem = async () => {
        let trackerItemName = this.state.createdItemName
        let trackerItemMinColorCode = this.state.createdItemMinColorCode
        let trackerItemMaxColorCode = this.state.createdItemMaxColorCode
        let trackerItemIrrelevantColorCode = this.state.createdItemIrrelevantColorCode
        let trackerItemDecimalValue = this.state.createdItemDefaultValue
        let trackerItemPropertyType = this.state.createdItemPropertyType
        let trackerItemIrrelevantAllowed = this.state.createdItemIrrelevantAllowed
        let trackerItemMandatoryCommentAvailable = this.state.createdItemMandatoryCommentAvailable
        let trackerItemTarget = this.state.createdItemTarget
        let trackerItemMaxTypeValue = this.state.maximalValue
        let trackerItemMinTypeValue = this.state.minimalValue


        if(this.checkIfValueIsNullOrEmpty(trackerItemName) &&
            this.checkIfValueIsNullOrEmpty(trackerItemMinColorCode) &&
            this.checkIfValueIsNullOrEmpty(trackerItemMaxColorCode) &&
            this.checkIfValueIsNullOrEmpty(trackerItemIrrelevantColorCode) &&
            this.checkIfValueIsNullOrEmpty(trackerItemDecimalValue) &&
            this.checkIfValueIsNullOrEmpty(trackerItemPropertyType) &&
            this.checkIfValueIsNullOrEmpty(trackerItemTarget) &&
            this.checkIfValueIsNullOrEmpty(trackerItemIrrelevantAllowed) &&
            this.checkIfValueIsNullOrEmpty(trackerItemMandatoryCommentAvailable)
        ) {
            if (this.checkIfItemNameIsValid(trackerItemName) &&
                this.checkIfColorCodeIsValid(trackerItemMinColorCode) &&
                this.checkIfColorCodeIsValid(trackerItemMaxColorCode) &&
                this.checkIfColorCodeIsValid(trackerItemIrrelevantColorCode) &&
                this.checkIfDecimalIsValid(trackerItemDecimalValue) &&
                this.checkIfDecimalIsValid(trackerItemTarget)) {
                // call create tracker item endpoint
                let pageLocationSplitted = window.location.href.split('/')
                let trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
                let tenantId = pageLocationSplitted[pageLocationSplitted.length - 2]

                let createTrackingItemURL = endpoints.createTrackingItem(tenantId, trackingGroupId)
                let trackingItemRequestModel = {}
                if (
                    this.checkIfValueIsNullOrEmpty(trackerItemMaxTypeValue) &&
                    this.checkIfValueIsNullOrEmpty(trackerItemMinTypeValue)) {
                    trackingItemRequestModel = {
                        Name: trackerItemName,
                        MaxValueColor: trackerItemMaxColorCode,
                        MinValueColor: trackerItemMinColorCode,
                        IrrelevantColor: trackerItemIrrelevantColorCode,
                        IrrelevantAllowed: Boolean(trackerItemIrrelevantAllowed),
                        Target: Number(trackerItemTarget),
                        Type: Number(trackerItemPropertyType),
                        MandatoryComment: Boolean(trackerItemMandatoryCommentAvailable),
                        DefaultValue: trackerItemDecimalValue,
                        MinValueType: trackerItemMinTypeValue,
                        MaxValueType: trackerItemMaxTypeValue
                    };
                }
                else {
                    trackingItemRequestModel = {
                        Name: trackerItemName,
                        MaxValueColor: trackerItemMaxColorCode,
                        MinValueColor: trackerItemMinColorCode,
                        IrrelevantColor: trackerItemIrrelevantColorCode,
                        IrrelevantAllowed: Boolean(trackerItemIrrelevantAllowed),
                        Target: Number(trackerItemTarget),
                        Type: Number(trackerItemPropertyType),
                        MandatoryComment: Boolean(trackerItemMandatoryCommentAvailable),
                        DefaultValue: trackerItemDecimalValue,
                        MinValueType: null,
                        MaxValueType: null
                    };
                }

                await fetch(createTrackingItemURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(trackingItemRequestModel)
                })
                    .then((
                        async (res) => {
                            
                            this.setState({
                                'createdItemName': '', 
                                'createdItemMinColorCode': '',
                                'createdItemMaxColorCode': '',
                                'createdItemIrrelevantColorCode': '',
                                'createdItemDefaultValue': '',
                                'createdItemPropertyType': '',
                                'createdItemIrrelevantAllowed': '',
                                'createdItemMandatoryCommentAvailable': '',
                                'createdItemTarget': '',
                                'maximalValue': '',
                                'minimalValue': ''})
                                this.getTrackingGroupTrackingItems(trackingGroupId)
                                this.getAllTrackingItems()
                        }))
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else {
                console.log('Invalid name or color code or decimal value!')
            }
        }
        else {
            console.log('Invalid value found!')
        }

    }

    checkIfColorCodeIsValid(colorCodeString) {
        let colorCodeRegex = new RegExp(`^#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}$`)
        let isColorCodeValid = colorCodeRegex.test(colorCodeString)
        return isColorCodeValid
    }
    checkIfDecimalIsValid(decimal) {
        if (decimal > 999.99) {
            return false
        }
        else {
            return true
        }
    }
    checkIfItemNameIsValid(ItemName) {

        if (ItemName.length > 0 && ItemName.length <= 255) {
            return true
        }
        else {
            return false
        }
    }

    checkIfValueIsNullOrEmpty(value) {
        if (value == null || !value) {
            return false
        }
        else {
            return true
        }
    }
    selectTrackerItemOption() {
        if (this.state.isCreateTrackerItemSelected == true) {
            this.setState({ 'isCreateTrackerItemSelected': false })
        }
        else {
            this.setState({ 'isCreateTrackerItemSelected': true })
        }
    }
    createRecord = async() => {
        let pageLocationSplitted = window.location.href.split('/')
        let trackingGroupId = pageLocationSplitted[pageLocationSplitted.length - 1]
        let url = endpoints.createTrackingGroupRecord(trackingGroupId)

        await fetch(url,
            {
                //TODO: Make the disabled option chooseable
                method: 'POST',
                body:
                    JSON.stringify({ 
                        "Name": this.state.newRecordName, 
                        "Disabled": true
                    }),
                headers:
                {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((res) => {
                this.getTrackingGroup(trackingGroupId)
                this.getTrackingGroupRecords(trackingGroupId)
                this.getAllRecords()
                this.setState({'newRecordName': ''})

            })
            .catch((err) => {
                // TODO: Do some action when an error occurs
            })

        
    }
    selectRecordsOption = () => 
    {
        if(this.state.isCreateRecordSelected == true)
        {
            this.setState({'isCreateRecordSelected': false})
            this.setState({'isAlreadyExistingRecordsSelected': true})

        }
        else
        {
            this.setState({'isCreateRecordSelected': true})
            this.setState({'isAlreadyExistingRecordsSelected': false})


        }
    }
    componentDidMount() {
        this.getTrackingGroupRecords()
        this.getAllRecords()
        this.getAllTrackingItems()
        this.getTrackingGroup()
        this.getTrackingGroupTrackingItems()
    }
    render() {
        return (
            <div className='TrackerContainerWrapper d-flex justify-content-center align-items-center'>
                <div className='TrackerContainer'>
                    <div className='TrackerHeaderWrapper'>
                        <h4 className='TrackerHeader'>{this.state.currentTrackingGroup.name}</h4>
                        <FontAwesomeIcon className='TrackerHeaderIcon' icon={faPenToSquare} />
                    </div>
                    <div className='TrackerInteractionField'>
                        <div className='TrackerFormContainer'>
                            <div className='TrackerFieldsContainer'>
                                <div className='TrackerNameFieldWrapper'>
                                    <label className='TrackerNameLabel pageText'>Tracker Name: </label>
                                    <input
                                        className='TrackerNameInputField form-control'
                                        type='text'
                                        value={this.state.newTrackerName}
                                        onChange={
                                            (e) =>
                                                this.setState({ 'newTrackerName': e.target.value })
                                        }
                                    />
                                </div>
                                <div className='RecordNameFieldWrapper'>
                                    <label className='TrackerRecordLabel pageText'>Record Name: </label>
                                    <input className='TrackerRecordInputField form-control' type='text' value={this.state.currentRecordName} onChange={(e) => this.setState({ 'currentRecordName': e.target.value })} />
                                </div>
                            </div>
                            <div className='TrackerButtons'>
                                <span className='ResetButton' onClick={() => this.resetName()}><strong>Reset</strong></span>
                                <button className='UpdateButton' onClick={() => this.handleUpdate()}>Update</button>
                            </div>
                        </div>
                    </div>
                    <div className='TrackerOptionsWrapper'>
                        <div
                            className={this.state.isItemsSelected == true ? 'TrackerOptionWrapperSelected' : 'TrackerOptionWrapper'}
                            tabIndex="0"
                            onClick={() => { this.selectItems() }}
                        >
                            <span className='TrackerOption'>Items</span>
                        </div>
                        <div
                            className={this.state.isRecordsSelected == true ? 'TrackerOptionWrapperSelected' : 'TrackerOptionWrapper'}
                            tabIndex="1"
                            onClick={() => { this.selectRecords() }}>
                            <span className='TrackerOption'>Records</span>
                        </div>
                    </div>
                    {this.state.isRecordsSelected == true
                        ?
                        <div className='RecordsWrapper d-flex'>
                            {
                                this.state.trackingGroupRecords.length > 0 ?
                                    <div className='RecordsContainer'>
                                        {this.state.trackingGroupRecords.map((record) => {
                                            return (
                                                <div className='RecordContainer' key={record.id}>
                                                    <p className='RecordName'>{record.name}</p>
                                                </div>
                                            )
                                        }
                                        )}
                                    </div>
                                    :
                                    <div className='RecordsContainer'>
                                        <div className='RecordContainer'>
                                            <p className=''>No records found.</p>
                                        </div>
                                    </div>
                            }

                            <div className='RecordsInteraction'>
                            <div className='ItemsInteractionMenu d-flex'>
                                    <div className={this.state.isCreateRecordSelected == true ? 
                                        'CreateRecordButtonWrapper TrackerItemOptionSelected' :
                                        'CreateRecordButtonWrapper'
                                    } onClick={() => this.selectRecordsOption()}>
                                        <span className='TrackerItemOption'>Create new record</span>
                                    </div>
                                    <div className={this.state.isAlreadyExistingRecordsSelected == true ?
                                        'AlreadyExistingRecordsButtonWrapper TrackerItemOptionSelected' :
                                        'AlreadyExistingRecordsButtonWrapper'
                                    } onClick={() => this.selectRecordsOption()}>
                                        <span className='TrackerItemOption'>Already existing records</span>
                                    </div>
                                </div>
                                    <div className={this.state.isCreateRecordSelected == true ? 'RecordsInteractionFieldWrapper d-flex' : 'RecordsInteractionFieldWrapper d-none'}>
                                        <label className='RecordNameLabel pageText'>New Record: </label>
                                        <input className='RecordNameInputField form-control' type='text' value={this.state.newRecordName} onChange={(e) => this.setState({ 'newRecordName': e.target.value })} />
                                    </div>
                                    <div className={this.state.isCreateRecordSelected == true ? 'RecordButtonsManageTrackerPage': 'd-none'}>
                                        <span className='CancelButtonManageTrackerPage'><strong>Cancel</strong></span>
                                        <button className='UpdateButtonManageTrackerPage' onClick={() => this.createRecord()}>Add</button>
                                    </div>
                                <div className={this.state.isAlreadyExistingRecordsSelected == true ? 'AlreadyExistingRecordsWrapper' : 'd-none'}>
                                    <div className='AlreadyExistingRecords'>
                                        {this.state.allRecords.map((alreadyExistingRecord) => {
                                            return (
                                                <div className='AlreadyExistingRecord' key={alreadyExistingRecord.id}>
                                                    <p className='AlreadyExistingRecordName'>{alreadyExistingRecord.name}</p>
                                                    <span className='AddTrackingButton'>Add</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='RecordsWrapper d-flex'>
                            {this.state.currentTrackerItems.length > 0 ?
                                <div className='RecordsContainer'>
                                    {this.state.currentTrackerItems.map((trackerItem) => {
                                        return (
                                            <div className='RecordContainer' key={trackerItem.id}>
                                                <p className='RecordName'>{trackerItem.name}</p>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                                :
                                <div className='RecordsContainer'>
                                    <div className='RecordContainer'>
                                        <p className=''>No items found.</p>
                                    </div>
                                </div>
                            }

                            <div className='AlreadyExistingRecordsWrapper ItemSectionRecords'>
                                <div className='ItemsInteractionMenu d-flex'>
                                    <div className={this.state.isCreateTrackerItemSelected == true ?
                                        'CreateTrackerItemButtonWrapper TrackerItemOptionSelected' :
                                        'CreateTrackerItemButtonWrapper'
                                    } onClick={() => this.selectTrackerItemOption()}>
                                        <span className='TrackerItemOption'>Create tracker item</span>
                                    </div>
                                    <div className={this.state.isCreateTrackerItemSelected == false ?
                                        'AlreadyExistingItemsButtonWrapper TrackerItemOptionSelected' :
                                        'AlreadyExistingItemsButtonWrapper'
                                    } onClick={() => this.selectTrackerItemOption()}>
                                        <span className='TrackerItemOption'>Already existing items</span>
                                    </div>
                                </div>
                                {this.state.isCreateTrackerItemSelected == true ?
                                    <div className='CreateItemField'>
                                        {/* <p className='createItemHeader'>Create tracker item</p> */}
                                        <div className="form-group row">
                                            <div className="col-sm-12 inputWrapperItemCreation">
                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Tracker item name'
                                                    value = {this.state.createdItemName}
                                                    onChange={(e) => this.setState({ 'createdItemName': e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group row '>
                                            <div className="col-sm-6 d-flex inputWrapperItemCreation">
                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Max color'
                                                    value = {this.state.createdItemMaxColorCode}
                                                    onChange={(e) => this.setState({ 'createdItemMaxColorCode': e.target.value })}
                                                />

                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Min color'
                                                    value = {this.state.createdItemMinColorCode}
                                                    onChange={(e) => this.setState({ 'createdItemMinColorCode': e.target.value })}

                                                />

                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Irrelevant color'
                                                    value = {this.state.createdItemIrrelevantColorCode}
                                                    onChange={(e) => this.setState({ 'createdItemIrrelevantColorCode': e.target.value })}

                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 d-flex inputWrapperItemCreation">
                                                <select className='form-control'
                                                    placeholder='Irrelevant allowed'
                                                    onChange={(e) => this.setState({ 'createdItemIrrelevantAllowed': e.target.value })}
                                                    value={this.state.createdItemIrrelevantAllowed}>
                                                    <option disabled >Irrelevant allowed</option>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                                </select>
                                                <select className='form-control'
                                                    onChange={(e) => this.setState({ 'createdItemMandatoryCommentAvailable': e.target.value })}
                                                    value={this.state.createdItemMandatoryCommentAvailable}>
                                                    <option disabled >Mandatory comment allowed</option>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                                </select>
                                                <select className='form-control'
                                                    onChange={(e) => this.setState({ 'createdItemPropertyType': e.target.value })}
                                                    value={this.state.createdItemPropertyType}>
                                                    <option disabled >Property type</option>
                                                    {
                                                        Object.keys(this.state.PropertyTypes)
                                                            .map((propertyType) => {
                                                                return (
                                                                    <option value={this.state.PropertyTypes[propertyType]} key={propertyType}>{propertyType}</option>
                                                                )
                                                            })
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 inputWrapperItemCreation">
                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Default value'
                                                    value = {this.state.createdItemDefaultValue}
                                                    onChange={(e) => this.setState({ 'createdItemDefaultValue': e.target.value })}
                                                />
                                            </div>

                                            <div className="col-sm-6 inputWrapperItemCreation">
                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Item target value'
                                                    value = {this.state.createdItemTarget}
                                                    onChange={(e) => this.setState({ 'createdItemTarget': e.target.value })}
                                                />
                                            </div>
                                            <div className={this.state.createdItemPropertyType == 3 ? "col-sm-6 inputWrapperItemCreation valueRangeWrapper d-flex" : "col-sm-6 inputWrapperItemCreation valueRangeWrapper d-none"}>

                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Minimal value'
                                                    value = {this.state.minimalValue}
                                                    onChange={(e) => this.setState({ 'minimalValue': e.target.value })}
                                                />
                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Maximal value'
                                                    value = {this.state.maximalValue}
                                                    onChange={(e) => this.setState({ 'maximalValue': e.target.value })}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-sm-6 inputWrapperItemCreation">
                                            <button onClick={() => this.createTrackerItem()} className='CreateItemButtonManageTrackerPage'>Create</button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className='AlreadyExistingItems'>
                                            {this.state.allItems.map((alreadyExistingItem) => {
                                                return (
                                                    <div className='AlreadyExistingRecord' key={alreadyExistingItem.id}>
                                                        <p className='AlreadyExistingRecordName'>{alreadyExistingItem.name}</p>
                                                        <span className='AddTrackingButton'>Add</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>
                    }
                </div>
            </div>
        )
    }
}