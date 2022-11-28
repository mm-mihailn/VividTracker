import React, { Component } from 'react';
import '../../custom.css'

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer id='footer' className='fixed-bottom'>
                <h5 className= " d-flex justify-content-center">DEVELOPERS:</h5>
                <div id="main-content">
                    <div className=" d-flex justify-content-center">
                        <div className="row d-flex justify-content-center">
                            <h6>Blagovest Damyanov,Martin Yordanov,Veli Ashikov</h6>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-center">
                        <div className="row d-flex justify-content-center">
                            <h6>Martin Marinov,Gabriel Yordanov,Kristian Manov</h6>
                        </div>
                    </div>
                </div>
              
            </footer>
        );
    }
}
