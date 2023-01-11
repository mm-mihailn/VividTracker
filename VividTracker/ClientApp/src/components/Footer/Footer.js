import React, { Component } from 'react';
import '../../custom.css'

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
                <footer id='footer' className="fixed-bottom">
                    <div className="row" id="dev">
                        <h5 className=" d-flex justify-content-center">DEVELOPERS:</h5>
                    </div>
                    <div id="main-content" className="row">
                        <div className="d-flex justify-content-center info">
                            <span>Blagovest Damyanov,Martin Yordanov,Veli Ashikov</span>
                        </div>
                        <div className="d-flex justify-content-center info">
                            <span>Martin Marinov,Gabriel Yordanov,Kristian Manov</span>
                        </div>
                    </div>

                </footer>
        );
    }
}
