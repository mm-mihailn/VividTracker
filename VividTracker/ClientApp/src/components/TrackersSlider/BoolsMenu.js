import React, { Component } from 'react';
import './Styles/BoolsMenu.css';

export class BoolsMenu extends Component {

    render() {
        return (
            <div>
                <div className="boolsForm">
                    <form>
                        <select className="form-select" name="selectList">
                            <option>false</option>
                            <option>true</option>
                        </select>
                    </form>
                </div>
            </div>
        );
    }
}
