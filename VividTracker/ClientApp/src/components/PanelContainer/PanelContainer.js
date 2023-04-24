import React, { Component } from 'react';
import './PanelContainer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export default class PanelContainer extends Component {

    render() {
        const date = new Date(this.props.trackingItemValueActivityData.timeStamp);
        const formattedDate = date.toLocaleDateString("en-GB");
        return (
            <div className='panelContainerIndividual d-flex' key={this.props.trackingItemValueActivityData.id}>
                <div className='panelContentContainer'>
                    <div className='userNameWrapper ml-auto'>
                        <span className='userNameText pageText'>
                            {this.props.trackingItemValueActivityData.user.userName}
                        </span>
                    </div>
                    <div className='panelCommentWrapper'>
                        <span className='panelComment pageText'> {this.props.trackingItemValueActivityData.comment}
                        </span>
                    </div>
                    <div className='managePanelIconWrapper ml-auto'>
                        <FontAwesomeIcon className='commentsIcon' icon={faComments} />
                    </div>
                    <div className='dateWrapper ml-auto'>
                        <span className='dateText pageText'>
                            {formattedDate}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
