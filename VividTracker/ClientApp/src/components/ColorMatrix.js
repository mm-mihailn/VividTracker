import React, { Component } from 'react';
import './ColorMatrix.css';
import './ColorMatrixJS.js';

export class ColorMatrix extends Component {
    static displayName = ColorMatrix.name;

    render() {
        return (
            <div className='colorMatrix'>

                    <div class="firstColumn">

                        <p id="square1" class="square"></p>

                    </div>
            </div>
        );
    }
}
