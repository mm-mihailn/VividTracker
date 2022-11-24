import React, { Component } from 'react';
import '../../custom.css'

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer id='footer' className='fixed-bottom'>
                <div id="main-content">
                    <div className=" d-flex justify-content-center">
                        <div className="row d-flex justify-content-center">
                            <div>
                                <h5>Martin Yordanov</h5>
                            </div>
                            <div>
                                <h5>Blagovest Damqnov</h5>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div>
                                <h5>Martin Marinov</h5>
                            </div>
                            <div>
                                <h5>Veli Aschikov</h5>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div>
                                <h5>Kristiqn Manov</h5>
                            </div>
                            <div>
                                <h5>Gabriel Yordanov</h5>
                            </div>
                        </div>
                    </div>
                   
                </div>
              
            </footer>
        );
    }
}
