import React, { Component } from 'react';
import './PanelContainer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export default class PanelContainer extends Component {

    render() {
        return (
            <div className='panelContainer d-flex' key={this.props.trackingItemValueActivityData.id}>
                <div className='recordNameWrapper'>
                    <span className='recordName pageText'> {this.props.recordData.name} </span>
                </div>
                <div className='panelNameWrapper'>
                    <span className='panelName pageText'> {this.props.trackingItemValueActivityData.comment}
                    </span>
                </div>
                <div className='panelContentContainer'>
                    <div className='managePanelIconWrapper ml-auto'>
                        <FontAwesomeIcon className='commentsIcon' icon={faComments} />
                    </div>
                    <div className='dateWrapper ml-auto'>
                        <span className='dateText pageText'>
                            {this.props.trackingItemValueActivityData.timeStamp} </span>
                    </div>
                </div>
            </div>
        )
    }
}
