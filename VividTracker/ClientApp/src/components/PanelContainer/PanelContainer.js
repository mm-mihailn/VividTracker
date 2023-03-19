import React, { Component } from 'react';
import './PanelContainer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export default class PanelContainer extends Component {

    render() {
        return (
            <div className='panelContainerIndividual d-flex' key={this.props.trackingItemValueActivityData.id}>
                {/*<div className='recordNameWrapper'>*/}
                {/*    <span className='recordName pageText'> {this.props.trackingItemValueActivityData.userName} </span>*/}
                {/*</div>*/}
                <div className='panelContentContainer'>
                    
                    <div className='panelCommentWrapper'>
                        <span className='panelComment pageText'> {this.props.trackingItemValueActivityData.comment}
                        </span>
                    </div>
                    <div className='managePanelIconWrapper ml-auto'>
                        <FontAwesomeIcon className='commentsIcon' icon={faComments} />
                    </div>
                    <div className='dateWrapper ml-auto'>
                        <span className='dateText pageText'>
                            {this.props.trackingItemValueActivityData.timeStamp}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
