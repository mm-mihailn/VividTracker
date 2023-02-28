import React, { Component } from 'react'
import './PanelContainer.css'

export default class PanelContainer extends Component {

    render() {
        return (
            <div className='panelContainer d-flex' key={this.props.tenantData.id}>
                <div className='panelNameWrapper'>
                    <span className='panelName pageText'> {this.props.tenantData.name} </span>
                </div>
                <div className='managePanelButtonWrapper ml-auto'>
                    <button className='manageButton'>
                        <a href={`https://localhost:44430/editTenant/${this.props.tenantData.id}`} className='ManageButtonText'>Manage</a>
                    </button>
                </div>
            </div>
        )
    }
}
