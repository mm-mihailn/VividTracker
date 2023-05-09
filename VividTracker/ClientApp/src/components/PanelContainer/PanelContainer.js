import React, { Component } from 'react';
import './PanelContainer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export default class PanelContainer extends Component {
    render() {
        const date = new Date(this.props.trackingItemValueActivityData.timeStamp);
        const formattedDate = date.toLocaleDateString("en-GB");
        let month = date.toString().split(' ')[1]
        let day = date.toString().split(' ')[2]
        return (
                <div className='panelContainerIndividual' key={this.props.trackingItemValueActivityData.id}>
                
                    <div className='userNameWrapper'>
                        <span className='userNameText commentUsername'>
                            {this.props.trackingItemValueActivityData.user.userName}
                        </span>
                        <span className='dateText commentDate'>
                            {month + ' ' + day}
                        </span>
                    </div>
                    <div className='panelCommentWrapper'>
                        <FontAwesomeIcon className='commentsIcon' icon={faComments} />
                        <span className='panelComment pageText'> {this.props.trackingItemValueActivityData.comment}
                        </span>
                    </div>
                </div>
        )
    }
}
