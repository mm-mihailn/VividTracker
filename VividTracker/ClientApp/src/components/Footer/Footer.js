import React, { Component } from 'react';
import '../../custom.css'

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer id='footer' className='fixed-bottom'>
               
                <div className="row justify-content-center">
                    <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-6 col-12 ">
                        <h5>Blagovest Damqnov</h5>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-6 col-12">
                        <h5>Martin Yordanov</h5>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-6 col-12">
                        <h5>Martin Marinov</h5>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-6 col-12">
                        <h5>Veli Aschikov</h5>
                    </div>
                </div>
                <div className="row  justify-content-center">
                    <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-6 col-12">
                        <h5>Kristiqn Manov</h5>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-6 col-12">
                        <h5>Gabriel Yordanov</h5>
                    </div>
                </div>
            </footer>
        );
    }
}
