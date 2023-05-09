import React, { Component } from 'react';
import './PanelContainer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export default class PanelContainer extends Component {
    render() {

        const date = new Date(this.props.trackingItemValueActivityData.timeStamp);
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return (
            <div className='panelContainerIndividual d-flex' key={this.props.trackingItemValueActivityData.id}>
                <div className='panelContentContainer'>
                    <div className='userNameWrapper ml-auto'>
                        <span className='userNameText'>
                            <b>{this.props.trackingItemValueActivityData.user.userName}</b>
                        </span>
                        <div className='dateWrapper ml-auto'>
                            <span className='dateText'>
                                {formattedDate}
                            </span>
                        </div>
                    </div>
                    <div className='managePanelIconWrapper ml-auto'>
                        <FontAwesomeIcon className='commentsIcon' icon={faComments} />
                    </div>
                    <div className='panelCommentWrapper'>
                        <span className='panelComment'> {this.props.trackingItemValueActivityData.comment}
                        </span>
                    </div>
                
                    
                </div>
            </div>
        )
    }
}
