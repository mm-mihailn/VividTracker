import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Styles/HomePage.css'
import sampleDev from './Images/Sample_Developer.jpeg'
import Damyanov from './Images/BlagovestDamyanov.JPEG'
import Yordanov from './Images/MartinYordanov.jpg'
import Marinov from './Images/MartinMarinov.png'
import Ashikov from './Images/VeliAshikov.jpeg'
import Manov from './Images/KristiyanManov.png'
import GYordanov from './Images/GabrielYordanov.png'

import {ColorMatrix} from '../ColorMatrix/ColorMatrix.js'
export class LandingPage extends Component {
  static displayName = LandingPage.name;

  render () {
    return (
      <div className='homepageWrapper d-flex align-items-center justify-content-center'>
          <div className='informationBoxes'>

            <div className='row'>
              <div className='box descriptionText col-sm-12 col-md-6'>
                <p>VividTracker is a powerful collaborative tracking tool that allows you to visually follow the progress of your items through time, comparing the achieved results with those of other team members. Advanced features like activity tracking on every item with the possibility to: </p>
                <p>- add comments;</p>
                <p>- schedule events for status change in the future;</p>
                <p>- request actions from a specific team member;</p>
                <p>not only does it increase transparency, but it also boosts team play and helps achieve greater results.</p>  
              </div>

              <div className='box sampleActivityMatrix col-sm-12 col-md-6'>
                <ColorMatrix/> 
              </div>
            </div>

            <div className='row'>
              
              <div className=' developers left col-sm-12 col-md'>
                <div className='developerCard first'>
                  <img className='developerImage' src={Damyanov} alt='An image showing a man in a red shirt with crossed arms, wearing sunglasses.'/>
                  <div className='developerInformation'>
                    <p className='dev-info-row devName'><strong>Name:</strong> Blagovest Damyanov</p>
                    <p className='dev-info-row devRole'><strong>Role:</strong> Backend Developer</p>
                    <p className='dev-info-row devThing'><strong>Interests:</strong> I like playing the guitar, cooking, commodities investing, etc.</p>
                  </div>
                </div>
                <div className='developerCard'>
                  <img className='developerImage' src={Ashikov} alt='An image showing a man on an alley, surrounded by green trees.'/>
                  <div className='developerInformation'>
                    <p className='dev-info-row devName'><strong>Name:</strong> Veli Ashikov</p>
                    <p className='dev-info-row devRole'><strong>Role:</strong> Developer</p>
                    <p className='dev-info-row devThing'><strong>Interests:</strong> If life were a painting, <br></br>I want to create a masterpiece.</p>
                  </div>
                </div>
                <div className='developerCard'>
                  <img className='developerImage' src={GYordanov} alt='An anonymous puppet image.'/>
                  <div className='developerInformation'>
                    <p className='dev-info-row devName'><strong>Name:</strong> Gabriel Yordanov </p>
                    <p className='dev-info-row devRole'><strong>Role:</strong> Tester </p>
                    <p className='dev-info-row devThing'><strong>Interests:</strong> I like to do sports, listen to music and I like to watch movies.</p>
                  </div>
                </div>
              </div>
              <div className=' developers right col-sm-12 col-md'>
                <div className='developerCard'>
                  <img className='developerImage' src={Manov} alt='An image showing a man with earphones.'/>
                  <div className='developerInformation'>
                    <p className='dev-info-row devName'><strong>Name:</strong> Kristiyan Manov</p>
                    <p className='dev-info-row devRole'><strong>Role:</strong> Tester </p>
                    <p className='dev-info-row devThing'><strong>Interests:</strong> I have only rocks, but when I throw them they start to roll.</p>
                  </div>
                </div>
                <div className='developerCard'>
                  <img className='developerImage' src={Yordanov} alt='An image showing a man dressed in a yellow shirt with his arms crossed in front of him.'/>
                  <div className='developerInformation'>
                    <p className='dev-info-row devName'><strong>Name:</strong> Martin Yordanov</p>
                    <p className='dev-info-row devRole'><strong>Role:</strong> Fullstack JS developer</p>
                    <p className='dev-info-row devThing'><strong>Interests:</strong> I'm into Artificial Intelligence and innovative technologies. </p>
                  </div>
                </div>
                <div className='developerCard'>
                  <img className='developerImage' src={Marinov} alt='An image showing a man, wearing a backpack. Mountains in the background.'/>
                  <div className='developerInformation'>
                    <p className='dev-info-row devName'><strong>Name:</strong> Martin Marinov</p>
                    <p className='dev-info-row devRole'><strong>Role:</strong> Front-end developer</p>
                    <p className='dev-info-row devThing'><strong>Interests:</strong> I like reading novels, watching movies, and listening to Rainbow.</p>
                  </div>
                </div>
              </div>
              

            </div>

          </div>

      </div>
    );
  }
}
