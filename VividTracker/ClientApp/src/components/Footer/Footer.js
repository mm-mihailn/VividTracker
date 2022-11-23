import React, { Component } from 'react';
import '../../custom.css'

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer id='footer'>
                <div id="team-info">
                    <ul>
                        <li>Blagovest Damyanov</li>
                        <li>Martin Yordanov</li>
                        <li>Martin Marinov</li>
                        <li>Veli Ashikov</li>
                    </ul>
                </div>
            </footer>
        );
    }
}
